import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [flavors, setFlavors] = useState([]);

  useEffect(() => {
    fetch("/api/flavors")
      .then((response) => response.json())
      .then((data) => setFlavors(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="app">
      <h1>Ice Cream Shop</h1>
      <div className="flavors">
        {flavors.map((flavor) => (
          <div key={flavor.id} className="flavor-card">
            <h2>{flavor.name}</h2>
            <p>{flavor.is_favorite ? "🌟 This is a favorite!" : ""}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
