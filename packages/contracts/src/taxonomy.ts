// Public vocabularies shared by the website, the API and the worker. The categories themselves belong to
// the industry pack (industry/taxonomy.ts); their keys are external identities (URLs, API, RSS) and never change.
import { CATEGORIES } from "@aihot/industry/taxonomy";

type Category = (typeof CATEGORIES)[number];

export type CategoryKey = Category["key"];
export const CATEGORY_KEYS = CATEGORIES.map((c) => c.key) as unknown as readonly [CategoryKey, ...CategoryKey[]];

/** Website tab labels. */
export const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.label])) as Record<CategoryKey, string>;

/** The categories the public API, RSS and MCP know: a category with `publicAs` is published as that one. */
export type PublicApiCategoryKey = Exclude<Category, { publicAs: string }>["key"];
export const PUBLIC_API_CATEGORY_KEYS = CATEGORIES.filter((c) => !("publicAs" in c)).map((c) => c.key) as unknown as readonly [PublicApiCategoryKey, ...PublicApiCategoryKey[]];

export function toPublicApiCategory(category: string | null): PublicApiCategoryKey | null {
  const c = CATEGORIES.find((x) => x.key === category);
  if (!c) return null;
  return ("publicAs" in c ? c.publicAs : c.key) as PublicApiCategoryKey;
}

export function isCategoryKey(value: unknown): value is CategoryKey {
  return typeof value === "string" && (CATEGORY_KEYS as readonly string[]).includes(value);
}

export const CHANNEL_KEYS = ["all", "news", "x", "firstParty"] as const;
export type ChannelKey = (typeof CHANNEL_KEYS)[number];

export const CHANNEL_LABELS: Record<ChannelKey, string> = {
  all: "全部",
  news: "资讯",
  x: "X",
  firstParty: "一手",
};

export function isChannelKey(value: unknown): value is ChannelKey {
  return typeof value === "string" && (CHANNEL_KEYS as readonly string[]).includes(value);
}

export const LEADERBOARD_PUBLIC_BOARDS = ["overall", "coding", "reasoning", "knowledge", "professional"] as const;
export type LeaderboardBoardKey = (typeof LEADERBOARD_PUBLIC_BOARDS)[number];

export const LEADERBOARD_BOARD_LABELS: Record<LeaderboardBoardKey, string> = {
  overall: "综合",
  coding: "编程",
  reasoning: "推理",
  knowledge: "知识",
  professional: "专业办公",
};

/** Article ids. Also the local-data import validation pattern. */
export const ARTICLE_ID_PATTERN = /^[a-zA-Z0-9_-]{1,80}$/;
