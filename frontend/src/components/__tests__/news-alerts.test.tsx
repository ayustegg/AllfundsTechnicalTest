import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { NewsAlerts } from "../news-alerts";

vi.useFakeTimers();

describe("NewsAlerts", () => {
  const mockSetShowAlert = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should render alert when showAlert is true", () => {
    render(
      <NewsAlerts
        message="Test alert message"
        showAlert={true}
        setShowAlert={mockSetShowAlert}
      />
    );

    expect(screen.getByText("Test alert message")).toBeInTheDocument();
  });

  it("should not render alert when showAlert is false", () => {
    render(
      <NewsAlerts
        message="Test alert message"
        showAlert={false}
        setShowAlert={mockSetShowAlert}
      />
    );

    const alert = screen.getByText("Test alert message");
    expect(alert).toBeInTheDocument();
    expect(alert.closest(".opacity-0")).toBeInTheDocument();
  });
});
