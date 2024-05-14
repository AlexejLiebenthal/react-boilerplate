import { atomWithStorage } from "jotai/utils";

export const themes = ["system", "light", "dark"] as const;
export type Theme = (typeof themes)[number];
export const themeAtom = atomWithStorage<Theme>("ui-theme", "system");
