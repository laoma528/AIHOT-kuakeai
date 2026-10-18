# 评分门槛强制执行

## 问题

上线后发现很多评分很低的文章也被公开，出现在"全部动态"里，降低了网站内容质量。

### 原因

之前的发布逻辑存在两个问题：

1. **精选门槛未强制执行**：只检查 `analysis.selected` 布尔值，不验证实际分数
2. **缺少公开门槛**：只要有标题摘要就公开，没有最低评分要求

## 解决方案

增加两层门槛验证：

### 1. 公开门槛（20 分）

**所有参与评分的信源（T1/T1_5/T2）必须 ≥ 20 分才能进入"全部动态"和精选**：
- ❌ 不在精选里
- ❌ 不在"全部动态"里  
- ✅ 详情页保留（`eligible = false`，`visibility` 仍为 `public`）

**EXCLUDE_MP 及其他不参与评分的信源不受此门槛约束**，仍按原行为：
- ✅ 可以进入"全部动态"
- ❌ 不能进入精选

修改 `isPoolEligible` 函数增加条件分数检查：

```typescript
export function isPoolEligible(input: {
  participationMode: string;
  relevance: string | null;
  title: string | null;
  summary: string | null;
  score: number | null;
  requiresScoreCheck: boolean;  // T1/T1_5/T2 为 true，EXCLUDE_MP 为 false
  publicFloor: number;
}): boolean {
  const meetsBasicRequirements =
    input.participationMode === "editorial" &&
    input.relevance === "pass" &&
    !!input.title &&
    !!input.summary;

  if (!meetsBasicRequirements) return false;

  // Sources that participate in selection scoring must meet the public floor.
  // Sources excluded from scoring (EXCLUDE_MP, etc.) can enter the pool without a score.
  if (input.requiresScoreCheck) {
    if (input.score === null || input.score < input.publicFloor) return false;
  }

  return true;
}
```

### 2. 精选门槛（60/65/76 分）

**进入精选需要更高分数**，按信源分级：
- T1（官方）≥ 60 分
- T1_5（官方账号）≥ 65 分
- T2（媒体个人）≥ 76 分
- EXCLUDE_MP 及其他：不参与精选评分

修改 `isSelectable` 函数强制验证分数：

```typescript
export function isSelectable(
  eligible: boolean,
  judgedSelected: boolean | null,
  tier: string,
  score: number | null,
  threshold: number | null,
): boolean {
  if (!eligible || judgedSelected !== true || tier === "EXCLUDE_MP") return false;
  // 即使 judged selected，也要验证分数
  if (score === null || threshold === null) return false;
  return score >= threshold;
}
```

## 门槛配置

门槛定义在 `industry/selection.ts`：

```typescript
export const SELECTION = {
  thresholds: { T1: 60, T1_5: 65, T2: 76 },
  understandFloor: 50,
  publicFloor: 20,  // 新增：公开门槛（仅适用于 T1/T1_5/T2）
} as const;
```

### 三层门槛

```
100 分 ─────────────────────────────
        │
        │  精选（76 分，T2 媒体个人）
 76 分 ─┤
        │  精选（65 分，T1_5 官方账号）
 65 分 ─┤
        │  精选（60 分，T1 官方一手）
 60 分 ─┤
        │
        │  全部动态（有标题摘要，不进精选）
 20 分 ─┤  
        │  仅详情页（不在列表中显示）
  0 分 ─────────────────────────────

注：EXCLUDE_MP 不受 20 分门槛约束，可直接进入"全部动态"但不能进精选
```

## 部署步骤

### 1. 应用代码修改

修改已包含在以下文件中：
- `industry/selection.ts` - 增加 `publicFloor: 20`
- `packages/backend/src/publication/rules.ts` - 两个函数都增加分数检查
- `packages/backend/src/publication/publish.ts` - 调用时传入分数和门槛，判断是否需要评分检查

### 2. 检查现有数据

```bash
# 先用 --dry-run 看看有多少文章需要处理
node scripts/revalidate-selected.ts --dry-run
```

