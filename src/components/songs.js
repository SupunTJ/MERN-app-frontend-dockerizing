import songsStore from "../stores/songsStore";
import Song from "./Song";
import "./style.css";
import Search from "./Search";

export default function Songs() {
  const store = songsStore();

  return (
    <div
      style={{ width: "70%", float: "left" }}
      className="justify-content-left align-items-left "
    >
      <div
        className=" justify-content-center 
        align-items-center
        vh-100"
      >
        <div className="p-5 mx-auto text-center">
          <div className="bg-gradient p-2 text-dark bg-opacity-75 rounded-3 w-50 p-2 d-flex justify-content-center">
            <div className="position-absolute top-0 start-50 translate-middle-x p-2">
              <Search />
            </div >
            <h2 className="text-light">Songs: </h2>
          </div>
        </div>

        <div className="bg-secondary bg-gradient p-2 text-dark bg-opacity-75 rounded-3">
          <div
            className="row justify-content-center
        table-responsive align-items-center p-3"
          >
            <table
              className="table table-striped
          table-bordered table-dark"
            >
              <thead className="thead-dark">
                <tr>
                  <th
                    scope="col"
                    className="bg-success p-2 text-white bg-opacity-50"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="bg-success p-2 text-white bg-opacity-50"
                  >
                    Artist
                  </th>
                  <th
                    scope="col"
                    className="bg-success p-2 text-white bg-opacity-50"
                  >
                    Genre
                  </th>
                  <th
                    scope="col"
                    className="bg-success p-2 text-white bg-opacity-50"
                  >
                    Music Player
                  </th>
                  <th
                    scope="col"
                    className="bg-success p-2 text-white bg-opacity-50"
                  >
                    Update/Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {store.songs &&
                  store.songs.map((song) => {
                    return <Song song={song} key={song._id} />;
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
