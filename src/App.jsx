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
  const [isPlayerDetailsOpen, setIsPlayerDetailsOpen] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

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

  const handlePlayerDetailsOpen = (playerId) => {
    setSelectedPlayerId(playerId);
    setIsPlayerDetailsOpen(true);
  };

  const handlePlayerDetailsClose = () => {
    setSelectedPlayerId(null);
    setIsPlayerDetailsOpen(false);
  };

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
      <header>
        <h1>Puppy Bowl III</h1>
        <nav>
          <Link to="/">Home</Link>
          <button onClick={handlePlayerFormOpen}>Add Player</button>
        </nav>



      </header>

      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div>
        <Routes>
          <Route path="/" element={<PlayerList players={filteredPlayers} onPlayerClick={handlePlayerDetailsOpen} onRemove={removePlayer} />} />
        </Routes>
        <PlayerForm isOpen={isPlayerFormOpen} onRequestClose={handlePlayerFormClose} fetchAllPlayers={fetchAllPlayers} />
        <PlayerDetails isOpen={isPlayerDetailsOpen} onRequestClose={handlePlayerDetailsClose} />
      </div>

    </div>
  );
};


export default App;
