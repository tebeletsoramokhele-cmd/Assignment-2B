
import EnquiryForm from "./components/EnquiryForm";
import React, { useState, useEffect } from "react";
import "./App.css";
import attractions from "./data/attractions";
import AttractionCard from "./components/AttractionCard";

function App() {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  
const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");

const filteredAttractions = attractions.filter((attraction) => {
  const matchesName = attraction.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    attraction.category === selectedCategory;

  return matchesName && matchesCategory;
});


  useEffect(() => {
    document.title = "Discover Lesotho | Tourism";
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <h2>Discover Lesotho</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#attractions">Attractions</a>
          <a href="#enquiry">Plan Your Visit</a>
          <a href="#contact">Contact</a>

        </div>
      </nav>

      <header className="hero" id="home">
        <div className="hero-content">
          <p className="subtitle">THE KINGDOM IN THE SKY</p>
          <h1>Discover the Beauty of Lesotho</h1>

          <p>
            Explore breathtaking mountains, beautiful waterfalls,
            rich Basotho culture and unforgettable adventures.
          </p>

          <a href="#attractions" className="hero-button">
            Explore Destinations
          </a>
        </div>
      </header>

      <section className="about" id="about">
        <h2>Welcome to Lesotho</h2>

        <p>
          Lesotho is a mountain kingdom known for its spectacular
          landscapes, rich Basotho culture and outdoor adventures.
          Discover its natural beauty and unique heritage.
        </p>
      </section>
      
<section className="activities-section">
  <h2>Experience Lesotho</h2>

  <p className="activities-intro">
    Discover exciting adventures and unforgettable Basotho experiences.
  </p>

  <div className="activities-grid">
    <div className="activity-card">
      <span>🥾</span>
      <h3>Mountain Hiking</h3>
      <p>Explore scenic trails and breathtaking highland views.</p>
    </div>

    <div className="activity-card">
      <span>💧</span>
      <h3>Waterfall Adventures</h3>
      <p>Visit beautiful waterfalls and enjoy nature photography.</p>
    </div>

    <div className="activity-card">
      <span>🧣</span>
      <h3>Basotho Culture</h3>
      <p>Discover traditional crafts, heritage and local experiences.</p>
    </div>
  </div>
</section>


      <section className="attractions" id="attractions">
        <h2>Explore Our Attractions</h2>

        <p>
          Discover beautiful destinations and plan your next adventure.
        </p>
        
<div className="search-filter">
  <input
    type="text"
    placeholder="Search attractions by name..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />

  <select
    value={selectedCategory}
    onChange={(event) => setSelectedCategory(event.target.value)}
  >
    <option value="All">All Categories</option>
    <option value="Nature">Nature</option>
    <option value="Adventure">Adventure</option>
    <option value="Culture">Culture</option>
  </select>
</div>

<p className="results-count">
  Showing {filteredAttractions.length} attraction(s)
</p>


        <div className="attractions-grid">
          {filteredAttractions.map((attraction) => (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
              onViewDetails={setSelectedAttraction}
            />
          ))}
        </div>
  
      </section>

      {selectedAttraction && (
        <div className="details-overlay">
          <div className="details-modal">
            <button
              className="close-button"
              onClick={() => setSelectedAttraction(null)}
            >
              Close ✕
            </button>

            <h2>{selectedAttraction.name}</h2>

            <p>
              <strong>Location:</strong>{" "}
              {selectedAttraction.location}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {selectedAttraction.category}
            </p>

            <p>{selectedAttraction.description}</p>

            <h3>Available Activities</h3>

            <ul>
              {selectedAttraction.activities.map((activity) => (
                <li key={activity}>{activity}</li>
              ))}
            </ul>

            <p>
              <strong>Estimated cost:</strong>{" "}
              {selectedAttraction.cost}
            </p>
          </div>
                {filteredAttractions.length === 0 && (
                <p className="no-results">
                  No attractions found. Try another search or category.
                </p>
            )}
        </div>
        
      )}
      <EnquiryForm />

      <footer id="contact">
        <p>© 2026 Discover Lesotho | Explore. Experience. Enjoy.</p>
      </footer>
    </div>
  );
}

export default App;

