import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  test("displays the search input and button", () => {
    render(<SearchBar term="" setTerm={vi.fn()} onSearch={vi.fn()} />);
    expect(
      screen.getByPlaceholderText(/search for a song or artist/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("updates the search term when the user types", async () => {
    const user = userEvent.setup();
    const setTerm = vi.fn();
    render(<SearchBar term="" setTerm={setTerm} onSearch={vi.fn()} />);
    await user.type(screen.getByRole("textbox"), "Adele");
    expect(setTerm).toHaveBeenCalled();
  });

  test("calls onSearch with the current term", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchBar term="Adele" setTerm={vi.fn()} onSearch={onSearch} />);
    await user.click(screen.getByRole("button", { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith("Adele");
  });
});
