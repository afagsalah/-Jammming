import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import {
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";


// --------------------------------------------------
// MOCK AUDIUS
// --------------------------------------------------

const { mockAudius } = vi.hoisted(() => ({
  mockAudius: {
    oauth: {
      isAuthenticated: vi.fn(),
      getUser: vi.fn(),
      login: vi.fn(),
      logout: vi.fn(),
    },

    tracks: {
      searchTracks: vi.fn(),
    },

    playlists: {
      createPlaylist: vi.fn(),
    },
  },
}));


// Prevent the real audius.js from running.
// Therefore window.audiusSdk() will NOT be called.

vi.mock("../api/audius", () => ({
  default: mockAudius,
}));


// Import App AFTER defining the Audius mock

import App from "../App";


// --------------------------------------------------
// SAMPLE TRACKS
// --------------------------------------------------

const mockTracks = [
  {
    id: "track-1",
    title: "Song One",

    user: {
      name: "Artist One",
    },

    albumName: "Album One",
  },

  {
    id: "track-2",
    title: "Song Two",

    user: {
      name: "Artist Two",
    },

    albumName: "Album Two",
  },
];


// --------------------------------------------------
// RESET MOCKS BEFORE EACH TEST
// --------------------------------------------------

beforeEach(() => {
  vi.clearAllMocks();

  // Start every test logged out
  mockAudius.oauth.isAuthenticated.mockResolvedValue(
    false
  );

  mockAudius.oauth.login.mockResolvedValue(
    undefined
  );

  mockAudius.oauth.logout.mockResolvedValue(
    undefined
  );

  mockAudius.oauth.getUser.mockResolvedValue({
    id: "user-1",
    name: "afag",
  });

  mockAudius.tracks.searchTracks.mockResolvedValue({
    data: mockTracks,
  });

  mockAudius.playlists.createPlaylist.mockResolvedValue(
    {}
  );
});


// --------------------------------------------------
// TESTS
// --------------------------------------------------

describe("Jammming App", () => {

  // ------------------------------------------------
  // TEST 1
  // APP RENDERS
  // ------------------------------------------------

  test("renders the Jammming application", () => {
    render(<App />);

    expect(
      screen.getByText("Build your perfect playlist")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(
        "Search for a song or artist..."
      )
    ).toBeInTheDocument();
  });


  // ------------------------------------------------
  // TEST 2
  // SEARCH
  // ------------------------------------------------

  test("searches Audius and displays results", async () => {
    const user = userEvent.setup();

    render(<App />);

    const searchInput =
      screen.getByPlaceholderText(
        "Search for a song or artist..."
      );

    await user.type(
      searchInput,
      "Song"
    );

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      })
    );


    // Check Audius search function
    await waitFor(() => {
      expect(
        mockAudius.tracks.searchTracks
      ).toHaveBeenCalledWith({
        query: "Song",
        limit: 10,
      });
    });


    // Check returned tracks
    expect(
      await screen.findByText("Song One")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Song Two")
    ).toBeInTheDocument();
  });


  // ------------------------------------------------
  // TEST 3
  // ADD TRACK
  // ------------------------------------------------

  test("adds a track to the playlist", async () => {
    const user = userEvent.setup();

    render(<App />);


    // Search first
    await user.type(
      screen.getByPlaceholderText(
        "Search for a song or artist..."
      ),
      "Song"
    );

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      })
    );


    await screen.findByText("Song One");


    // Search results contain + buttons
    const addButtons =
      screen.getAllByRole("button", {
        name: "+",
      });


    // Add first track
    await user.click(addButtons[0]);


    // Song One should now appear twice:
    // once in Search Results
    // once in Playlist

    await waitFor(() => {
      expect(
        screen.getAllByText("Song One")
      ).toHaveLength(2);
    });
  });


  // ------------------------------------------------
  // TEST 4
  // PREVENT DUPLICATE TRACK
  // ------------------------------------------------

  test("does not add the same track twice", async () => {
    const user = userEvent.setup();

    render(<App />);


    await user.type(
      screen.getByPlaceholderText(
        "Search for a song or artist..."
      ),
      "Song"
    );

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      })
    );


    await screen.findByText("Song One");


    const addButtons =
      screen.getAllByRole("button", {
        name: "+",
      });


    // Try adding the same track twice
    await user.click(addButtons[0]);

    await user.click(addButtons[0]);


    // Should still appear only twice:
    // Search Results + Playlist

    expect(
      screen.getAllByText("Song One")
    ).toHaveLength(2);
  });


  // ------------------------------------------------
  // TEST 5
  // REMOVE TRACK
  // ------------------------------------------------

  test("removes a track from the playlist", async () => {
    const user = userEvent.setup();

    render(<App />);


    // Search
    await user.type(
      screen.getByPlaceholderText(
        "Search for a song or artist..."
      ),
      "Song"
    );

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      })
    );


    await screen.findByText("Song One");


    // Add track
    const addButtons =
      screen.getAllByRole("button", {
        name: "+",
      });

    await user.click(addButtons[0]);


    expect(
      screen.getAllByText("Song One")
    ).toHaveLength(2);


    // Remove from playlist
    const removeButton =
      screen.getByRole("button", {
        name: "−",
      });

    await user.click(removeButton);


    // Only Search Results copy remains
    await waitFor(() => {
      expect(
        screen.getAllByText("Song One")
      ).toHaveLength(1);
    });
  });


  // ------------------------------------------------
  // TEST 6
  // CHANGE PLAYLIST NAME
  // ------------------------------------------------

  test("allows the playlist name to be changed", async () => {
    const user = userEvent.setup();

    render(<App />);


    const playlistInput =
      screen.getByDisplayValue(
        "My Playlist"
      );


    await user.clear(playlistInput);

    await user.type(
      playlistInput,
      "My Favourite Songs"
    );


    expect(playlistInput).toHaveValue(
      "My Favourite Songs"
    );
  });


  // ------------------------------------------------
  // TEST 7
  // LOGIN
  // ------------------------------------------------

  test("logs the user into Audius", async () => {
    const user = userEvent.setup();

    render(<App />);


    const signInButton =
      screen.getByRole("button", {
        name: /sign in/i,
      });


    await user.click(signInButton);


    // login() should be called
    await waitFor(() => {
      expect(
        mockAudius.oauth.login
      ).toHaveBeenCalledWith({
        scope: "write",
      });
    });


    // getUser() should be called
    await waitFor(() => {
      expect(
        mockAudius.oauth.getUser
      ).toHaveBeenCalled();
    });


    // Username should appear
    expect(
      await screen.findByText(/afag/i)
    ).toBeInTheDocument();


    // Logout button should appear
    expect(
      screen.getByRole("button", {
        name: /logout/i,
      })
    ).toBeInTheDocument();
  });


  // ------------------------------------------------
  // TEST 8
  // LOGOUT
  // ------------------------------------------------

  test("logs the user out of Audius", async () => {
    const user = userEvent.setup();

    render(<App />);


    // Login first
    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );


    const logoutButton =
      await screen.findByRole("button", {
        name: /logout/i,
      });


    // Logout
    await user.click(logoutButton);


    expect(
      mockAudius.oauth.logout
    ).toHaveBeenCalled();


    // Sign In should return
    expect(
      await screen.findByRole("button", {
        name: /sign in/i,
      })
    ).toBeInTheDocument();
  });


  // ------------------------------------------------
  // TEST 9
  // RESTORE EXISTING LOGIN
  // ------------------------------------------------

  test("restores an existing Audius login", async () => {

    mockAudius.oauth.isAuthenticated.mockResolvedValue(
      true
    );

    mockAudius.oauth.getUser.mockResolvedValue({
      id: "user-1",
      name: "afag",
    });


    render(<App />);


    expect(
      await screen.findByText(/afag/i)
    ).toBeInTheDocument();


    expect(
      screen.getByRole("button", {
        name: /logout/i,
      })
    ).toBeInTheDocument();
  });


  // ------------------------------------------------
  // TEST 10
  // SAVE PLAYLIST
  // ------------------------------------------------

  test("saves a playlist to Audius", async () => {
    const user = userEvent.setup();

    render(<App />);


    // --------------------------
    // Login
    // --------------------------

    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );


    await screen.findByRole(
      "button",
      {
        name: /logout/i,
      }
    );


    // --------------------------
    // Search
    // --------------------------

    await user.type(
      screen.getByPlaceholderText(
        "Search for a song or artist..."
      ),
      "Song"
    );

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      })
    );


    await screen.findByText("Song One");


    // --------------------------
    // Add track
    // --------------------------

    const addButtons =
      screen.getAllByRole("button", {
        name: "+",
      });

    await user.click(addButtons[0]);


    // --------------------------
    // Save
    // --------------------------

    const saveButton =
      await screen.findByRole("button", {
        name: /save to audius/i,
      });


    await user.click(saveButton);


    // Check API call
    await waitFor(() => {
      expect(
        mockAudius.playlists.createPlaylist
      ).toHaveBeenCalled();
    });
  });


  // ------------------------------------------------
  // TEST 11
  // SAVE CUSTOM PLAYLIST NAME
  // ------------------------------------------------

  test("saves the custom playlist name", async () => {
    const user = userEvent.setup();

    render(<App />);


    // Login
    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );

    await screen.findByRole(
      "button",
      {
        name: /logout/i,
      }
    );


    // Change playlist name
    const playlistInput =
      screen.getByDisplayValue(
        "My Playlist"
      );

    await user.clear(playlistInput);

    await user.type(
      playlistInput,
      "Road Trip Songs"
    );


    // Search
    await user.type(
      screen.getByPlaceholderText(
        "Search for a song or artist..."
      ),
      "Song"
    );

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      })
    );


    await screen.findByText("Song One");


    // Add
    const addButtons =
      screen.getAllByRole("button", {
        name: "+",
      });

    await user.click(addButtons[0]);


    // Save
    await user.click(
      await screen.findByRole(
        "button",
        {
          name: /save to audius/i,
        }
      )
    );


    // Check custom name sent to Audius
    await waitFor(() => {
      expect(
        mockAudius.playlists.createPlaylist
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: "user-1",

          metadata:
            expect.objectContaining({
              playlistName:
                "Road Trip Songs",
            }),
        })
      );
    });
  });


  // ------------------------------------------------
  // TEST 12
  // CLEAR APP AFTER SAVE
  // ------------------------------------------------

  test("clears the playlist after successful save", async () => {
    const user = userEvent.setup();

    render(<App />);


    // Login
    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );

    await screen.findByRole(
      "button",
      {
        name: /logout/i,
      }
    );


    // Search
    const searchInput =
      screen.getByPlaceholderText(
        "Search for a song or artist..."
      );

    await user.type(
      searchInput,
      "Song"
    );

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      })
    );


    await screen.findByText("Song One");


    // Add
    const addButtons =
      screen.getAllByRole("button", {
        name: "+",
      });

    await user.click(addButtons[0]);


    // Save
    await user.click(
      await screen.findByRole(
        "button",
        {
          name: /save to audius/i,
        }
      )
    );


    // Wait for save
    await waitFor(() => {
      expect(
        mockAudius.playlists.createPlaylist
      ).toHaveBeenCalled();
    });


    // Search field should be cleared
    expect(searchInput).toHaveValue("");


    // Playlist name should reset
    expect(
      screen.getByDisplayValue(
        "My Playlist"
      )
    ).toBeInTheDocument();


    // Search results should also disappear
    expect(
      screen.queryByText("Song One")
    ).not.toBeInTheDocument();
  });

});q