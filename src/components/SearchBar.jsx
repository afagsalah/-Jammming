function SearchBar(props) {

  function handleChange(event) {
    props.setTerm(event.target.value);
  }

  function handleSearch() {
    props.onSearch(props.term);
  }

  return (
    <div className="search-bar">

      <input
        type="text"
        placeholder="Search for a song or artist..."
        value={props.term}
        onChange={handleChange}
      />

      <button onClick={handleSearch}>
        Search
      </button>

    </div>
  );
}

export default SearchBar;