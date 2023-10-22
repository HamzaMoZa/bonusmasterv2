import React from 'react';
import CardSelector from './components/CardSelector/CardSelector';
import CardList from './components/CardList/CardList';
import BestCard from './components/BestCard';
import {ThemeContext} from './ThemeContext/ThemeContext';
import {theme} from './ThemeContext/theme';  // Import the ThemeContext and theme
import './App.css';  // Import the CSS

function App() {
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <CardSelector />
        <CardList />
        <BestCard />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