会显示：
- 多少文章低于公开门槛（将从"全部动态"移除，详情页保留）
- 多少文章低于精选门槛（将退出精选但保留在"全部动态"）
- EXCLUDE_MP 信源不会受影响

### 3. 重新发布现有文章

```bash
# 实际执行
node scripts/revalidate-selected.ts
```

这个脚本会：
- **T1/T1_5/T2 且 < 20 分**：设置 `eligible = false`，从列表移除（详情页保留）
- **T1/T1_5/T2 且 20-59 分（T1）**：退出精选，保留在"全部动态"
- **T1/T1_5/T2 且 20-64 分（T1_5）**：退出精选，保留在"全部动态"
- **T1/T1_5/T2 且 20-75 分（T2）**：退出精选，保留在"全部动态"
- **EXCLUDE_MP**：不受影响，保持原状

### 4. 验证

```sql
-- 检查是否还有低于公开门槛的 T1/T1_5/T2 文章仍在列表中
SELECT a.id, a.score, s.tier, p.eligible, p.selected
FROM analyses a
JOIN articles ar ON ar.id = a.article_id
JOIN sources s ON s.id = ar.source_id
JOIN publications p ON p.article_id = a.article_id
WHERE p.eligible = true
  AND s.tier IN ('T1', 'T1_5', 'T2')
  AND (a.score IS NULL OR a.score < 20)
  AND a.id IN (SELECT MAX(id) FROM analyses GROUP BY article_id);
```

应该返回 0 行。

```sql
-- 检查 EXCLUDE_MP 文章是否仍能正常显示
SELECT a.id, a.score, s.tier, p.eligible, p.selected
FROM analyses a
JOIN articles ar ON ar.id = a.article_id
JOIN sources s ON s.id = ar.source_id
JOIN publications p ON p.article_id = a.article_id
WHERE s.tier = 'EXCLUDE_MP'
  AND p.eligible = true
  AND a.id IN (SELECT MAX(id) FROM analyses GROUP BY article_id)
LIMIT 10;
```

应该能看到 EXCLUDE_MP 的文章，包括 `score = null` 的。

## 影响

### 对新文章

✅ **立即生效**：
- **T1/T1_5/T2**：
  - 评分 < 20 分：仅详情页，不在列表
  - 评分 20-59 分（T1）：只在"全部动态"，不进精选
  - 评分 ≥ 60 分（T1）：可能进精选
- **EXCLUDE_MP**：
  - 无评分或低分：可进"全部动态"
  - 不会进精选

### 对现有文章

⚠️ **需要运行脚本重新验证**：
- T1/T1_5/T2 低于 20 分的文章会从列表移除（详情页保留）
- 20 分以上但低于精选门槛的文章会退出精选
- EXCLUDE_MP 文章不受影响

### 对手动覆盖

⚠️ **编辑手动设置也受门槛约束**：
- 手动设置 `selected=true` 但分数不够：不会进精选
- 手动设置 `eligible=true` 但 T1/T1_5/T2 分数 < 20：仍然不进列表

💡 建议在后台界面提示编辑当前门槛要求。

### 对事件页

ℹ️ **暂不调整**：低于 20 分的文章仍可能进入事件并出现在事件详情页。先试运行观察，后续可能调整事件归组或展示逻辑。

## 测试

新增了完整的单元测试：`tests/selection-threshold.test.ts`

运行测试：
```bash
node --test tests/selection-threshold.test.ts
```

覆盖场景：
- **精选门槛**：各分级的边界值测试
- **公开门槛**：20 分边界测试（T1/T1_5/T2）
- **EXCLUDE_MP**：无评分和低分都可进"全部动态"，不可进精选
- **边界条件**：空分数、空门槛、各种组合

## 调整门槛

如果需要调整门槛（比如改成 35 分），修改 `industry/selection.ts`：

```typescript
export const SELECTION = {
  thresholds: { T1: 60, T1_5: 65, T2: 76 },
  understandFloor: 50,
  publicFloor: 35,  // 改成 35
} as const;
```

然后重跑脚本让现有文章应用新门槛：
```bash
node scripts/revalidate-selected.ts --dry-run  # 先看影响
node scripts/revalidate-selected.ts            # 实际应用
```



