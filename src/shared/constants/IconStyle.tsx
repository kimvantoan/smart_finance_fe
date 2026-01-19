import type { ICON_KEYS } from "./IconKey";

export type IconKey = typeof ICON_KEYS[number];

export const ICON_STYLE: Record<
  IconKey,
  { color: string; bg: string }
> = {
  // 💰 Finance
  wallet: { color: "text-orange-600", bg: "bg-orange-100" },
  "credit-card": { color: "text-emerald-600", bg: "bg-emerald-100" },
  landmark: { color: "text-blue-600", bg: "bg-blue-100" },
  banknote: { color: "text-green-600", bg: "bg-green-100" },
  coins: { color: "text-yellow-600", bg: "bg-yellow-100" },

  receipt: { color: "text-indigo-600", bg: "bg-indigo-100" },
  "receipt-text": { color: "text-purple-600", bg: "bg-purple-100" },

  // 🛒 Shopping
  "shopping-cart": { color: "text-pink-600", bg: "bg-pink-100" },
  "shopping-bag": { color: "text-rose-600", bg: "bg-rose-100" },
  store: { color: "text-fuchsia-600", bg: "bg-fuchsia-100" },

  // 🍔 Food
  utensils: { color: "text-red-600", bg: "bg-red-100" },
  coffee: { color: "text-amber-700", bg: "bg-amber-100" },
  pizza: { color: "text-orange-700", bg: "bg-orange-100" },

  // 🚗 Transport
  car: { color: "text-sky-600", bg: "bg-sky-100" },
  bus: { color: "text-cyan-600", bg: "bg-cyan-100" },
  bike: { color: "text-lime-700", bg: "bg-lime-100" },
  fuel: { color: "text-teal-600", bg: "bg-teal-100" },

  // 🎓 Study / Work
  "graduation-cap": { color: "text-violet-600", bg: "bg-violet-100" },
  book: { color: "text-blue-700", bg: "bg-blue-100" },
  laptop: { color: "text-slate-700", bg: "bg-slate-200" },

  // 🎮 Entertainment
  film: { color: "text-rose-700", bg: "bg-rose-100" },
  music: { color: "text-pink-700", bg: "bg-pink-100" },
  "gamepad-2": { color: "text-indigo-700", bg: "bg-indigo-100" },
  ticket: { color: "text-yellow-700", bg: "bg-yellow-100" },

  // 💪 Lifestyle
  dumbbell: { color: "text-gray-800", bg: "bg-gray-200" },
  shirt: { color: "text-sky-700", bg: "bg-sky-100" },
  watch: { color: "text-neutral-800", bg: "bg-neutral-200" },
  scissors: { color: "text-red-700", bg: "bg-red-100" },
};
