import React, { useState, useEffect } from "react";

const SinglePlayer = ({ setSelectedPlayerID, selectedPlayerID }) => {
  const [player, setPlayer] = useState([null]);
  const [error, setError] = useState([null]);

  const cohortName = "2409-GHP-ET-WEB-PT";
  const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

  useEffect(() => {
    async function fetchSinglePlayer() {
      try {
        console.log("Fetching player with ID:", selectedPlayerID);
        const response = await fetch(`${API_URL}/${selectedPlayerID}`);
        console.log("API Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        console.log("Parsed JSON:", json);

        setPlayer(json.data.player); // set player with data fetched
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error(`Error fetching player #${selectedPlayerID}:`, err);
        setError("Error fetching player data. Please try again later");
      }
    }
    fetchSinglePlayer();
  }, [selectedPlayerID]);

  // Fallback for loading or error
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
        <button onClick={() => setSelectedPlayerID(null)}>
          Back to all players
        </button>
      </div>
    );
  }

  if (!player) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Single Player</h1>
      <h3>{player.name}</h3>
      <h3>ID: {player.id}</h3>
      <img
        src={player.imageUrl}
        alt={player.name}
        style={{ width: "200px", height: "150px" }}
      />
      <h4>{player.breed}</h4>
      <h4>{player.status}</h4>
      <button onClick={() => setSelectedPlayerID(null)}>
        Back to all players
      </button>
    </div>
  );
};

export default SinglePlayer;
