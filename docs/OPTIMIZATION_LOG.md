# 优化迭代日志

记录运营过程中的问题诊断、解决方案和效果验证。

---

## 部署环境说明

### 基础信息
- **开发环境**：Windows 11 本地电脑，通过 VSCode 的 Claude 扩展插件开发
- **生产环境**：香港云服务器
- **面板**：1Panel
- **反向代理**：OpenResty → 容器地址
- **容器列表**：
  - `aihot-kuakeai-api-1`：API 服务（Node.js，端口 3001）
  - `aihot-kuakeai-web-1`：前端服务（Node.js，端口 3000）
  - `aihot-kuakeai-worker-1`：后台任务 Worker（处理采集、模型调用、归组等）
  - `aihot-kuakeai-db-1`：PostgreSQL 数据库

### 部署流程
1. 本地修改代码
2. 手动复制代码到云服务器（如通过 SFTP、rsync 或 Git）
3. 根据修改类型决定是否需要重新构建镜像
4. 重启相关容器

---

## 修改类型与部署策略

### ✅ 不需要重新构建镜像（只需重启容器）

**特征：** 修改的是 **运行时读取的配置文件**，这些文件通过 `volumes` 挂载或在容器启动时读取。

**包括：**
- `.env` 文件（环境变量）
- `industry/` 目录下的所有文件（提示词、分类、信源、品牌等）
  - `industry/prompts/*.md`（提示词）
  - `industry/taxonomy.ts`（分类标签）
  - `industry/sources.json`（信源配置）
  - `industry/topics.json`（主题）
  - `industry/site.ts`（站点配置）
  - `industry/models.ts`（模型配置）
  - `industry/selection.ts`（评分门槛）
  - `industry/pages/*.md`（条款页面）
  - `industry/brand/*.svg`（Logo）
  - `industry/public/*`（静态文件）
- 数据库内容（后台管理页面的设置）

**部署命令：**
```bash
# 在服务器上，进入项目目录
cd /path/to/aihot-kuakeai

# 只重启 worker（提示词修改只影响 worker）
docker restart aihot-kuakeai-worker-1

# 如果改了 industry/site.ts 或 industry/taxonomy.ts，还需要重启 api 和 web
docker restart aihot-kuakeai-api-1
docker restart aihot-kuakeai-web-1
```

---

### 🔨 需要重新构建镜像（修改了应用代码）

**特征：** 修改的是 **应用逻辑、依赖或构建产物**。

**包括：**
- `apps/` 目录下的 TypeScript 代码（api、web、worker）
- `packages/` 目录下的共享代码
- `package.json` 或 `package-lock.json`（依赖变更）
- `database/migrations/*.sql`（数据库迁移）
- `Dockerfile` 或 `docker-compose.yml`

**部署命令：**
```bash
# 在服务器上，进入项目目录
cd /path/to/aihot-kuakeai

# 停止所有服务
docker compose down

# 重新构建镜像并启动
docker compose up -d --build

# 查看日志确认启动成功
docker compose logs -f --tail=100
```

**注意事项：**
- 如果有数据库迁移，`setup` 容器会自动执行 `node scripts/migrate.ts`
- 构建时间约 3-5 分钟（取决于服务器性能和网络）
- 构建期间网站会短暂不可用

---

## 快速判断方法

| 修改的文件路径 | 是否需要重新构建 | 重启哪些容器 |
|---------------|----------------|-------------|
| `industry/**/*` | ❌ 否 | `worker-1`（提示词、模型）<br>`api-1` + `web-1`（站点配置、分类） |
| `.env` | ❌ 否 | 所有容器（或只改相关的） |
| `apps/worker/src/**/*.ts` | ✅ 是 | 全部（需要 `--build`） |
| `apps/api/src/**/*.ts` | ✅ 是 | 全部（需要 `--build`） |
| `apps/web/**/*.ts(x)` | ✅ 是 | 全部（需要 `--build`） |
| `packages/**/*.ts` | ✅ 是 | 全部（需要 `--build`） |
| `package.json` | ✅ 是 | 全部（需要 `--build`） |
| `database/migrations/*.sql` | ✅ 是 | 全部（需要 `--build` + 自动迁移） |

---

## 2026-10-05：分段优化

### 问题
- **热点榜"先了解这件事"**：段落过长（195-213 字一整段），包含 3-5 个信息点混在一起
- **AI 导读**：段落过长（87-150 字一整段），2-3 层信息没有断开
- **用户反馈**：手机上看到一大块文字墙，心理上不想读，阅读疲劳

### 原因分析
1. **模型特性**：Agnes 3.0 Flash 是快速模型，对格式控制较弱，倾向于流畅连贯的叙述
2. **提示词问题**：
   - 原有指令：`涉及多个时间节点、主体或层面时...通常 2-3 段` → 条件模糊，且是"建议"而非"强制"
   - 没有明确的格式示例，模型不知道要的分段长什么样
   - "空行分隔"这种说法对模型来说太抽象

