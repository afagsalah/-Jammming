import TrackList from "./TrackList";

function SearchResults(props) {
  return (
    <section className="music-panel">
      <h2>Search Results</h2>

      <TrackList
        tracks={props.searchResults}
        isRemoval={false}
        onAdd={props.onAdd}
      />
    </section>
  );
}

export default SearchResults;
