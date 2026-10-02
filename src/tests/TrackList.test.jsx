import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import TrackList from "../components/TrackList";

const tracks = [
  { id: "1", name: "Hello", artist: "Adele", album: "25" },
  { id: "2", name: "Yellow", artist: "Coldplay", album: "Parachutes" },
];

test("TrackList renders all tracks", () => {
  render(
    <TrackList
      tracks={tracks}
      isRemoval={false}
      onAdd={vi.fn()}
      onRemove={vi.fn()}
    />,
  );
  expect(screen.getByText("Hello")).toBeInTheDocument();
  expect(screen.getByText("Yellow")).toBeInTheDocument();
});
