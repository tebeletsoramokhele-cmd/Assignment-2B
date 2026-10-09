import React from "react";

function AttractionCard({ attraction, onViewDetails }) {
  return (
    <div className="attraction-card">
      <img
        src={attraction.image}
        alt={attraction.name}
        className="attraction-image"
      />

      <div className="attraction-info">
        <span className="category-label">
          {attraction.category}
        </span>

        <h3>{attraction.name}</h3>

        <p className="location">
          📍 {attraction.location}
        </p>

        <p>{attraction.description}</p>

        <p>
          <strong>Estimated cost:</strong> {attraction.cost}
        </p>

        <button onClick={() => onViewDetails(attraction)}>
          View Details
        </button>
      </div>
    </div>
  );
}

export default AttractionCard;
