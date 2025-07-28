import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PaginationComponent } from "../pagination-component";

describe("PaginationComponent", () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render pagination with correct page numbers", () => {
    render(
      <PaginationComponent
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should highlight current page as active", () => {
    render(
      <PaginationComponent
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const activePage = screen.getByText("3").closest('[data-active="true"]');
    expect(activePage).toBeInTheDocument();
  });

  it("should call onPageChange when page number is clicked", async () => {
    const user = userEvent.setup();

    render(
      <PaginationComponent
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const pageButton = screen.getByText("3");
    await user.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });
});
