import React from "react";
import { Link } from "react-router-dom";

const AllPlayers = ({ players, setPlayers, API_URL }) => {
  if (players.length === 0) {
    return <h2>No players found.</h2>;
  }

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
    <div className="player-container">
      <h2>All Players</h2>
      <div className="grid-container">
        {players.map((player) => (
          <div className="grid-item" key={player.id}>
            <h3>{player.name}</h3>
            <img src={player.imageUrl || "https://via.placeholder.com/200" } alt={player.name || "Player Image"} style={{ maxWidth: "200px", height: "150px" }} />
            <br />

            <Link to={`/player/${player.id}`}>More Details</Link>

            <button onClick={() => handleDelete(player.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPlayers;
