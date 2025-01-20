import { useState } from "react";
import "./App.css";
import AllPlayers from "./components/AllPlayers";
import SinglePlayer from "./components/SinglePlayer";
import NewPlayerForm from "./components/NewPlayerForm";

function App() {
  const [selectedPlayerID, setSelectedPlayerID] = useState(null);

  return (
    <>
      <div>
        <h1>Puppy Bowl</h1>
        <NewPlayerForm />
        {selectedPlayerID ? (
          <SinglePlayer
            selectedPlayerID={selectedPlayerID}
            setSelectedPlayerID={setSelectedPlayerID}
          />
        ) : (
          <AllPlayers
            selectedPlayerID={selectedPlayerID}
            setSelectedPlayerID={setSelectedPlayerID}
          />
        )}
      </div>
    </>
  );
}

export default App;
