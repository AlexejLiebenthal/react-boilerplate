import { useCallback, useEffect } from "react";

import { useAtomValue } from "jotai";

import { themeAtom } from "@/atoms/theme-atom";

export const useTheme = () => {
  const theme = useAtomValue(themeAtom);

  const handleThemeChange = useCallback(
    (media?: MediaQueryListEvent | MediaQueryList) => {
      const { classList } = document.documentElement;
      classList.remove("light", "dark");
      classList.add(media ? (media.matches ? "dark" : "light") : theme);
    },
    [theme],
  );

  useEffect(() => {
    if (theme === "system") {
      const media = globalThis.matchMedia("(prefers-color-scheme: dark)");
      handleThemeChange(media);
      media.addEventListener("change", handleThemeChange);
      return () => {
        media.removeEventListener("change", handleThemeChange);
      };
    }

    handleThemeChange();
    return () => {
      // noop
    };
  }, [handleThemeChange, theme]);
};
