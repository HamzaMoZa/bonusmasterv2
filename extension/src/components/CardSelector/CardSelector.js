import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';  // Import the CSS file


function CardDropdown() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    // Load selectedCards from local storage when the component mounts
    const storedCards = JSON.parse(localStorage.getItem("selectedCards") || "[]");
    setSelectedCards(storedCards);
  }, []);

  const handleDropdownClick = async () => {
    if (cards.length === 0) { // Only fetch if cards aren't already fetched
      try {
        const response = await axios.get('http://localhost:4000/api/cards/fetchCards');
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }
  };

  const handleCardSelect = (cardId) => {
    const card = cards.find(c => c._id === cardId);
    if (card) {
      const updatedCards = [...selectedCards, card];
      setSelectedCards(updatedCards);
      localStorage.setItem("selectedCards", JSON.stringify(updatedCards));
    }
  };

  const handleDeleteCard = (cardId) => {
    const updatedCards = selectedCards.filter(card => card._id !== cardId);
    setSelectedCards(updatedCards);
    localStorage.setItem("selectedCards", JSON.stringify(updatedCards));
  };

  return (
    <div className="card-selector-container">
      <label htmlFor="card-dropdown" className="card-selector-label">Select a card:</label>
      <select id="card-dropdown" className="card-selector-dropdown" onChange={e => handleCardSelect(e.target.value)} onClick={handleDropdownClick}>
        <option value="">Select a card</option>
        {cards.map(card => <option key={card._id} value={card._id}>{card.CardName}</option>)}
      </select>
      <ul className="card-list">
        {selectedCards.map(card => (
          <li key={card._id} className="card-list-item">
            {card.CardName} <button className="card-delete-button" onClick={() => handleDeleteCard(card._id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardDropdown;
