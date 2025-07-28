import "@testing-library/jest-dom";
import { beforeEach, vi } from "vitest";
import React from "react";

vi.mock("react-router-dom", () => ({
  Link: ({ children, to, ...props }: any) =>
    React.createElement("a", { href: to, ...props }, children),
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: "/" }),
  BrowserRouter: ({ children }: any) =>
    React.createElement("div", {}, children),
}));

global.fetch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});
