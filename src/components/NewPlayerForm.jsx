import React, { useState } from "react";

const NewPlayerForm = () => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const cohortName = "2409-GHP-ET-WEB-PT";
  const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

  // ADD NEW PLAYER with API

  async function handleSubmit(event) {
    event.preventDefault()
    const newPlayer = { name, breed, imageUrl: urlImage, status };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlayer),
      });
      const json = await response.json();

      if (json.success && json.data.newPlayer) {
        console.log("Player added successfully:", json.data.newPlayer);
        setSuccessMessage("Player added successfully");

        // Clear the form
        setName("");
        setBreed("");
        setUrlImage("");
        setStatus("");
        setError("");

      } else {
        console.error("Error adding player:", json);
        setError("Failed to add the player. Please check the input and try again.");
      }

    } catch (err) {
      console.error("Oops, something went wrong with adding that player!", err);
      setError("An unexpected error occurred. Please try again later.");
    }
  }

  return (
    <div className="puppybowl-container">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h2>New Player Form</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && (
            <p style={{ color: "green" }}>
              {successMessage}
            </p> /* Display success */
          )}

          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Breed:
              <input
                type="text"
                name="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Image URL:
              <input
                type="url"
                name="imageUrl"
                value={urlImage}
                onChange={(e) => setUrlImage(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Status:
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
            <button type="submit">Add Puppy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPlayerForm;
