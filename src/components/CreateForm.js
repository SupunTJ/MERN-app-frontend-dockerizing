import songsStore from "../stores/songsStore";
import "./style.css";
import { Link } from "react-router-dom";

export default function CreateForm() {
  const store = songsStore();
  if (store.updateForm._id) return <></>;
  return (
    <div
      style={{
        width: "30%",
        float: "right",
      }}
      className="login template justify-content-center 
        vh-100 bg-brimary "
    >
      <div className=" login p-5 rounded">
        <div className="p-4">
          <h2
            className="text-center text-light mb-4
          bg-secondary bg-gradient p-2
           bg-opacity-75 rounded-3"
          >
            Create Song Playlist
          </h2>
        </div>
        <div className="bg-secondary bg-gradient p-2 text-light bg-opacity-75 rounded-3">
          <form onSubmit={store.createSong}>
            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Song/Music Name"
                onChange={store.updateCreateFormField}
                value={store.createForm.name}
                name="name"
              />
            </div>

            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Name of the Artist"
                onChange={store.updateCreateFormField}
                value={store.createForm.artist}
                name="artist"
              />
            </div>

            <div className="mb-2">
              <select
                className="form-control"
                onChange={store.updateCreateFormField}
                value={store.createForm.genre}
                name="genre"
              >
                <option value="">Select Genre</option>
                <option value="Rock">Rock</option>
                <option value="Pop">Pop</option>
                <option value="Hip-Hop">Hip-Hop</option>
                <option value="Country">Country</option>
                <option value="Jazz">Jazz</option>
                <option value="Classical">Classical</option>
              </select>
            </div>

            <div className="mb-2">
              <input
                className="form-control"
                placeholder="Song/Music URL"
                onChange={store.updateCreateFormField}
                value={store.createForm.songUrl}
                name="songUrl"
              />
            </div>

            <div className="d-grid p-4">
              <button className="btn btn-outline-light mb-4" type="submit">
                Add to Playlist
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
