# AI 行业信源台账

更新：2026-10-11。**一个信源一行**。新增信源放在「候选／未添加」表；确认已在后台添加且抓取成功后，将该行移到「已添加」表，并把状态改为「已添加」。停用时把状态改为「已停用」。

「已添加」表示已在 kuake.ai 后台添加且预览或首次抓取成功；其余后台字段仍是表内建议值，若实际配置不同，以后台为准。表内分钟数通常是初始建议值；下方 32 个公众号的间隔已于 2026-10-07 在后台逐一保存并重新加载核对，T1 为 1440 分钟（24 小时），T2 为 360 分钟（6 小时）。RSS 等信源每天会按近 7 天产出自动调整，精选 RSS 通常在 15～60 分钟内，不能把后台自动调整后的分钟数视为配置不一致。「仓库预置」表示出现在 `industry/sources.json`，**不代表已核实你的线上后台**。其他状态是候选记录；「待核验」先试抓，「非 RSS」不能填入 RSS 类型。「X 候选」需要 `SOCIALDATA_API_KEY`，预览也可能付费。后台的「站内可展示全文」「对外接口可带全文」全部保持**不勾选**，除非来源明确授权。当前后台以等级 `T1` 判断一手，没有单独的一手勾选项。

## 仓库预置

这些信源出现在 `industry/sources.json`，尚未据此确认线上后台状态。

| 状态 | 地区·语言 | 分类 | 名称 / ID | 类型 | 参与 / 等级 / 分钟 | 标签 | 采集配置（JSON） | 为什么收录 | 风险及建议 |
|---|---|---|---|---|---|---|---|---|---|
| 仓库预置 | 国外·英文 | 官方一手 | OpenAI News<br>`rss-openai-news` | RSS | 精选 / T1 / 120 | `官方` | `{"feedUrl":"https://openai.com/news/rss.xml"}` | 发布方原始动态 | 与其他官方渠道查重 |
| 仓库预置 | 国外·英文 | 官方一手 | Google DeepMind<br>`rss-google-deepmind` | RSS | 精选 / T1 / 120 | `官方` | `{"feedUrl":"https://deepmind.google/blog/rss.xml"}` | 发布方原始动态 | 与其他官方渠道查重 |
| 仓库预置 | 国外·英文 | 官方一手 | Google Research<br>`rss-google-research` | RSS | 精选 / T1 / 120 | `官方,研究` | `{"feedUrl":"https://research.google/blog/rss/"}` | 发布方原始动态 | 与其他官方渠道查重 |
| 仓库预置 | 国外·英文 | 官方一手 | Hugging Face Blog<br>`rss-hugging-face` | RSS | 精选 / T1 / 120 | `官方,开源` | `{"feedUrl":"https://huggingface.co/blog/feed.xml"}` | 发布方原始动态 | 与其他官方渠道查重 |
| 仓库预置 | 国外·英文 | 官方一手 | Microsoft Research<br>`rss-microsoft-research` | RSS | 精选 / T1 / 120 | `官方,研究` | `{"feedUrl":"https://www.microsoft.com/en-us/research/feed/"}` | 发布方原始动态 | 与其他官方渠道查重 |
| 仓库预置 | 国外·英文 | 官方一手 | NVIDIA Blog<br>`rss-nvidia-blog` | RSS | 精选 / T1 / 120 | `官方` | `{"feedUrl":"https://blogs.nvidia.com/feed/"}` | 发布方原始动态 | 与其他官方渠道查重 |
| 仓库预置 | 国外·英文 | 官方一手 | AWS Machine Learning Blog<br>`rss-aws-ml` | RSS | 精选 / T1 / 120 | `官方,教程` | `{"feedUrl":"https://aws.amazon.com/blogs/machine-learning/feed/"}` | 发布方原始动态 | 与其他官方渠道查重 |
| 仓库预置 | 国外·英文 | 官方一手 | GitHub Blog · AI & ML<br>`rss-github-ai` | RSS | 精选 / T1 / 120 | `官方` | `{"feedUrl":"https://github.blog/ai-and-ml/feed/"}` | 发布方原始动态 | 与其他官方渠道查重 |
| 仓库预置 | 国外·英文 | 官方一手 | Mistral AI<br>`rss-mistral` | RSS | 精选 / T1 / 120 | `官方` | `{"feedUrl":"https://mistral.ai/rss.xml"}` | 发布方原始动态 | 与其他官方渠道查重 |
| 仓库预置 | 国外·英文 | 论文研究 | Berkeley AI Research<br>`rss-bair` | RSS | 精选 / T1 / 180 | `研究` | `{"feedUrl":"https://bair.berkeley.edu/blog/feed.xml"}` | 研究机构动态 | 与其他官方渠道查重 |
| 仓库预置 | 国外·英文 | 媒体 | The Verge · AI<br>`rss-the-verge-ai` | RSS | 精选 / T2 / 60 | `媒体` | `{"feedUrl":"https://www.theverge.com/rss/ai-artificial-intelligence/index.xml"}` | 新闻覆盖 | 二手报道，核对原始出处 |
| 仓库预置 | 国外·英文 | 媒体 | TechCrunch · AI<br>`rss-techcrunch-ai` | RSS | 精选 / T2 / 60 | `媒体` | `{"feedUrl":"https://techcrunch.com/category/artificial-intelligence/feed/"}` | 新闻覆盖 | 二手报道，核对原始出处 |
| 仓库预置 | 国外·英文 | 媒体 | Ars Technica · AI<br>`rss-ars-technica-ai` | RSS | 精选 / T2 / 60 | `媒体` | `{"feedUrl":"https://arstechnica.com/ai/feed/"}` | 新闻覆盖 | 二手报道，核对原始出处 |
| 仓库预置 | 国外·英文 | 媒体 | MIT Technology Review · AI<br>`rss-mit-tech-review-ai` | RSS | 精选 / T2 / 120 | `媒体` | `{"feedUrl":"https://www.technologyreview.com/topic/artificial-intelligence/feed"}` | 新闻覆盖 | 二手报道，核对原始出处 |
| 仓库预置 | 国外·英文 | 媒体 | The Decoder<br>`rss-the-decoder` | RSS | 精选 / T2 / 60 | `媒体` | `{"feedUrl":"https://the-decoder.com/feed/"}` | 新闻覆盖 | 二手报道，核对原始出处 |
| 仓库预置 | 国外·英文 | 个人博客 | Simon Willison<br>`rss-simon-willison` | RSS | 精选 / T2 / 120 | `个人` | `{"feedUrl":"https://simonwillison.net/atom/everything/"}` | 深度观点与汇总 | 二手报道，核对原始出处 |
| 仓库预置 | 国外·英文 | 周刊 | Import AI<br>`rss-import-ai` | RSS | 精选 / T2 / 180 | `个人,周刊` | `{"feedUrl":"https://importai.substack.com/feed"}` | 深度观点与汇总 | 二手报道，核对原始出处 |
| 仓库预置 | 国外·英文 | 周刊 | Latent Space<br>`rss-latent-space` | RSS | 精选 / T2 / 180 | `个人` | `{"feedUrl":"https://www.latent.space/feed"}` | 深度观点与汇总 | 二手报道，核对原始出处 |
| 仓库预置 | 国外·英文 | 周刊 | Rohan's Bytes<br>`rss-rohan-paul` | RSS | 精选 / T2 / 180 | `个人,日报` | `{"feedUrl":"https://rohanpaul.substack.com/feed"}` | 深度观点与汇总 | 二手报道，核对原始出处 |
| 仓库预置 | 国内·中文 | 媒体 | IT之家<br>`rss-ithome` | RSS | 精选 / T2 / 60 | `媒体,中文` | `{"feedUrl":"https://www.ithome.com/rss/"}` | 新闻覆盖 | 泛科技内容，筛掉非 AI |

