import songsStore from "../stores/songsStore";
import "./style.css";

export default function Song({ song }) {
  const store = songsStore((store) => {
    return { deleteSong: store.deleteSong, updateSong: store.updateSong };
  });

  return (
    <tr>
      <td className="col-md-3" scope="row">
        {song.name}
      </td>
      <td  className="col-md-3">{song.artist}</td>
      <td className="col-md-3"> {song.genre}</td>
      <td className="col-md-3">
        <audio controls>
          <source src= {song.songUrl} type="audio/mpeg"></source>
        </audio>
      </td>
      <td className="col-md-3">
        <div className="d-flex">
          <div className="d-inline-block p-2">
            <button
              className="btn btn-danger margin-left text-"
              onClick={() => store.deleteSong(song._id)}
            >
              Delete
            </button>
          </div>

          <div className="d-inline-block p-2">
            <button
              className="btn btn-success margin-left "
              onClick={() => store.updateSong(song)}
            >
              Update
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}
