import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import * as Matchers from "jest-extended";

expect.extend(Matchers);

afterEach(() => {
  cleanup();
});