## 已添加

已确认在 kuake.ai 后台添加且预览或首次抓取成功的信源。

| 状态 | 地区·语言 | 分类 | 名称 / ID | 类型 | 参与 / 等级 / 分钟 | 标签 | 采集配置（JSON） | 为什么收录 | 风险及建议 |
|---|---|---|---|---|---|---|---|---|---|
| 已添加 | 国内·中文 | 官方一手 | 阶跃StepFun<br>`gzh-stepfun` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,大模型` | `{"ghid":"gh_03a8689b9133","nickname":"阶跃StepFun"}` | 阶跃星辰模型与产品动态 | 2026-10-04 23:32 自动重试成功，累计 10 条；与阶跃星辰开放平台共用讨论分组 `stepfun`；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | 硅基流动<br>`gzh-siliconflow` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,平台` | `{"ghid":"gh_3bb1469388d6","nickname":"硅基流动"}` | 硅基流动 AI 模型服务平台动态 | 2026-10-05 01:07 抓取成功，累计 10 条；全文展示关闭 |
| 已添加·待新文 | 国内·中文 | 官方一手 | 阿里云<br>`gzh-alibaba-cloud` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,云计算` | `{"ghid":"gh_df8e91cf9944","nickname":"阿里云"}` | 阿里云 AI 与云服务动态 | 2026-10-05 首抓成功，发现 10 条、新增 0 条；最近一篇为 9 月 24 日，超出首次采集的 7 天窗口；别名 Alibaba-Cloud；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | 阿里云百炼<br>`gzh-aliyun-bailian` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,开发者` | `{"ghid":"gh_7aad4a186d5e","nickname":"阿里云百炼"}` | 百炼平台与模型服务动态 | 2026-10-05 首抓成功，发现 10 条、新增 2 条；别名 bailian_aigc；全文展示关闭 |
| 已添加·待新文 | 国内·中文 | 官方一手 | 智谱<br>`gzh-zhipu` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,大模型` | `{"ghid":"gh_4183386accbb","nickname":"智谱"}` | 智谱模型与产品动态 | 2026-10-05 首抓成功，发现 11 条、新增 0 条；最近一篇为 9 月 18 日，超出首次采集的 7 天窗口；别名 zhipu_ai；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | 科大讯飞<br>`gzh-iflytek` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,语音` | `{"ghid":"gh_5c3082b6549f","nickname":"科大讯飞"}` | 语音与大模型产品动态 | 2026-10-05 首抓成功，发现 10 条、新增 1 条；别名 iFLYTEK1999；全文展示关闭 |
| 已添加·待新文 | 国内·中文 | 官方一手 | 豆包工作<br>`gzh-doubao-work` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,产品` | `{"ghid":"gh_e3f9b39d7b5b","nickname":"豆包工作"}` | 豆包产品与工作场景动态 | 2026-10-05 首抓成功，发现 13 条、新增 0 条；最近一篇为 9 月 24 日，超出首次采集的 7 天窗口；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | Unitree宇树<br>`gzh-unitree` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,机器人` | `{"ghid":"gh_94d203cdfd40","nickname":"Unitree宇树"}` | 宇树机器人与具身智能动态 | 2026-10-05 首抓成功，发现 10 条、新增 2 条；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | Qoder<br>`gzh-qoder` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,编程` | `{"ghid":"gh_451cd4ac4921","nickname":"Qoder"}` | AI 编程产品动态 | 2026-10-05 首抓成功，发现 10 条、新增 8 条；别名 Qoder_AI；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | 蚂蚁开源<br>`gzh-ant-oss` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,开源` | `{"ghid":"gh_1041bf98f384","nickname":"蚂蚁开源"}` | 蚂蚁集团开源模型与项目动态 | 2026-10-05 首抓成功，发现 11 条、新增 1 条；别名 Ant-OSS；全文展示关闭 |
| 已添加 | 国内·中文 | 媒体 | 智东西<br>`gzh-zhidongxi` | 公众号 | 精选 / T2 / 360 | `媒体,中文,国内,AI,科技` | `{"ghid":"gh_06a331376c81","nickname":"智东西"}` | 中文 AI 与科技报道 | 2026-10-05 抓取成功，累计 14 条；后续有极致了分钟预算失败，留意自动恢复；别名 zhidxcom；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | 面壁智能<br>`gzh-modelbest` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,大模型` | `{"ghid":"gh_87945641f66a","nickname":"面壁智能"}` | 面壁模型与产品动态 | 2026-10-05 抓取成功，累计 4 条；后续有极致了分钟预算失败，留意自动恢复；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | Kimi开放平台<br>`gzh-kimi-api` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,开发者` | `{"ghid":"gh_588093b65448","nickname":"Kimi开放平台"}` | Kimi API 与开发者动态 | 2026-10-05 首抓成功，发现 11 条、新增 1 条；别名 KimiAPI；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | RunningHUB<br>`gzh-runninghub` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,创作平台` | `{"ghid":"gh_f28eb565cf75","nickname":"RunningHUB"}` | AI 创作平台动态 | 2026-10-05 首抓成功，发现 11 条、新增 1 条；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | 商汤科技SenseTime<br>`gzh-sensetime` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,大模型` | `{"ghid":"gh_5f620cd90fd6","nickname":"商汤科技SenseTime"}` | 商汤模型与产品动态 | 2026-10-05 首抓成功，发现 10 条、新增 3 条；别名 SenseTime2017；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | 豆包<br>`gzh-doubao` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,大模型` | `{"ghid":"gh_9344ff431595","nickname":"豆包"}` | 豆包模型与产品动态 | 2026-10-05 首抓成功，发现 10 条、新增 2 条；别名 doubao_official；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | DeepSeek<br>`gzh-deepseek` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI` | `{"ghid":"gh_bc02ff24ae0f","nickname":"DeepSeek"}` | DeepSeek 官方模型与产品动态 | 2026-10-04 首抓成功，发现 10 条、新增 1 条；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | 哩布哩布AI<br>`gzh-liblibai` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI` | `{"ghid":"gh_315e955abdf5","nickname":"哩布哩布AI"}` | 官方 AI 创作产品与模型动态 | 2026-10-04 首抓成功，发现 10 条、新增 2 条；新条目仍在处理，全文展示关闭 |
| 已添加 | 国内·中文 | 媒体 | APPSO<br>`gzh-appso` | 公众号 | 精选 / T2 / 360 | `媒体,中文,国内,AI` | `{"ghid":"gh_80d2528f3dcd","nickname":"APPSO"}` | AI 产品与科技报道补充 | 2026-10-04 自动重试成功，累计 10 条；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | 可灵AI<br>`gzh-kling-ai` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI` | `{"ghid":"gh_719349a5fbc9","nickname":"可灵AI"}` | 可灵 AI 模型与产品的一手动态 | 2026-10-04 自动重试成功，累计 4 条；全文展示关闭 |
| 已添加 | 国内·中文 | 媒体 | 机器之心<br>`gzh-jiqizhixin` | 公众号 | 精选 / T2 / 360 | `媒体,中文,国内,研究,AI` | `{"ghid":"gh_dbc0a5474692","nickname":"机器之心"}` | 中文 AI 研究与产业报道 | 2026-10-04 上调极致了每分钟上限后重试成功，累计 19 条；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | ZCode<br>`gzh-zcode` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,编程` | `{"ghid":"gh_035653357d11","nickname":"ZCode"}` | 智谱 AI 编程产品动态 | 2026-10-04 首抓成功，发现 8 条、新增 1 条；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | 阶跃星辰开放平台<br>`gzh-stepfun-open` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,开发者` | `{"ghid":"gh_6becc1ea0577","nickname":"阶跃星辰开放平台"}` | 阶跃星辰模型与开放平台动态 | 2026-10-04 首抓成功，发现 10 条、新增 0 条；最近一篇为 9 月 24 日，超出首次采集的 7 天窗口；与阶跃StepFun共用讨论分组 `stepfun`；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | 阿里语音AI<br>`gzh-ali-voice-ai` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,语音` | `{"ghid":"gh_a2368735f0c3","nickname":"阿里语音AI"}` | 阿里语音模型与产品动态 | 2026-10-04 首抓成功，发现 10 条、新增 1 条；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | 百灵大模型<br>`gzh-ant-ling` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,开源` | `{"ghid":"gh_d0477bba6511","nickname":"百灵大模型"}` | 蚂蚁百灵模型发布与技术动态 | 2026-10-04 首抓成功，发现 10 条、新增 2 条；全文展示关闭 |
| 已添加·待新文 | 国内·中文 | 官方一手 | 爱诗科技 AIsphere<br>`gzh-aisphere` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,视频` | `{"ghid":"gh_a9d0a4851bfb","nickname":"爱诗科技 AIsphere"}` | 爱诗科技 AI 视频产品与模型动态 | 2026-10-04 首抓成功，发现 14 条、新增 0 条；最近一篇为 9 月 24 日，超出首次采集的 7 天窗口；全文展示关闭 |
| 已添加·待新文 | 国内·中文 | 官方一手 | 千问大模型<br>`gzh-qwen` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,大模型` | `{"ghid":"gh_32a9d6458cad","nickname":"千问大模型"}` | 千问模型与产品动态 | 2026-10-04 首抓成功，发现 10 条、新增 0 条；最近一篇为 9 月 23 日，超出首次采集的 7 天窗口；全文展示关闭 |
| 已添加·待新文 | 国内·中文 | 官方一手 | 月之暗面 Kimi<br>`gzh-kimi` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,大模型` | `{"ghid":"gh_5c823178841a","nickname":"月之暗面 Kimi"}` | 月之暗面模型与 Kimi 产品动态 | 2026-10-04 首抓成功，发现 10 条、新增 0 条；最近一篇为 9 月 21 日，超出首次采集的 7 天窗口；全文展示关闭 |
| 已添加·待新文 | 国内·中文 | 官方一手 | Xiaomi MiMo<br>`gzh-xiaomi-mimo` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,大模型` | `{"ghid":"gh_28f8e6ef12e0","nickname":"Xiaomi MiMo"}` | 小米 MiMo 模型与产品动态 | 2026-10-04 首抓成功，发现 10 条、新增 0 条；最近一篇为 9 月 24 日，超出首次采集的 7 天窗口；全文展示关闭 |
| 已添加·待新文 | 国内·中文 | 官方一手 | 腾讯混元<br>`gzh-tencent-hunyuan` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,大模型` | `{"ghid":"gh_32d4a00a11f9","nickname":"腾讯混元"}` | 腾讯混元模型与产品动态 | 2026-10-04 首抓成功，发现 10 条、新增 0 条；最近一篇为 9 月 24 日，超出首次采集的 7 天窗口；全文展示关闭 |
| 已添加 | 国内·中文 | 官方一手 | HiDream智象元一<br>`gzh-hidream` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,图像` | `{"ghid":"gh_c0ecfe7d3428","nickname":"HiDream智象元一"}` | 智象元一图像模型与产品动态 | 2026-10-04 首抓成功，发现 10 条、新增 2 条；全文展示关闭 |
| 已添加·待新文 | 国内·中文 | 官方一手 | MiniMax 稀宇科技<br>`gzh-minimax` | 公众号 | 精选 / T1 / 1440 | `官方,中文,国内,AI,大模型` | `{"ghid":"gh_0408ea2df307","nickname":"MiniMax 稀宇科技"}` | MiniMax 模型与产品动态 | 2026-10-04 首抓成功，发现 10 条、新增 0 条；最近一篇为 9 月 20 日，超出首次采集的 7 天窗口；全文展示关闭 |
| 已添加 | 国外·英文 | 官方一手 | Google Blog（AI）<br>`rss-google-blog-ai` | RSS | 精选 / T1 / 120 | `官方,英文,国外` | `{"feedUrl":"https://blog.google/innovation-and-ai/technology/ai/rss/"}` | 跨产品 AI 公告 | 与 DeepMind、Research 可能交叉；观察独有内容 |
| 已添加 | 国外·英文 | 论文研究 | arXiv · AI（cs.AI）<br>`rss-arxiv-ai` | RSS | 精选 / T1 / 360 | `研究,论文,英文,国外` | `{"feedUrl":"https://rss.arxiv.org/rss/cs.AI"}` | 论文首发线索 | 原文建议 T1；预印本未评审，等级可再复核 |
| 已添加 | 国外·英文 | 论文研究 | arXiv · ML（cs.LG）<br>`rss-arxiv-lg` | RSS | 精选 / T1 / 360 | `研究,论文,英文,国外` | `{"feedUrl":"https://rss.arxiv.org/rss/cs.LG"}` | 机器学习论文 | 原文建议 T1；与 cs.AI 交叉，观察重复率 |
| 已添加 | 国外·英文 | 媒体/周刊 | TLDR AI<br>`rss-tldr-ai` | RSS | 精选 / T2 / 120 | `媒体,汇总,英文,国外` | `{"feedUrl":"https://tldr.tech/api/rss/ai"}` | 每日汇总补漏 | 二手摘要；与原文查重 |
| 已添加 | 国外·英文 | 媒体/周刊 | State of AI<br>`rss-state-of-ai` | RSS | 精选 / T2 / 240 | `个人,深度,英文,国外` | `{"feedUrl":"https://nathanbenaich.substack.com/feed"}` | 投资与研究视角 | 发刊频率低，观察独有内容 |
| 已添加 | 国外·英文 | 媒体/周刊 | Towards AI（Louis-François Bouchard）<br>`rss-towards-ai` | RSS | 精选 / T2 / 180 | `个人,工程,英文,国外` | `{"feedUrl":"https://louisbouchard.substack.com/feed.xml"}` | 工程师视角 | 观察更新频率与独有内容 |
| 已添加 | 国外·英文 | 媒体/周刊 | The AI POV · News<br>`rss-the-ai-pov` | RSS | 精选 / T2 / 180 | `媒体,英文,国外` | `{"feedUrl":"https://theaipov.news/news/feed/"}` | 补充 AI 新闻 | 观察更新频率及与现有媒体重复率 |
| 已添加 | 国外·英文 | 媒体/周刊 | Seven Minute Feed<br>`rss-seven-minute-feed` | RSS | 精选 / T2 / 180 | `汇总,英文,国外` | `{"feedUrl":"https://seven-minute-feed.lovable.app/api/public/feed.xml"}` | 简报补漏 | 第三方汇总，核对原文链接与重复率 |
| 已添加·新配置待核验 | 国外·英文 | 社区 | Hacker News AI<br>`rss-hackernews` | RSS | 精选 / T2 / 240（旧设置，待核） | `社区,开发者,国外,英文` | `{"feedUrl":"https://hnrss.org/newest?q=AI"}` | 按 AI 关键词筛选 Hacker News 讨论 | 使用者 2026-10-11 确认已在后台改为此地址；等级、间隔及新地址抓取结果待核验。关键词可能匹配非人工智能语境 |
| 已添加 | 国外·英文 | 社区 | LessWrong · All Posts<br>`rss-lesswrong` | RSS | 精选 / T2 / 360 | `社区,安全,英文,国外` | `{"feedUrl":"https://www.lesswrong.com/feed.xml"}` | AI 安全观点 | 观点性强；可改为氛围 |
| 已添加 | 国外·英文 | 社区 | R/ArtificialInteligence<br>`rss-reddit-artificialinteligence` | RSS | 氛围 / T2 / 240 | `社区,英文,国外` | `{"feedUrl":"https://www.reddit.com/r/ArtificialInteligence.rss"}` | 社区话题线索 | 社区帖噪声较高，观察有效内容占比 |
| 已添加 | 国外·英文 | 媒体/社区 | HackerNoon · AI<br>`rss-hackernoon-ai` | RSS | 精选 / T2 / 180 | `媒体,社区,AI,英文,国外` | `{"feedUrl":"https://hackernoon.com/tagged/ai/feed"}` | 开发者与创业者视角；使用 AI 标签流 | 2026-10-04 首抓成功，发现 50 条、新增 30 条；留意投稿软文 |
| 已添加 | 国外·英文 | 官方一手 | Cloudflare Blog · AI<br>`rss-cloudflare-ai` | RSS | 精选 / T1 / 180 | `官方,AI,英文,国外` | `{"feedUrl":"https://blog.cloudflare.com/tag/artificial-intelligence/rss"}` | AI 基础设施与安全产品原始动态 | 2026-10-04 首抓成功，发现 2 条、新增 1 条 |
| 已添加 | 国外·英文 | 个人博客 | Ed Zitron · Where's Your Ed At<br>`rss-ed-zitron` | RSS | 氛围 / T2 / 360 | `个人,评论,英文,国外` | `{"feedUrl":"https://www.wheresyoured.at/rss/"}` | AI 产业批评与商业观点 | 2026-10-04 首抓成功，发现 15 条、新增 9 条；评论性强，勿将观点当作新闻 |
| 已添加 | 国内·中文 | 官方一手 | 美团技术团队<br>`rss-meituan-tech` | RSS | 精选 / T1 / 360 | `官方,研究,中文,国内` | `{"feedUrl":"https://tech.meituan.com/rss.xml"}` | LongCat、AI 论文与工程实践的一手信息 | 2026-10-04 首抓成功，新增 10 条；RSS 预览无发布时间，留意旧文被误判为近期内容 |
| 已添加 | 国内·中文 | 媒体 | 量子位<br>`rss-qbitai` | RSS | 精选 / T2 / 120 | `媒体,中文,国内,AI` | `{"feedUrl":"https://www.qbitai.com/feed"}` | 中文 AI 垂直报道 | 2026-10-05 预览及首抓成功，发现 10 条、新增 10 条；媒体应按 T2 分级，核对与官方报道的重复 |
| 已添加 | 国内·中文 | 媒体/热榜 | MIT 科技评论中国 · 本周热榜<br>`rss-mittrchina-hot` | RSS | 氛围 / T2 / 120 | `媒体,中文,国内,科技` | `{"feedUrl":"https://plink.anyfeeder.com/mittrchina/hot"}` | 中文科技热点补充；涵盖 AI 与非 AI 话题 | 2026-10-11 后台预览 10 条，原文链接指向 mittrchina.com；首抓成功，发现 10 条、新增 10 条。第三方 RSSHub 镜像及热榜排序可能变化，观察发布时间和重复；全文权限关闭 |
| 已添加 | 国外·英文 | 官方一手 | OpenClaw Releases<br>`rss-openclaw-releases` | RSS | 精选 / T1 / 360 | `官方,产品,开发者,AI,英文,国外` | `{"feedUrl":"https://github.com/openclaw/openclaw/releases.atom","ingestNoiseFilter":{"dropMarkersTitleOnly":["release-publish/","-alpha","-beta","-rc"]}}` | OpenClaw 官方版本发布，补充社区讨论流 | 2026-10-11 首抓成功，发现 10 条、新增 10 条；首次采集后才增加标题过滤，已入库的预发布及 release-publish 条目仍在库中，后续采集会过滤 |
| 已添加 | 国外·英文 | 官方一手 | OpenAI Codex Releases<br>`rss-codex-releases` | RSS | 精选 / T1 / 360 | `官方,产品,开发者,AI,英文,国外` | `{"feedUrl":"https://github.com/openai/codex/releases.atom","ingestNoiseFilter":{"dropMarkersTitleOnly":["-alpha","-beta","-rc"]}}` | Codex 官方版本发布 | 2026-10-11 首抓成功，发现 10 条、新增 2 条正式版本；其余多为 alpha，已按标题过滤 |
| 已添加 | 国外·英文 | 官方一手 | Claude Code Releases<br>`rss-claude-code-releases` | RSS | 精选 / T1 / 360 | `官方,产品,开发者,AI,英文,国外` | `{"feedUrl":"https://github.com/anthropics/claude-code/releases.atom"}` | Claude Code 官方版本发布 | 2026-10-11 首抓成功，发现 10 条、新增 10 条；版本更新频繁，观察小修复进入精选的比例 |
| 已添加 | 国外·英文 | 官方一手 | Gemini CLI Releases<br>`rss-gemini-cli-releases` | RSS | 精选 / T1 / 360 | `官方,产品,开发者,AI,英文,国外` | `{"feedUrl":"https://github.com/google-gemini/gemini-cli/releases.atom","ingestNoiseFilter":{"dropMarkersTitleOnly":["-nightly","-preview","-alpha","-beta","-rc"]}}` | Gemini CLI 官方版本发布 | 2026-10-11 首抓成功，发现 10 条、新增 1 条正式版本；其余主要为 nightly 和 preview，已按标题过滤 |

