import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import SearchResults from "../components/SearchResults";

const tracks = [{ id: "1", name: "Hello", artist: "Adele", album: "25" }];

test("SearchResults displays the heading and returned tracks", () => {
  render(<SearchResults searchResults={tracks} onAdd={vi.fn()} />);
  expect(
    screen.getByRole("heading", { name: /search results/i }),
  ).toBeInTheDocument();
  expect(screen.getByText("Hello")).toBeInTheDocument();
});
