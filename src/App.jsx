import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import PlayerList from './components/Player/PlayerList';
import PlayerForm from './components/Player/PlayerForm';
import PlayerDetails from './components/Player/PlayerDetails';
import Search from './components/Search/Search';
import './App.css';

const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-ET-WEB-FT`; // API URL

const App = () => { // App component
  const [players, setPlayers] = useState([]); // players state
  const [searchQuery, setSearchQuery] = useState(''); // searchQuery state
  const [isPlayerFormOpen, setIsPlayerFormOpen] = useState(false);

  const fetchAllPlayers = async () => {
    try {
      const response = await fetch(`${API_URL}/players`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      setPlayers(result.data.players);
    } catch (err) {
      console.error("Uh oh, trouble fetching players!", err);
    }
  };

  useEffect(() => {
    fetchAllPlayers();
  }, []);

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayerFormOpen = () => {
    setIsPlayerFormOpen(true);
  };

  const handlePlayerFormClose = () => {
    setIsPlayerFormOpen(false);
  };

  const removePlayer = async (playerId) => {
    try {
      const response = await fetch(`${API_URL}/players/${playerId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      fetchAllPlayers(); // Refresh the list
    } catch (err) {
      console.error(`Uh oh, trouble removing player #${playerId}!`, err);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Puppy Bowl III</h1>
        <nav>
          <Link to="/" className="button-link">Home</Link>
        </nav>
      </header>
      <br />
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <br />
      <button onClick={handlePlayerFormOpen}>Add Player</button>

      <div className="main">
        <Routes>
          <Route path="/" element={<PlayerList players={filteredPlayers} removePlayer={removePlayer} />} />
          <Route path="/player/:id" element={<PlayerDetails />} />
        </Routes>
        <PlayerForm isOpen={isPlayerFormOpen} onRequestClose={handlePlayerFormClose} fetchAllPlayers={fetchAllPlayers} />
      </div>
    </div>
  );
};

export default App;
