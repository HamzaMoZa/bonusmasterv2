import React, { useState } from 'react';
import axios from 'axios';

function CardDropdown() {
  const [cards, setCards] = useState([]);

  const handleDropdownClick = async () => {
    if (cards.length === 0) { // Only fetch if cards aren't already fetched
      try {
        const response = await axios.get('http://localhost:4000/api/cards/fetchCards');
        
        // Log the entire response object to inspect its structure
        


        // Log just the data property of the response
        

        setCards(response.data);

      } catch (error) {
        
      }
    }
  };

  const handleCardSelect = (cardId) => {
    // Handle card selection logic here
  };

  return (
    <select onChange={e => handleCardSelect(e.target.value)} onClick={handleDropdownClick}>
      <option>Select a card</option>
      {cards.map(card => {
        // Log each card during the mapping process
        console.log("Mapping card:", card);
        return <option key={card._id} value={card._id}>{card.CardName}</option>
      })}
    </select>
  );
}

export default CardDropdown;
