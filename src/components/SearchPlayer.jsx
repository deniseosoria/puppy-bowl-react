import React from "react";
import { useParams, Link } from "react-router-dom";

const SearchPlayer = ({ players, setPlayers, API_URL }) => {
  const { name } = useParams(); // Get the player NAME from the route

  // Filter players by name (case-insensitive comparison)
  const filteredPlayers = players.filter(
    (player) => player.name.toLowerCase() === name.toLowerCase()
  );

  // Handle case when no matching players are found
  if (filteredPlayers.length === 0) {
    return <h2>No players found with the name "{name}".</h2>;
  }

  // Handle player deletion
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

  // Render the list of filtered players
  return (
    <div>
      <h2>"{name}"</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredPlayers.map((player) => (
          <li key={player.id} style={{ marginBottom: "20px" }}>
            <h3>{player.name}</h3>
            <h3>ID: {player.id}</h3>
            <img
              src={player.imageUrl}
              alt={player.name}
              style={{ width: "200px", height: "150px", objectFit: "cover" }}
            />
            <br />

            <Link
              to={`/player/${player.id}`}
              style={{
                textDecoration: "none",
                color: "blue",
                fontWeight: "bold",
              }}
            >
              More Details
            </Link>

            <button
              onClick={() => handleDelete(player.id)}
              style={{
                textDecoration: "none",
                color: "red",
                fontWeight: "bold",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Link to="/">Back to All Players</Link>
    </div>
  );
};

export default SearchPlayer;
