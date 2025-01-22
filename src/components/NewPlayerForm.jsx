import React, { useState } from "react";

const NewPlayerForm = ({ refreshPlayers }) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state

  const cohortName = "2409-GHP-ET-WEB-PT";
  const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

  // ADD NEW PLAYER with API

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true); // Set loading state
    const newPlayer = { name, breed, imageUrl: urlImage, status };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlayer),
      });
      const json = await response.json();

      if (json.success && json.data.newPlayer) {
        setSuccessMessage("Player added successfully");
        setError("");

        // Clear the form
        setName("");
        setBreed("");
        setUrlImage("");
        setStatus("");
        setError("");

        // Refresh the players list dynamically
        refreshPlayers();
      } else {
        setError(
          "Failed to add the player. Please check the input and try again."
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  }

  return (
    <div className="form-container">
      <h2>New Player Form</h2>
      <div>
        <form  className="form" onSubmit={handleSubmit}>
          {/* Display error or success messages */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

          <div className="input-container">
            <label>
              Name:{" "}
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="input-container">
            <label>
              Breed:{" "}
              <input
                type="text"
                name="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="input-container">
            <label>
              Image URL:{" "}
              <input
                type="url"
                name="imageUrl"
                value={urlImage}
                onChange={(e) => setUrlImage(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="input-container">
            <label>
              Status:{" "}
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Select status</option>
                <option value="bench">Bench</option>
                <option value="field">Field</option>
              </select>
            </label>
          </div>

          <div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Puppy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPlayerForm;
