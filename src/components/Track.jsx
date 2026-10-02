function Track(props) {
  function handleClick() {
    if (props.isRemoval) {
      props.onRemove(props.track);
    } else {
      props.onAdd(props.track);
    }
  }

  return (
    <div className="track">
      <div className="track-info">
        <h3>{props.track.name}</h3>

        <p>
          {props.track.artist}
          <span> • </span>
          {props.track.album}
        </p>
      </div>

      <button className="track-button" onClick={handleClick}>
        {props.isRemoval ? "−" : "+"}
      </button>
    </div>
  );
}

export default Track;
