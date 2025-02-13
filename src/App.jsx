import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import AllPlayers from "./components/AllPlayers";
import SinglePlayer from "./components/SinglePlayer";
import NewPlayerForm from "./components/NewPlayerForm";
import SearchBar from "./components/SearchBar";
import SearchPlayer from "./components/SearchPlayer";

function App() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const cohortName = "2409-GHP-ET-WEB-PT";
  const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

  async function fetchAllPlayers() {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (result?.data?.players) {
        setPlayers(result.data.players);
      } else {
        throw new Error("Players data is not in the expected format.");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching players:", error);
      setError("Failed to load players. Please try again later.");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAllPlayers();
  }, []);

  if (isLoading) {
    return <h2>Loading players...</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <header>
          <Link to="/" className="h1">
            PUPPY BOWL
          </Link>
        </header>

        <div className="content">
          <Routes>
            {/* Home Route: Search Bar, New Player Form & All Players */}
            <Route
              path="/"
              element={
                <>
                  <SearchBar />
                  <div id="main-container">
                    <div id="player-form">
                      <NewPlayerForm refreshPlayers={fetchAllPlayers} />
                    </div>
                    <div  id="players">
                      <AllPlayers
                        players={players}
                        setPlayers={setPlayers}
                        API_URL={API_URL}
                      />
                    </div>
                  </div>
                </>
              }
            />
            {/* Searched Players Route */}
            <Route
              path="/players/:name"
              element={
                <SearchPlayer
                  players={players}
                  setPlayers={setPlayers}
                  API_URL={API_URL}
                />
              }
            />

            {/* Single Player Route */}
            <Route path="/player/:id" element={<SinglePlayer />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
