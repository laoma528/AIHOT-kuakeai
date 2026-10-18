# kuake.ai 运维速查

更新：2026-10-04。本文件记录已确认的重复操作，供本仓库后续任务直接参考。狗云服务器可以直接通过 SSH 连接，使用者已明确告知，不要再问是否支持 SSH。具体主机地址、登录用户、认证方式、服务器项目目录和服务器当前状态尚未记录；不要猜测，也不要在本文件保存密钥或密码。

## 部署方式

- 使用者要求登录狗云服务器时，按 SSH 连接处理。只在缺少实际连接参数时询问主机、用户名或认证方式；不要重复询问能否使用 SSH。
- 本仓库提供 `docker-compose.yml`；以下命令适用于服务器按该文件部署的情况。`api` 负责后台预览，`worker` 负责定时采集，`web` 提供页面，`setup` 执行迁移和种子数据。服务器实际部署方式尚未核实。
- 使用者有时通过上传文件更新服务器。这种情况下不要默认让他运行 `git pull`。
- **仅修改 `industry/site.ts` 的 `crawlerName` 等无需迁移的后端配置时**，进入服务器上含 `docker-compose.yml` 的项目目录，执行：

  ```bash
  grep -n 'crawlerName' industry/site.ts
  docker compose build api
  docker compose up -d --no-deps --force-recreate api worker
  docker compose ps api worker
  docker compose logs --tail=80 api worker
  ```

  `crawlerName` 应为纯英文，例如 `KuakeAIBot/1.0 (+https://kuake.ai/)`。然后在后台对受影响的信源预览一次，检查采集记录。只改服务器文件后执行 `docker compose restart` 不会让旧容器使用新代码。
- 如果更新包含数据库迁移或多个服务的代码，按 [部署文档的更新顺序](deploy.md#更新)处理：备份、构建、停止旧的 API/worker/web、运行 setup、启动新版服务。不要把上面的局部重建命令当作通用升级步骤。
- **只改服务器 `.env` 里的普通应用配置值时**，在项目目录重建使用该变量的容器，使新环境变量生效；不必重新构建镜像。`SOCIALDATA_API_KEY` 涉及 `api`（预览）和 `worker`（采集）：

  ```bash
  docker compose up -d --no-deps --force-recreate api worker
  docker compose ps api worker
  ```

  站点 URL、会话等多个进程共用的配置，可重建 `api worker web`。`docker compose restart` 只重启现有容器，不重新读取环境变量。若改的是 `POSTGRES_PASSWORD` 等数据库凭据，先按数据库凭据变更流程处理，不能套用普通应用配置命令。
- **`ALERT_QUIET_MINUTES` 特例：**只有 `worker` 的 `ops.alerts` 读取它；当前 `packages/backend/src/operations/alerts.ts` 把值上限设为 1440 分钟，并且只查询最近一天的文章。把 `.env` 从 1440 改成 21600 后，即使重建 `worker`，实际仍按 1440 分钟告警。要真正支持 15 天，需要修改这两处代码逻辑、测试后再构建部署；只改 `.env` 不够。

## 已定位的 X 抓取报错

- 报错 `Cannot convert argument to a ByteString ... index 32 ... 26085` 指向请求头里的“日”。`packages/backend/src/lib/http-fetch.ts` 将 `industry/site.ts` 的 `SITE.crawlerName` 放进 `User-Agent`；中文爬虫名使 `Headers` 在发出请求前抛错。
- 修复方向是让 `crawlerName` 使用纯英文，中文站名可以保留。无需因此修改 X 账号查询或 SocialData 密钥。
- 失败的采集不会推进成功游标；成功采集会清除该信源的连续失败计数和错误。后台预览可能建立付费请求回执，错误未修复时不要反复预览。

## 信源台账

- 候选和后台添加状态记录在 [信源台账](SOURCES-RECOMMENDATIONS.md)。后台添加且预览或首次抓取成功后，将该信源从「候选／未添加」表移到「已添加」表，状态同步改为「已添加」。
- 不因仓库预置就推断线上后台已添加；信源采集配置、等级等以后台实际值为准。
- 使用者会持续提供国内官方大模型的微信公众号 `user_name`（原始 ID）和 `nick_name`（名称）。先在台账的「公众号」表整理一行，再用 computer use 在 `https://kuake.ai/admin/sources/new` 填写并创建；使用者已授权后续同类任务由 Agent 代填和在后台添加。后台信源 ID 只接受小写字母、数字和连字符，公众号采用 `gzh-名称拼音或英文`，不能使用下划线。
- 公众号信源选择「公众号」类型，采集配置为 `{"ghid":"<user_name>","nickname":"<nick_name>"}`。官方账号可按台账建议设为「精选 / T1」，标签和间隔以当次台账记录为准；全文展示两项默认关闭。公众号不支持预览抓取；创建后在详情页点击「立即采集」，检查采集记录和最近条目，再同步台账状态。首次采集若失败，记录具体错误，不能写成接入成功。`DAJIALA_KEY` 和付费预算在后台运行环境配置，不写入信源 JSON 或本仓库。
- 2026-10-04 APPSO、可灵AI 和机器之心首抓时出现 `Budget for dajiala exhausted (minute)`：任务可能已写入部分条目，但「采集记录」仍为 `failed`，健康显示未检查、上次成功为空。此时台账标「已创建·待首抓成功」并记录已入库数量；不要因部分条目入库就标「已添加」，也不要连续手动重试耗费额度。APPSO 和可灵AI 后续自动重试成功。
- 使用者充值极致了后，明确同意把后台「设置 → 付费请求上限」中 `dajiala` 的每分钟上限从 5 提高到 20；每小时 60、每天 500 保持不变。2026-10-04 已在后台保存并核对。机器之心随后重试成功。充值的是极致了账户余额，站内预算熔断仍按后台上限独立生效。
- 公众号首次采集只导入最近 7 天的文章（`packages/backend/src/sources/mp.ts` 的 `FIRST_CHECK_WINDOW_MS`）。若采集记录 `ok`、发现数大于 0 但新增 0，先看详情页游标的 `lastPostTime`；如阶跃星辰开放平台最近一篇为 2026-09-24，2026-10-04 首抓发现 10 条但都超出窗口，不是配置失败。

## 后续回答习惯

先使用本速查及本次对话已确认的信息，直接给具体命令或结论。只有操作依赖尚未记录的服务器路径、部署方式变更、迁移范围等信息时，才要求用户补充。