### 使用者确认已添加，待核对后台详情

以下五项由使用者在 2026-10-11 确认已添加；尚未逐项核对后台设置和抓取记录，因此不并入上方「已添加」表。Hacker News AI 已在上方按原 ID 更新，避免重复登记。

| 状态 | 名称 | 类型 | 订阅地址 | 待核对 |
|---|---|---|---|---|
| 已添加·待核验 | WIRED · AI | RSS | `https://www.wired.com/feed/tag/ai/latest/rss` | 后台配置、首次成功抓取及与现有媒体的重复率 |
| 已添加·待核验 | Ahead of AI | RSS | `https://magazine.sebastianraschka.com/feed` | 后台配置、首次成功抓取及文章形态 |
| 已添加·待核验 | arXiv · NLP（cs.CL）<br>`rss-arxiv-cl` | RSS | `http://rss.arxiv.org/rss/cs.CL` | 后台配置、首次成功抓取；与 cs.AI、cs.LG 的重复率。核对 HTTP 是否跳转至 HTTPS |
| 已添加·待核验 | Hacker News LLM<br>`rss-hackernews-llm` | RSS | `https://hnrss.org/newest?q=LLM` | 后台配置、首次成功抓取；标签由使用者指定为 `社区,开发者,国外,英文`，观察与 AI 关键词流的重复 |
| 已添加·待核验 | Hacker News OpenClaw<br>`rss-hackernews-openclaw` | RSS | `https://hnrss.org/newest?q=OpenClaw` | 后台配置、首次成功抓取；标签由使用者指定为 `社区,开发者,国外,英文`，观察与其他 HN 流的重复 |

