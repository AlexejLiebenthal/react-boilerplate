// lint-staged.config.js
import micromatch from "micromatch";

/** @type {import('lint-staged').Config} */
export default {
  "*.{ts,tsx}": (files) => {
    // from `files` filter those _NOT_ matching `*test.js`
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const match = micromatch.not(files, ["**/*.gen.ts", "**/*.d.ts"]);
    return `bun lint:fix ${match.join(" ")}`;
  },
};
