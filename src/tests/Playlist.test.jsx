import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Playlist from "../components/Playlist";

const tracks = [{ id: "1", name: "Hello", artist: "Adele", album: "25" }];

describe("Playlist", () => {
  test("displays playlist name and tracks", () => {
    render(
      <Playlist
        playlistName="My Mix"
        playlistTracks={tracks}
        onRemove={vi.fn()}
        onNameChange={vi.fn()}
        onSave={vi.fn()}
        user={{ id: "u1", name: "afag" }}
      />,
    );
    expect(screen.getByDisplayValue("My Mix")).toBeInTheDocument();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  test("calls onNameChange when playlist name changes", async () => {
    const user = userEvent.setup();
    const onNameChange = vi.fn();
    render(
      <Playlist
        playlistName=""
        playlistTracks={tracks}
        onRemove={vi.fn()}
        onNameChange={onNameChange}
        onSave={vi.fn()}
        user={{ id: "u1", name: "afag" }}
      />,
    );
    await user.type(screen.getByRole("textbox"), "Road Trip");
    expect(onNameChange).toHaveBeenCalled();
  });

  test("shows SAVE TO AUDIUS only when signed in and playlist has tracks", () => {
    const { rerender } = render(
      <Playlist
        playlistName="My Mix"
        playlistTracks={tracks}
        onRemove={vi.fn()}
        onNameChange={vi.fn()}
        onSave={vi.fn()}
        user={null}
      />,
    );
    expect(
      screen.queryByRole("button", { name: /save to audius/i }),
    ).not.toBeInTheDocument();
    rerender(
      <Playlist
        playlistName="My Mix"
        playlistTracks={tracks}
        onRemove={vi.fn()}
        onNameChange={vi.fn()}
        onSave={vi.fn()}
        user={{ id: "u1", name: "afag" }}
      />,
    );
    expect(
      screen.getByRole("button", { name: /save to audius/i }),
    ).toBeInTheDocument();
  });

  test("calls onSave when save button is clicked", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(
      <Playlist
        playlistName="My Mix"
        playlistTracks={tracks}
        onRemove={vi.fn()}
        onNameChange={vi.fn()}
        onSave={onSave}
        user={{ id: "u1", name: "afag" }}
      />,
    );
    await user.click(screen.getByRole("button", { name: /save to audius/i }));
    expect(onSave).toHaveBeenCalledTimes(1);
  });
});
