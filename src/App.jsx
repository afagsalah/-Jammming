import { useEffect, useState } from "react";
import audius from "./api/audius";

import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";

import "./App.css";

function App() {
  // --------------------------------
  // STATES
  // --------------------------------

  const [searchResults, setSearchResults] = useState([]);

  const [term, setTerm] = useState("");

  const [playlistName, setPlaylistName] = useState("My Playlist");

  const [playlistTracks, setPlaylistTracks] = useState([]);

  const [user, setUser] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [savedPlaylistName, setSavedPlaylistName] = useState("");
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);

  // --------------------------------
  // RESTORE EXISTING AUDIUS LOGIN
  // --------------------------------

  useEffect(() => {
    async function restoreAudiusLogin() {
      try {
        const isLoggedIn = await audius.oauth.isAuthenticated();

        if (isLoggedIn) {
          const loggedInUser = await audius.oauth.getUser();

          console.log("Existing Audius login restored:", loggedInUser);

          setUser(loggedInUser);
        }
      } catch (error) {
        console.error("Could not restore Audius login:", error);
      }
    }

    restoreAudiusLogin();
  }, []);

  // --------------------------------
  // SEARCH AUDIUS
  // --------------------------------

  async function search(term) {
    try {
      const response = await audius.tracks.searchTracks({
        query: term,
        limit: 10,
      });

      const tracks = response.data.map((track) => ({
        id: track.id,
        name: track.title,
        artist: track.user.name,
        album: track.albumName || "Single",
      }));

      setSearchResults(tracks);
    } catch (error) {
      console.error("Audius search failed:", error);
    }
  }

  // --------------------------------
  // ADD TRACK
  // --------------------------------

  function addTrack(track) {
    const trackExists = playlistTracks.some(
      (currentTrack) => currentTrack.id === track.id,
    );

    if (!trackExists) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  }

  // --------------------------------
  // REMOVE TRACK
  // --------------------------------

  function removeTrack(track) {
    const newPlaylist = playlistTracks.filter(
      (currentTrack) => currentTrack.id !== track.id,
    );

    setPlaylistTracks(newPlaylist);
  }

  // --------------------------------
  // UPDATE PLAYLIST NAME
  // --------------------------------

  function updatePlaylistName(newName) {
    setPlaylistName(newName);
  }

  // --------------------------------
  // LOGIN TO AUDIUS
  // --------------------------------

  function loginToAudius() {
    audius.oauth
      .login({
        scope: "write",
      })
      .then(() => {
        return audius.oauth.getUser();
      })
      .then((loggedInUser) => {
        console.log("LOGIN SUCCESS:", loggedInUser);

        setUser(loggedInUser);

        // Show popup
        setShowLoginSuccess(true);

        // Automatically disappear after 3 seconds
        setTimeout(() => {
          setShowLoginSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("AUDIUS LOGIN ERROR:", error);
        alert("Audius login failed.");
      });
  }
  //--------------------------------------
  //
  //-------------------------------------
  async function logoutFromAudius() {
    try {
      await audius.oauth.logout();

      setUser(null);

      console.log("Logged out from Audius");
    } catch (error) {
      console.error("AUDIUS LOGOUT ERROR:", error);
    }
  }

  // --------------------------------
  // SAVE PLAYLIST TO AUDIUS
  // --------------------------------

  async function savePlaylist() {
    // User must login first
    if (!user) {
      alert("Please login to Audius first.");

      return;
    }

    // Playlist must contain tracks
    if (playlistTracks.length === 0) {
      alert("Your playlist is empty.");

      return;
    }

    try {
      // Prepare tracks for Audius
      const playlistContents = playlistTracks.map((track) => ({
        trackId: track.id,

        timestamp: Math.round(Date.now() / 1000),
      }));

      // Save playlist
      await audius.playlists.createPlaylist({
        userId: user.id,

        metadata: {
          playlistName: playlistName,

          playlistContents: playlistContents,
        },
      });

      console.log("Playlist saved successfully");
      // Remember the name that was actually saved
      setSavedPlaylistName(playlistName);
      // --------------------------------
      // SHOW SUCCESS POPUP
      // --------------------------------

      setShowSuccess(true);

      // --------------------------------
      // CLEAR APP AFTER SUCCESSFUL SAVE
      // --------------------------------

      // Clear search input
      setTerm("");

      // Clear search results
      setSearchResults([]);

      // Clear playlist tracks
      setPlaylistTracks([]);

      // Reset playlist name
      setPlaylistName("My Playlist");

      // --------------------------------
      // HIDE SUCCESS POPUP
      // AFTER 3 SECONDS
      // --------------------------------

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("SAVE PLAYLIST ERROR:", error);

      alert("Could not save playlist.");
    }
  }

  // --------------------------------
  // JSX
  // --------------------------------

  return (
    <div className="app">
      {showLoginSuccess && (
        <div className="success-popup">
          <div className="success-icon">✓</div>

          <div className="success-text">
            <h3>Login Successful!</h3>

            <p>Welcome! You are now signed in to Audius.</p>
          </div>

          <button
            className="success-close"
            onClick={() => setShowLoginSuccess(false)}
          >
            ×
          </button>
        </div>
      )}npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
      <div className="user-status">
        {user ? (
          <>
            <span>✓ {user.name}</span>

            <button onClick={logoutFromAudius}>Logout</button>
          </>
        ) : (
          <button onClick={loginToAudius}>Sign In</button>
        )}
      </div>
      {/* SUCCESS POPUP */}

      {showSuccess && (
        <div className="success-popup">
          <div className="success-icon">✓</div>

          <div className="success-text">
            <h3>Playlist Saved!</h3>

            <p>Your playlist was successfully saved to Audius.</p>
          </div>

          <button
            className="success-close"
            onClick={() => setShowSuccess(false)}
          >
            ×
          </button>
        </div>
      )}

      {/* HEADER */}

      <header className="header">
        <h1>
          JAM<span>MMING</span>
        </h1>

        <p>Build your perfect playlist</p>
      </header>

      {/* SEARCH BAR */}

      <SearchBar onSearch={search} term={term} setTerm={setTerm} />

      {/* MAIN CONTENT */}

      <main className="music-container">
        {/* SEARCH RESULTS */}

        <SearchResults searchResults={searchResults} onAdd={addTrack} />

        {/* PLAYLIST */}

        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
          user={user}
        />
      </main>
    </div>
  );
}

export default App;
