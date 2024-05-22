import create from "zustand";
import axios from "axios";

const songsStore = create((set) => ({
  songs: null,

  createForm: {
    name: "",
    artist: "",
    genre: "",
    songUrl: "",
  },

  updateForm: {
    _id: null,
    name: "",
    artist: "",
    genre: "",
    songUrl: "",
  },

  fetchSongs: async () => {
    // Fetch the songs
    const res = await axios.get("/songs");
    // Set to state
    set({
      songs: res.data.songs,
    });
  },
  updateCreateFormField: async (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });

    console.log({ name, value });
  },

  createSong: async (e) => {
    e.preventDefault(); // prevent refresh the page when submitting 
    const { createForm, songs } = songsStore.getState();

    // Create song
    const res = await axios.post("/songs", createForm);

    set({
      songs: [...songs, res.data.song],
      createForm: {
        name: "",
        artist: "",
        genre: "",
        songUrl: "", // after submiting clear the form fields 
      },
    });
  },

  deleteSong: async (_id) => {
    //delete the song
    const res = await axios.delete(`/songs/${_id}`);
    const { songs } = songsStore.getState();

    // Update state
    const newSongs = songs.filter((song) => {
      return song._id !== _id;
    });

    set({ songs: newSongs });
    console.log(res);
  },

  handleUpdateFieldChange: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },

  updateSong: async ({ _id, name, artist, genre, songUrl }) => {
    set({
      updateForm: {
        name,
        artist,
        genre,
        songUrl,
        _id,
      },
    });
    // Set state on update form
  },

  updateSongButton: async (e) => {
    e.preventDefault();

    const {
      updateForm: { name, artist, genre, songUrl, _id },
      songs,
    } = songsStore.getState();

    // Send the update request
    const res = await axios.put(`/songs/${_id}`, {
      name,
      artist,
      genre,
      songUrl,
    });
    //update state
    const newSongs = [...songs];
    const songIndex = songs.findIndex((song) => {
      return song._id === _id;
    });
    newSongs[songIndex] = res.data.song;

    set({
      songs: newSongs,
      updateForm: {
        _id: null,
        name: "",
        artist: "",
        genre: "",
        songUrl: "",
      },
    });
  },
}));

export default songsStore;
