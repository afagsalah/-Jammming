import TrackList from "./TrackList";

function Playlist(props) {
  function handleNameChange(event) {
    props.onNameChange(event.target.value);
  }

  return (
    <section className="music-panel playlist">
      <input
        className="playlist-name"
        type="text"
        value={props.playlistName}
        onChange={handleNameChange}
      />

      <TrackList
        tracks={props.playlistTracks}
        isRemoval={true}
        onRemove={props.onRemove}
      />

      {props.user && props.playlistTracks.length > 0 && (
        <button className="save-button" onClick={props.onSave}>
          SAVE TO AUDIUS
        </button>
      )}
    </section>
  );
}

export default Playlist;
