import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CardDropdown() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await axios.get('/api/cards'); // replace with your API endpoint
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }

    fetchCards();
  }, []);

  const handleCardSelect = async (card) => {
    setSelectedCard(card);
    await axios.post('/api/addCard', { cardId: card._id }); // replace with your API endpoint
    // Save card to local storage or any other logic you'd like
    // Retrieve the existing list of cards
    let existingCards = localStorage.getItem('selectedCard');

    // Parse it to get the array, if it exists. Otherwise, start with an empty array
    existingCards = existingCards ? JSON.parse(existingCards) : [];

    // Append the new card to the array
    existingCards.push(card);

    // Store the updated array back in localStorage
    localStorage.setItem('selectedCard', JSON.stringify(existingCards));
  }

  return (
    <select onChange={e => handleCardSelect(e.target.value)}>
      <option>Select a card</option>
      {cards.map(card => (
        <option key={card._id} value={card._id}>{card.CardName}</option>
      ))}
    </select>
  );
 
}

export default CardDropdown;