### 解决方案

#### 方案 A：强制结构化提示词（优先尝试）

**修改文件：**
- `industry/prompts/story-digest.md`（第 4-5 行）
- `industry/prompts/summarize-article.md`（第 5-10 行）

**改动要点：**
1. 把"通常 2-3 段"改成"**必须分段输出**，每段 XX 字"
2. 明确每段的内容职责（核心事实/细节/影响）
3. 给出格式示例，用 `\n\n` 而不是"空行"
4. 限制每段字数（50-100 字 或 30-60 字）

#### 方案 B：换模型（备选）

如果方案 A 试了 1-2 天效果不佳，切换到：
- DeepSeek Flash（格式控制更好，成本相当）
- Qwen 3.8 Flash（阿里的，中文格式控制强）
- GLM 5.3 Flash（智谱的，结构化能力好）

**操作：** 在 `.env` 里加：
```bash
DIGEST_MODEL=deepseek-flash
SUMMARIZE_MODEL=deepseek-flash
```

#### 方案 C：前端强制分段（最后手段）

在渲染前按句号/字数强制断开，但断点可能不合理，不推荐。

### 验证计划
1. 部署方案 A 的提示词修改
2. 观察 1-2 天的实际输出
3. 检查热点榜和文章页的分段效果
4. 如果不理想，执行方案 B

### 实际修改内容

#### 1. `industry/prompts/story-digest.md`
**改动：**
- 删除模糊的"涉及多个时间节点、主体或层面时...通常 2-3 段"
- 改为明确的分段规则：
  * 每段 50-100 字，段落间用 `\n\n` 分隔
  * 加弹性条款：4个以上节点可输出4段；不足100字可单段
  * 给出格式示例

#### 2. `industry/prompts/summarize-article.md`
**改动：**
- 删除"最多 3 句"的限制（与分段冲突）
- 明确三段逻辑：
  * 第一段：核心事实/观点 + 关键数据（40-70字）—— 避免观点类文章第一段空洞
  * 第二段：补充细节（30-60字）
  * 第三段：影响或意义（**仅当原文明确提到时才写**，改为可选）
  * 加弹性条款：不足100字可合并为两段或单段
- 给出格式示例

#### 3. `industry/prompts/summarize-long-post.md`
**改动：**
- 删除模糊的"涉及多个层面...通常 2-3 段"
- 改为和 `summarize-article.md` 一致的明确规则：
  * 第一段：核心事实/观点 + 关键数据（40-70字）
  * 第二段：补充细节（30-60字）
  * 第三段：影响或意义（可选，仅当原文提到）
  * 加弹性条款：不足100字可合并
  * 给出格式示例

#### 4. `industry/prompts/report-period.md`
**改动：**
- 在 `overview` 的要求里加入分段规则：
  * 每段 60-120 字，一个完整意思
  * 段落间用 `\n\n` 分隔
  * 通常 2-3 段，视内容可扩展到 4 段
  * 给出格式示例

#### 5. 前端文件（13 处）
**改动：**
- 所有显示 `summary`、`digest`、`overview`、`reason` 的地方，加上 `whitespace-pre-line` 类名
- 作用：让浏览器保留文本中的换行符 `\n\n`，显示分段效果
- 涉及文件：
  * `apps/web/app/routes/item.tsx`（4 处）
  * `apps/web/app/features/feed/FeedItem.tsx`（2 处）
  * `apps/web/app/routes/story.tsx`（1 处）
  * `apps/web/app/routes/hot.tsx`（4 处）
  * `apps/web/app/features/report/ReportPaper.tsx`（4 处）

### 覆盖度校验结果
- ✅ **5/7 类型完全适配**：产品发布、公司动态、政策法规、商业合作、安全事件
- ⚠️ **2/7 类型已优化**：技术突破（调整分段逻辑）、行业趋势（第一段"观点+数据"合并）
- ✅ **边界情况已处理**：极短新闻可单段，极长事件可4段

### 本次修改的部署步骤

**本次修改的文件：**

#### 提示词文件（4 个）
- ✅ `industry/prompts/story-digest.md`（热点榜综述）
- ✅ `industry/prompts/summarize-article.md`（文章 AI 导读）
- ✅ `industry/prompts/summarize-long-post.md`（长推文摘要）
- ✅ `industry/prompts/report-period.md`（周报月报总述）

#### 前端文件（5 个，共 13 处）
- ✅ `apps/web/app/routes/item.tsx`（4 处：文章详情页的 summary 和 reason）
- ✅ `apps/web/app/features/feed/FeedItem.tsx`（2 处：动态卡片的 summary 和 reason）
- ✅ `apps/web/app/routes/story.tsx`（1 处：时间线报道摘要）
- ✅ `apps/web/app/routes/hot.tsx`（4 处：热点榜摘要和最新进展）
- ✅ `apps/web/app/features/report/ReportPaper.tsx`（4 处：周报月报总述、头条导语、栏目导读、文章摘要）
- ✅ `docs/optimization-log.md`（文档，不影响运行）

