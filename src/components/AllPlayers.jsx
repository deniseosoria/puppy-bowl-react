import React, { useEffect, useState } from "react";

const AllPlayers = ({ setSelectedPlayerID }) => {
  const [players, setPlayers] = useState([]);

  const cohortName = "2409-GHP-ET-WEB-PT";
  const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

  useEffect(() => {
    async function fetchAllPlayers() {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        setPlayers(result.data.players);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    }

    fetchAllPlayers();
  }, []);

  async function handleDelete(playerId) {
    try {
      const response = await fetch(`${API_URL}/${playerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Unable to delete player due to HTTP error: ${response.status}`
        );
      }

      // Update state to remove deleted player
      setPlayers((prevPlayers) => prevPlayers.filter((p) => p.id !== playerId));
    } catch (err) {
      console.error(`Error removing player #${playerId}:`, err);
    }
  }

  return (
    <div>
      <h2>All Players</h2>
      <ul style={{ listStyleType: "none" }}>
        {players.map((player) => (
          <li key={player.id}>
            <h3>{player.name}</h3>
            <h3>ID: {player.id}</h3>
            <img
              src={player.imageUrl}
              alt={player.name}
              style={{ width: "200px", height: "150px" }}
            />
            <br />
            <button onClick={() => handleDelete(player.id)}>Delete</button>
            <button
              onClick={() => {
                setSelectedPlayerID(player.id);
              }}
            >
              More Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPlayers;