### 使用者确认已开启，待核对后台详情

以下三个 X 信源由使用者确认已在后台手动开启。建议设置沿用原候选记录；实际标签、间隔及首次抓取结果尚待核对。

| 状态 | 地区·语言 | 类型 | 信源 | 渠道 | 建议配置 | 标签 | 查询条件 | 用途 | 备注 |
|---|---|---|---|---|---|---|---|---|---|
| 已开启·待核验 | 国外·英文 | 官方一手 | @OpenAI<br>`x-openai` | X | 精选 / T1 / 180 | `X,英文,国外` | `{"query":"from:OpenAI -filter:replies -filter:retweets","searchType":"Latest"}` | 官方公告 | 与官网查重 |
| 已开启·待核验 | 国外·英文 | 官方一手 | @AnthropicAI<br>`x-anthropicai` | X | 精选 / T1 / 180 | `X,英文,国外` | `{"query":"from:AnthropicAI -filter:replies -filter:retweets","searchType":"Latest"}` | 官方公告 | 核对账号 |
| 已开启·待核验 | 国外·英文 | 官方一手 | @xai<br>`x-xai` | X | 精选 / T1 / 180 | `X,英文,国外` | `{"query":"from:xai -filter:replies -filter:retweets","searchType":"Latest"}` | 产品动态 | 核对主体 |

