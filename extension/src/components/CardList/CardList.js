import React from 'react';
import './style.css';  // Import the CSS file


function CardList() {
  const savedCard = JSON.parse(localStorage.getItem('selectedCard'));
  
  if (!savedCard) return <p> </p>;

  return (
    <div className="card-list-container">
      <h2 className="card-list-title">Added Cards</h2>
      <p className="card-name">{savedCard.CardName}</p>
      {/* Render other card details if needed */}
    </div>
  );
}

export default CardList;
