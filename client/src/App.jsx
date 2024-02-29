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

// import { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [flavors, setFlavors] = useState([]);
//   const [selectedFlavor, setSelectedFlavor] = useState(null);
//   const [newFlavor, setNewFlavor] = useState({ name: "", is_favorite: false });

//   useEffect(() => {
//     fetch("/api/flavors")
//       .then((response) => response.json())
//       .then((data) => setFlavors(data))
//       .catch((error) => console.error("Error:", error));
//   }, []);

//   const handleSelectFlavor = (id) => {
//     const flavor = flavors.find((flavor) => flavor.id === id);
//     setSelectedFlavor(flavor);
//   };

//   const handleUpdateFlavor = () => {
//     fetch(`/api/flavors/${selectedFlavor.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(selectedFlavor),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setFlavors(
//           flavors.map((flavor) =>
//             flavor.id === data.id ? data : flavor
//           )
//         );
//         setSelectedFlavor(null);
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   const handleDeleteFlavor = (id) => {
//     fetch(`/api/flavors/${id}`, {
//       method: "DELETE",
//     })
//       .then(() => {
//         setFlavors(flavors.filter((flavor) => flavor.id !== id));
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   const handleCreateFlavor = () => {
//     fetch("/api/flavors", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newFlavor),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setFlavors([...flavors, data]);
//         setNewFlavor({ name: "", is_favorite: false });
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   return (
//     <div className="app">
//       <h1>Ice Cream Shop</h1>
//       <input
//         type="text"
//         value={newFlavor.name}
//         onChange={(e) => setNewFlavor({ ...newFlavor, name: e.target.value })}
//         placeholder="New flavor name"
//       />
//       <input
//         type="checkbox"
//         checked={newFlavor.is_favorite}
//         onChange={(e) => setNewFlavor({ ...newFlavor, is_favorite: e.target.checked })}
//       />
//       <button onClick={handleCreateFlavor}>Create Flavor</button>
//       <div className="flavors">
//         {flavors.map((flavor) => (
//           <div key={flavor.id} className="flavor-card">
//             <h2>{flavor.name}</h2>
//             <p>{flavor.is_favorite ? "🌟 This is a favorite!" : ""}</p>
//             <button onClick={() => handleSelectFlavor(flavor.id)}>View</button>
//             <button onClick={() => handleDeleteFlavor(flavor.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//       {selectedFlavor && (
//         <div className="selected-flavor">
//           <h2>{selectedFlavor.name}</h2>
//           <p>{selectedFlavor.is_favorite ? "🌟 This is a favorite!" : ""}</p>
//           <button onClick={handleUpdateFlavor}>Update</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
