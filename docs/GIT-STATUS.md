# Git 仓库现状

记录时间：2026-10-18

## 仓库关系

- **原作者仓库**：https://github.com/KKKKhazix/AIHOT.git
- **我的 fork**：https://github.com/laoma528/AIHOT-kuakeai.git
- **本地目录**：`g:\Github\AIHOT-kuakeai`

## 本地 remote 配置

```
origin    https://github.com/laoma528/AIHOT-kuakeai.git  ← 我自己的 fork
upstream  https://github.com/KKKKhazix/AIHOT.git         ← 原作者仓库（只拉取，不推送）
```

## 当前状态

- 本地代码是基于原作者旧提交 `3343fe2` 做的二次开发
- 二开改动已于 2026-10-18 提交并强推到 `origin/main`（提交 `8adc8d9`）
- 原作者从 `3343fe2` 到现在又有新的更新，尚未合并进来

## 同步原作者更新的标准流程

```bash
# 拉取原作者最新代码
git fetch upstream

# 查看原作者有哪些我没有的提交
git log main..upstream/main --oneline

# 查看具体文件差异
git diff --stat main upstream/main

# 合并（有冲突时手动解决）
git merge upstream/main

# 推到自己的 fork
git push origin main
```

## 注意事项

- 不要直接 `git push upstream`，那会推到原作者仓库
- 二开代码和原作者更新有大量文件重叠（历史上 490/559 文件重叠），合并时预计有冲突
- 合并前先用 `git diff --stat` 评估影响范围
