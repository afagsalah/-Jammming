import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Track from "../components/Track";

const track = { id: "1", name: "Hello", artist: "Adele", album: "25" };

describe("Track", () => {
  test("displays track information", () => {
    render(
      <Track
        track={track}
        isRemoval={false}
        onAdd={vi.fn()}
        onRemove={vi.fn()}
      />,
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText(/Adele/)).toBeInTheDocument();
    expect(screen.getByText(/25/)).toBeInTheDocument();
  });

  test("adds a track when + is clicked", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(
      <Track
        track={track}
        isRemoval={false}
        onAdd={onAdd}
        onRemove={vi.fn()}
      />,
    );
    await user.click(screen.getByRole("button", { name: "+" }));
    expect(onAdd).toHaveBeenCalledWith(track);
  });

  test("removes a track when − is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <Track
        track={track}
        isRemoval={true}
        onAdd={vi.fn()}
        onRemove={onRemove}
      />,
    );
    await user.click(screen.getByRole("button", { name: "−" }));
    expect(onRemove).toHaveBeenCalledWith(track);
  });
});
