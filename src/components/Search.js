import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import MusicPlayerPopup from "./MusicPlayerPopup";
import player from "./images/player.png";
//import image2 from "../components/images/music2.jpg";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  //const [selectedResult, setSelectedResult] = useState(null);
  const searchContainerRef = useRef(null); // Added state for suggestions

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }
    setSuggestions([]);
    try {
      const response = await axios.get(`search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setSuggestions([]); // Clear all suggestions
  };

  // Implement auto-suggestions logic here
  const handleAutoSuggestions = async (inputValue) => {
    setSearchQuery(inputValue);

    if (!inputValue.trim()) {
      setSuggestions([]); // Clear suggestions if the input is empty
      return;
    }

    try {
      const response = await axios.get(`search?query=${inputValue}`);
      const fetchedSuggestions = response.data;

      // Filter and keep only suggestions that contain the matching text
      const filteredSuggestions = fetchedSuggestions.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      // Sort filtered suggestions based on matching text
      const sortedSuggestions = filteredSuggestions.sort((a, b) => {
        const aMatch = a.name.toLowerCase().includes(inputValue.toLowerCase());
        const bMatch = b.name.toLowerCase().includes(inputValue.toLowerCase());

        if (aMatch && !bMatch) {
          return -1;
        } else if (!aMatch && bMatch) {
          return 1;
        } else {
          return 0;
        }
      });

      setSuggestions(sortedSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleResultClick = (result) => {
    // Create a new window for the audio player
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const windowWidth = 400; // Set your desired width
    const windowHeight = 400; // Set your desired height

    const left = (screenWidth - windowWidth) / 2;
    const top = (screenHeight - windowHeight) / 2;

    // Create a new window for the audio player
    const audioPlayerWindow = window.open(
      "",
      "_blank",
      `width=${windowWidth}, height=${windowHeight}, left=${left}, top=${top}`
    );

    // Define the content of the new window
    const audioPlayerContent = `
  <html>
    <head>
      <title>Audio Player</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #9CDFC1
        }
        .music-popup {
          text-align: center;
          width: 85%;
          
        }
        .album-cover {
          max-width: 80%;
          padding: 5px;
        }
      </style>
    </head>
    <body>
      <div class="music-popup p-3">
        <div class="music-popup-content p-3">
        <img
                class="album-cover "
                src="${player}"
                alt="player"
              />
        <audio controls>
            <source src="${result.songUrl}" type="audio/mpeg">
          </audio>
        </div>
      </div>
    </body>
  </html>
`;
    setSearchResults([]);
    // Write the content to the new window document
    audioPlayerWindow.document.write(audioPlayerContent);
  };

  // Add an event listener to detect clicks outside the search container
  useEffect(() => {
    console.log("useEffect is running");

    const handleClickOutside = (event) => {
      console.log("searchContainerRef.current:", searchContainerRef.current);
      console.log("event.target:", event.target);
      if (event.target != null) {
        // event.target.style.display = "none";
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        // Clicked outside the search container, clear the suggestions
        setSuggestions([]);
        // setSearchResults([]);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="container" ref={searchContainerRef}>
        <form className="d-flex justify-content-between">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search..."
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleAutoSuggestions(e.target.value); // Call auto-suggestions when typing
            }}
          />

          <button
            type="button"
            className="btn btn-outline-light my-2 my-sm-0"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </div>
      {/* Display auto-suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-secondary p-2 text-dark bg-opacity-75 rounded-1">
          <ul>
            {suggestions.map((suggestion) => (
              <li
                className="text-light"
                key={suggestion._id}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display search results */}
      {searchResults.map((result) => (
        <div
          className="bg-light p-1 text-dark bg-opacity-75 rounded-1"
          key={result._id}
          onClick={() => handleResultClick(result)} // Handle result click
        >
          <ul>{result && result.name}</ul>
        </div>
      ))}

      
    </div>
  );
}

export default Search;
