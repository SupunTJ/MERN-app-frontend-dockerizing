import { useEffect } from "react";
import songsStore from "../stores/songsStore";
import Songs from "../components/songs";
import UpdateForm from "../components/UpdateForm";
import CreateForm from "../components/CreateForm";
import image3 from "../components/images/image3.jpeg"

export default function SongsPage() {
  const store = songsStore();
  console.log(store);

  useEffect(() => {
    store.fetchSongs();
  }, []);

  return (
    <div
    style={{
      backgroundImage: `url(${image3})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "100vh", // Set the height of the container to the full viewport height
    }}
    >
      <Songs />
      <UpdateForm />
      <CreateForm />
    </div>
  );
}