## 候选／未添加

尚未确认在后台添加的信源；保留「待添加」「待核验」「非 RSS」「X 候选」等状态，便于逐项处理。

### 公众号

后续由使用者提供的账号放在这里。公众号类型为 `mp_account`，采集配置使用原始 ID `ghid` 和名称 `nickname`；该类型目前不支持预览抓取，创建后检查首次采集记录。后台信源 ID 仅接受小写字母、数字和连字符，采用 `gzh-名称`。

| 状态 | 地区·语言 | 分类 | 名称 / ID | 类型 | 参与 / 等级 / 分钟 | 标签 | 采集配置（JSON） | 为什么收录 | 风险及建议 |
|---|---|---|---|---|---|---|---|---|---|

### 其他候选

| 状态 | 地区·语言 | 分类 | 名称 / ID | 类型 | 参与 / 等级 / 分钟 | 标签 | 采集配置（JSON） | 为什么收录 | 风险及建议 |
|---|---|---|---|---|---|---|---|---|---|
| 待核验 | 国外·英文 | 论文研究 | MDPI · AI<br>`rss-mdpi-ai` | RSS | 精选 / T2 / 360 | `研究,论文,英文,国外` | `{"feedUrl":"https://www.mdpi.com/rss/journal/ai"}` | 期刊论文补充 | 本次遇 429；后台试抓 |
| 待核验 | 国内·中文 | 媒体 | InfoQ 中国<br>`rss-infoq-cn` | RSS | 精选 / T2 / 180 | `媒体,中文,国内,工程` | `{"feedUrl":"https://www.infoq.cn/feed"}` | AI 工程实践 | 旧 feed 内容停在 2019 年 |
| 非 RSS | 国内·中文 | 媒体/周刊 | AIBase 日报<br>`web-aibase-daily` | 网页列表 | 精选 / T2 / 360 | `媒体,中文,国内,汇总` | — | 中文 AI 日报 | 给的是 HTML 页；需另配选择器 |
| 非 RSS | 国外·英文 | 商业机构 | a16z · Enterprise x AI<br>`web-a16z-ai` | 网页列表 | 精选 / T2 / 360 | `机构,商业,英文,国外` | — | VC 商业视角 | 分类页非 RSS；需另配选择器 |
| 待核验 | 国外·英文 | 媒体 | VentureBeat · AI<br>`rss-venturebeat-ai` | RSS | 精选 / T2 / 120 | `媒体,AI,英文,国外` | `{"feedUrl":"https://venturebeat.com/category/ai/feed/"}` | 企业 AI 报道 | 2026-10-04 后台预览两次返回 HTTP 429，尚未创建；待对方解除限流后重试 |
| 待核验 | 国内·中文 | 媒体 | 极客公园<br>`rss-geekpark` | RSS | 精选 / T2 / 120 | `媒体,中文,国内` | `{"feedUrl":"https://www.geekpark.net/rss"}` | 国内科技创业与 AI 产品报道 | 全站流；先试抓并观察非 AI 占比 |
| X 候选 | 国外·英文 | 官方一手 | @GoogleDeepMind<br>`x-googledeepmind` | X | 精选 / T1 / 180 | `X,英文,国外` | `{"query":"from:GoogleDeepMind -filter:replies -filter:retweets","searchType":"Latest"}` | 研究动态 | 与博客查重 |
| X 候选 | 国外·英文 | 官方一手 | @MetaAI<br>`x-metaai` | X | 精选 / T1 / 180 | `X,英文,国外` | `{"query":"from:MetaAI -filter:replies -filter:retweets","searchType":"Latest"}` | 模型动态 | 核对主体 |
| X 候选 | 国外·英文 | 官方一手 | @MistralAI<br>`x-mistralai` | X | 精选 / T1 / 180 | `X,英文,国外` | `{"query":"from:MistralAI -filter:replies -filter:retweets","searchType":"Latest"}` | 官方发布 | 与博客查重 |
| X 候选 | 国外·英文 | 官方一手 | @huggingface<br>`x-huggingface` | X | 精选 / T1 / 180 | `X,英文,国外` | `{"query":"from:huggingface -filter:replies -filter:retweets","searchType":"Latest"}` | 平台更新 | 与博客查重 |
| X 候选 | 国外·英文 | 官方一手 | @OpenAIDevs<br>`x-openaidevs` | X | 精选 / T1 / 180 | `X,英文,国外` | `{"query":"from:OpenAIDevs -filter:replies -filter:retweets","searchType":"Latest"}` | 开发者公告 | 核对活跃 |
| X 候选 | 国外·英文 | 官方一手 | @GoogleAI<br>`x-googleai` | X | 精选 / T1 / 180 | `X,英文,国外` | `{"query":"from:GoogleAI -filter:replies -filter:retweets","searchType":"Latest"}` | 跨产品动态 | 与 Google Blog 查重 |
| X 候选 | 国外·英文 | 人物 | @sama<br>`x-sama` | X | 精选 / T1.5 / 120 | `X,英文,国外` | `{"query":"from:sama -filter:replies -filter:retweets","searchType":"Latest"}` | 高管直接发声 | 观点不等于正式公告 |
| X 候选 | 国外·英文 | 人物 | @gdb<br>`x-gdb` | X | 精选 / T1.5 / 120 | `X,英文,国外` | `{"query":"from:gdb -filter:replies -filter:retweets","searchType":"Latest"}` | 高管直接发声 | 核对身份 |
| X 候选 | 国外·英文 | 人物 | @amodei<br>`x-amodei` | X | 精选 / T1.5 / 120 | `X,英文,国外` | `{"query":"from:amodei -filter:replies -filter:retweets","searchType":"Latest"}` | 原文档候选 | 核对身份与活跃 |
| X 候选 | 国外·英文 | 人物 | @demishassabis<br>`x-demishassabis` | X | 精选 / T1.5 / 120 | `X,英文,国外` | `{"query":"from:demishassabis -filter:replies -filter:retweets","searchType":"Latest"}` | 研究领导者观点 | 与博客查重 |
| X 候选 | 国外·英文 | 人物 | @ylecun<br>`x-ylecun` | X | 精选 / T1.5 / 120 | `X,英文,国外` | `{"query":"from:ylecun -filter:replies -filter:retweets","searchType":"Latest"}` | 研究观点 | 讨论内容多 |
| X 候选 | 国外·英文 | 人物 | @ilyasut<br>`x-ilyasut` | X | 精选 / T1.5 / 120 | `X,英文,国外` | `{"query":"from:ilyasut -filter:replies -filter:retweets","searchType":"Latest"}` | 原文档候选 | 核对账号真实性 |
| X 候选 | 国外·英文 | 人物 | @karpathy<br>`x-karpathy` | X | 精选 / T1.5 / 120 | `X,英文,国外` | `{"query":"from:karpathy -filter:replies -filter:retweets","searchType":"Latest"}` | 独立技术观点 | 原文建议 T1.5；准官方身份需复核 |
| X 候选 | 国外·英文 | 研究者 | @hardmaru<br>`x-hardmaru` | X | 精选 / T2 / 180 | `X,英文,国外` | `{"query":"from:hardmaru -filter:replies -filter:retweets","searchType":"Latest"}` | 研究者视角 | 核对活跃 |
| X 候选 | 国外·英文 | 研究者 | @fchollet<br>`x-fchollet` | X | 精选 / T2 / 180 | `X,英文,国外` | `{"query":"from:fchollet -filter:replies -filter:retweets","searchType":"Latest"}` | 研究观点 | 避免当成公司公告 |
| X 候选 | 国外·英文 | 研究者 | @drfeifei<br>`x-drfeifei` | X | 精选 / T2 / 180 | `X,英文,国外` | `{"query":"from:drfeifei -filter:replies -filter:retweets","searchType":"Latest"}` | 研究动态 | 核对身份 |
| X 候选 | 国外·英文 | 研究者/社区 | @_akhaliq<br>`x-akhaliq` | X | 精选 / T2 / 180 | `X,英文,国外` | `{"query":"from:_akhaliq -filter:replies","searchType":"Latest"}` | 论文转发线索 | 保留转推；可改为氛围 |
| X 候选 | 国外·英文 | 研究者/社区 | @random_walker<br>`x-random-walker` | X | 氛围 / T2 / 180 | `X,英文,国外` | `{"query":"from:random_walker -filter:replies -filter:retweets","searchType":"Latest"}` | AI 评论 | 观点性强 |
| X 候选 | 国外·英文 | 媒体 | @heidilifeldman<br>`x-heidilifeldman` | X | 氛围 / T2 / 240 | `X,英文,国外` | `{"query":"from:heidilifeldman -filter:replies -filter:retweets","searchType":"Latest"}` | 原文档记者候选 | 身份待核 |
| X 候选 | 国外·英文 | 媒体 | @tsarnick<br>`x-tsarnick` | X | 氛围 / T2 / 240 | `X,英文,国外` | `{"query":"from:tsarnick -filter:replies -filter:retweets","searchType":"Latest"}` | 原文档记者候选 | 内容占比待核 |
| X 候选 | 国外·英文 | 媒体 | @aiexplainedyt<br>`x-aiexplainedyt` | X | 氛围 / T2 / 240 | `X,英文,国外` | `{"query":"from:aiexplainedyt -filter:replies -filter:retweets","searchType":"Latest"}` | 视频解读 | 与新闻时间可能不同 |
| X 候选 | 中文圈·中文 | 社区/媒体 | @dotey<br>`x-dotey` | X | 氛围 / T2 / 180 | `X,中文` | `{"query":"from:dotey -filter:replies","searchType":"Latest"}` | 中文 AI 汇总 | 保留转推 |
| X 候选 | 中文圈·中文 | 社区/媒体 | @bleedline<br>`x-bleedline` | X | 氛围 / T2 / 180 | `X,中文` | `{"query":"from:bleedline -filter:replies","searchType":"Latest"}` | 前沿资讯 | 核对原文链接 |
| X 候选 | 中文圈·中文 | 社区/媒体 | @tuturetom<br>`x-tuturetom` | X | 氛围 / T2 / 240 | `X,中文` | `{"query":"from:tuturetom -filter:replies","searchType":"Latest"}` | 产品评测 | 与新闻分开判断 |

