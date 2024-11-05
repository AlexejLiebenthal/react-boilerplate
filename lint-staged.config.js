// lint-staged.config.js
import micromatch from "micromatch";

/** @type {import('lint-staged').Config} */
export default {
  /**
   * @param {string[]} files
   */
  "*.{ts,tsx}": (files) => {
    const match = micromatch.not(files, ["**/*.gen.ts", "**/*.d.ts"]);
    return `pnpm lint:fix ${match.join(" ")}`;
  },
  "*": "pnpm format",
};
