import React from 'react';

function CardList() {
  const savedCard = JSON.parse(localStorage.getItem('selectedCard'));
  
  if (!savedCard) return <p>No card added.</p>;

  return (
    <div>
      <h2>Added Cards</h2>
      <p>{savedCard.CardName}</p>
      {/* Render other card details if needed */}
    </div>
  );
}

export default CardList;
