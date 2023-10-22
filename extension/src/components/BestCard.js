import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BestCard.css';



function BestCard() {
  const [bestCard, setBestCard] = useState(null);
  const [selectedCards, setSelectedCards] = useState(JSON.parse(localStorage.getItem("selectedCards") || "[]"));

  // Function to fetch the best card
  const fetchBestCard = () => {
    // Assuming you want to use the current webpage URL
    const webpageURL = window.location.href;

    // Only fetch the best card if there are selected cards
    if (selectedCards.length > 0) {
      axios.post('http://localhost:4000/api/cards/getBestCard', {
        selectedCards: selectedCards,
        webpageURL: webpageURL
      })
      .then(response => {
        setBestCard(response.data.bestCard);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching the best card:", error);
      });
    } else {
      // If no cards are selected, clear the best card recommendation
      setBestCard(null);
    }
  };

  // Use useEffect to listen to changes in the selectedCards and fetch the best card accordingly
  useEffect(() => {
    fetchBestCard();
  }, [selectedCards]);

  // Use another useEffect to listen to localStorage changes
  useEffect(() => {
    // Update the state when localStorage changes
    const handleStorageChange = () => {
      setSelectedCards(JSON.parse(localStorage.getItem("selectedCards") || "[]"));
    };

    // Add an event listener to localStorage changes to listen for card additions/removals
    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="best-card-container">
      <h3 className="best-card-title">Best Card for this Website</h3>
      {bestCard ? (
        <div className="best-card-name">
          <strong>Card Name:</strong> {bestCard}
          {/* Add any other card details you want to display here */}
        </div>
      ) : (
        <p className="no-recommendation">No recommendation available.</p>
      )}
    </div>
  );
}

export default BestCard;
