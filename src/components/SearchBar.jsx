import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [name, setName] = useState("");

  return (
    <>
      <form className="search-bar">
        <div>
          <label>
            <input
              className="search-input"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <Link to={`/players/${name}`}>
          Search By Name
        </Link>
      </form>
    </>
  );
};

export default SearchBar;
