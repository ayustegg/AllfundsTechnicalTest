import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewsCard } from "../news-card";
import type { NewsItem } from "@/types/news";

describe("NewsCard", () => {
  const mockNewsItem: NewsItem = {
    _id: "1",
    title: "Test title",
    description: "Test description",
    content: "This is the content test",
    date: "2025-07-30",
    author: "Test author",
    archiveDate: "2025-07-30",
  };

  const mockNewsItemWithoutArchive: NewsItem = {
    _id: "2",
    title: "Test title",
    description: "Test description",
    content: "This is the content test",
    date: "2025-07-30",
    author: "Test author",
    archiveDate: "",
  };

  const mockOnAction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render news card with all information", () => {
    render(
      <NewsCard
        item={mockNewsItem}
        actionType="archive"
        onAction={mockOnAction}
        actionLabel="Archive"
      />
    );

    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("This is the content test")).toBeInTheDocument();
    expect(screen.getByText("Author: Test author")).toBeInTheDocument();
    expect(screen.getByText("Date: 2025-07-30")).toBeInTheDocument();
    expect(screen.getByText("Archived: 2025-07-30")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /archive/i })
    ).toBeInTheDocument();
  });

  it("should not display archive date when item is not archived", () => {
    render(
      <NewsCard
        item={mockNewsItemWithoutArchive}
        actionType="archive"
        onAction={mockOnAction}
        actionLabel="Archive"
      />
    );

    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("This is the content test")).toBeInTheDocument();
    expect(screen.getByText("Author: Test author")).toBeInTheDocument();
    expect(screen.getByText("Date: 2025-07-30")).toBeInTheDocument();
    expect(screen.queryByText(/Archived:/)).not.toBeInTheDocument();
  });

  it("should call onAction when button is clicked", async () => {
    const mockOnActionResolved = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();

    render(
      <NewsCard
        item={mockNewsItem}
        actionType="archive"
        onAction={mockOnActionResolved}
        actionLabel="Archive"
      />
    );

    const button = screen.getByRole("button", { name: /archive/i });
    await user.click(button);

    expect(mockOnActionResolved).toHaveBeenCalledWith("1");
  });

  it("should apply correct actionVariant to button", () => {
    render(
      <NewsCard
        item={mockNewsItem}
        actionType="delete"
        onAction={mockOnAction}
        actionLabel="Delete"
        actionVariant="destructive"
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-destructive");
  });
});