**判断：** 
- ❌ **提示词修改不需要重新构建镜像**，只需重启 worker 容器
- ✅ **前端文件修改需要重新构建镜像**（修改了 `apps/web` 的 TypeScript 代码）

**部署步骤：**

```bash
# 1. 在本地提交代码（可选，方便版本管理）
git add industry/prompts/story-digest.md
git add industry/prompts/summarize-article.md
git add industry/prompts/summarize-long-post.md
git add industry/prompts/report-period.md
git add apps/web/app/routes/item.tsx
git add apps/web/app/features/feed/FeedItem.tsx
git add apps/web/app/routes/story.tsx
git add apps/web/app/routes/hot.tsx
git add apps/web/app/features/report/ReportPaper.tsx
git add docs/optimization-log.md
git commit -m "优化分段：统一全站文本内容的分段显示

- 提示词：明确分段规则，每段50-100字或30-60字
- 前端：添加 whitespace-pre-line 支持换行显示
- 覆盖：热点榜、文章详情、动态卡片、周报月报"

# 2. 复制修改后的文件到云服务器
# 方式A：通过 SFTP/FTP 工具（如 WinSCP、FileZilla）
#   上传所有修改的文件

# 方式B：通过 rsync（如果服务器开放 SSH）
rsync -avz --progress --exclude='.git' --exclude='node_modules' --exclude='.data' ./ user@your-server:/path/to/aihot-kuakeai/

# 方式C：在服务器上用 Git（推荐）
# ssh user@your-server
# cd /path/to/aihot-kuakeai
# git pull

# 3. 在服务器上重新构建并重启所有容器
ssh user@your-server
cd /path/to/aihot-kuakeai

# 停止所有服务
docker compose down

# 重新构建镜像并启动（需要 3-5 分钟）
docker compose up -d --build

# 4. 查看日志确认启动成功
docker compose logs -f --tail=100

# 看到以下日志表示成功：
# - aihot-kuakeai-api-1: "API listening on port 3001"
# - aihot-kuakeai-web-1: "Server ready on http://..."
# - aihot-kuakeai-worker-1: "Worker started"
# - aihot-kuakeai-db-1: "database system is ready to accept connections"

# 5. 等待新任务生成内容（1-2小时后开始看到效果）
# worker 会处理新采集的文章，用新的提示词生成综述和导读
# 前端会用 whitespace-pre-line 显示分段内容
```

**预计生效时间：**
- 重新构建需要 3-5 分钟
- 重启后立即生效（新的提示词会被读取，前端会显示分段）
- 但需要等 worker 处理**新的任务**才能看到新提示词的效果
- 已经生成的历史内容不会自动更新
- 建议 1-2 小时后查看新发布的文章和热点榜

**验证方式：**
1. 打开网站首页，查看热点榜的"先了解这件事"是否分段
2. 随机打开几篇新发布的文章，查看"AI 导读"是否分段
3. 打开动态卡片，查看摘要是否分段
4. 打开周报月报，查看"本期导读"和"本版导读"是否分段
5. 检查段落之间是否有明显的空行
6. 检查段落长度是否在 50-100 字或 30-60 字范围

**关键点：前端为什么要加 `whitespace-pre-line`？**

提示词生成的文本包含换行符 `\n\n`（段落之间的空行），但浏览器默认会忽略这些换行符，把多段文本合并成一整段显示。

`whitespace-pre-line` 的作用：
- 保留文本中的换行符（`\n`）
- 自动换行（不会横向滚动）
- 合并多个空格为一个

示例：
```
# 提示词生成的文本（存在数据库里）
"第一段：核心事实。\n\n第二段：技术细节。"

# 没有 whitespace-pre-line：浏览器渲染
"第一段：核心事实。 第二段：技术细节。"  ❌ 变成一行

# 有 whitespace-pre-line：浏览器渲染
"第一段：核心事实。

第二段：技术细节。"  ✅ 保留空行
```

**验证过的位置：**
- ✅ 事件详情页的"先了解这件事"（story.tsx:266）已经有 `whitespace-pre-line`，确认可以正常显示分段
- ✅ 引用推文内容（QuotedPost.tsx:26）已经有 `whitespace-pre-line`，确认可以保留原文换行

**本次补充的位置：**
- 文章详情页、动态卡片、热点榜、周报月报的所有文本内容（共 13 处）

### 效果记录
- **修改时间**：2026-10-05
- **部署时间**：待填
- **验证时间**：待填（建议观察 1-2 天）
- **效果**：待填
- **是否需要进一步调整**：待填

---

## 模板：新问题记录

### 问题
（描述具体现象，最好附截图或链接）

### 原因分析
（诊断根本原因）

### 解决方案
（方案 A、B、C，注明优先级）

### 验证计划
（如何验证效果）

### 效果记录
- **部署时间**：
- **验证时间**：
- **效果**：
- **是否需要进一步调整**：
