import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [flavors, setFlavors] = useState([]);

  useEffect(() => {
    // Fetch flavors from the server when the component mounts
    fetch("/api/flavors")
      .then((response) => response.json())
      .then((data) => setFlavors(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Ice Cream Flavors</h1>
      {flavors.map((flavor) => (
        <div key={flavor.id}>
          <h2>{flavor.name}</h2>
          <p>
            {flavor.is_favorite
              ? "This is a favorite!"
              : "This is not a favorite."}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
