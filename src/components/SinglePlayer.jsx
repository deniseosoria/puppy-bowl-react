import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SinglePlayer = () => {
  const {  id } = useParams(); // Get the player ID from the route
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cohortName = "2409-GHP-ET-WEB-PT";
  const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/${id}`;

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Response:", result); // Debug API response

        if (result?.data) {
          setPlayer(result.data.player);
        } else {
          throw new Error("Player data not found in response.");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching player:", error);
        setError("Failed to fetch player details.");
        setIsLoading(false);
      }
    }

    fetchPlayer();
  }, [id]); // Re-fetch if the ID changes

  if (isLoading) {
    return <h2>Loading player details...</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/">Back to All Players</Link>
      </div>
    );
  }

  if (!player) {
    return (
      <div>
        <h2>Player not found.</h2>
        <Link to="/">Back to All Players</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{player.name || "Unknown Player"}</h1>
      <img
        src={player.imageUrl || "https://via.placeholder.com/200"}
        alt={player.name || "Unknown"}
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      />
      <h3>ID: {player.id || "N/A"}</h3>
      <h3>Breed: {player.breed || "Unknown"}</h3>
      <h3>Status: {player.status || "N/A"}</h3>
      <Link to="/">Back to All Players</Link>
    </div>
  );
};

export default SinglePlayer;