### 本批筛选说明（2026-10-04）

本批来自 [Feeder 的 RSS 发现目录](https://feeder.co/discover/)（当时的 AI 分类页），其中 6 个入口列入上表，**都未在后台预览**，因此保持「待核验」。网页工具能识别部分地址返回 RSS/Atom/XML 类型，但不能读取条目；不能据此认定更新频率、原文链接和日期合格。HackerNoon 和 Cloudflare 改用了官方提供的 AI 标签 RSS，分别见 [HackerNoon RSS 说明](https://help.hackernoon.com/rss-distribution)与 [Cloudflare AI 标签页](https://blog.cloudflare.com/tag/artificial-intelligence/)。

- **已有更聚焦的流，暂不另加全站流：**Ars Technica、MIT Technology Review、GitHub Blog、OpenAI Blog、Google DeepMind；现有表中分别已有 AI 专题或新版官方入口。Google 官方博客的旧 Blogspot Atom 也不替代已添加的 Google Blog（AI）。
- **覆盖过宽，暂不入候选表：**Engadget、Digital Trends、The Next Web、AWS Recent Announcements、.NET Blog、BBC News · Technology、Microsoft Azure Blog、GeekWire、Google Cloud Blog、9to5Google、AWS Blog、ZDNet、DEV、GitLab、Visual Studio Code、The Register。它们可以作为以后补漏的线索，但全站采集会引入大量非 AI 内容；AWS Machine Learning Blog 已在仓库预置表。
- **内容方向或地址待进一步确认，暂不入候选表：**Schneier on Security（本批两个 Atom 地址属于同一站，主要是安全评论）、Towards Data Science（本次网页核验受访问限制）。

## 地址备注

- **使用者报告不可用（2026-10-11）：**`https://hex2077.dev/rss-zh-CN.xml`。暂不作为待添加 RSS；恢复可用后再预览。
- **使用者报告不可用（2026-10-11）：**`https://lastweekin.ai/feed`。暂不作为待添加 RSS；恢复可用后再预览。网页读取工具无法解析这些 XML，未独立确认故障原因。

- 原文档 LessWrong 的 `https://www.lesswrong.com/allPosts` 是网页；表内使用其[官方说明](https://www.lesswrong.com/posts/dzF8vSdDtmWjCBBDr/secrets-of-the-lesswrong-rss-feed)中的 `feed.xml`。原文档 HN RSS 关键词服务 `https://hnrss.org/` 保留为替代方案。
- a16z [AI 分类页](https://a16z.com/category/enterprise/enterprise-x-ai/)和 [AIBase 日报](https://news.aibase.com/zh/daily)是网页，不提供可直接粘贴的 RSS 配置。机器之心旧 `/rss` 跳转网页，已改用上方公众号候选，不再保留未配置的网页列表候选。
- arXiv cs.AI、cs.LG 分列。MDPI 本次遇 429；InfoQ 旧 feed 条目停在 2019 年。标「待核验」的地址先在后台预览，确认新条目、日期、原文链接，再改为「待添加」。
- 国内官方公司中，DeepSeek 的公众号已添加，见「已添加」表；千问、Kimi、智谱、豆包、文心在原文档中仍只有名称、没有可用 RSS 地址，待找到真实官网、GitHub 或公众号入口再新增表格行。参见 [信源类型与配置](sources.md)。

**维护顺序：**后台查重 → 可预览的类型先预览 → 创建 → 检查首次采集结果 → 将该行移到「已添加」表并更新状态。每次加源只增加或修改**一行**。

## RSS 候选发现入口

- [Feeder · RSS 发现目录](https://feeder.co/discover/)
- [AI 工具集 · 每日 AI 资讯](https://ai-bot.cn/daily-ai-news/)
- [Awesome RSSHub Routes · 中文推荐清单](https://github.com/JackyST0/awesome-rsshub-routes/blob/main/readme-zh.md)

这些页面用于寻找候选；找到具体订阅地址后，仍需在后台预览抓取，再加入上表。

## 付费采集 API 备忘

- [SocialData 官网](https://socialdata.tools/)：X 内容采集 API；使用前核对费用、额度和接口条款。
- [极致了官网](https://www.dajiala.com/)：微信公众号内容采集 API；使用前核对费用、额度和接口条款。
