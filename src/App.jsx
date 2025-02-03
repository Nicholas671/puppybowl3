import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import PlayerList from './components/Player/PlayerList';
import PlayerForm from './components/Player/PlayerForm';
import PlayerDetails from './components/Player/PlayerDetails';
import Search from './components/Search/Search';

const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-ET-WEB-FT`;

const App = () => {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (

    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add-player">Add Player</Link>
      </nav>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<PlayerList players={filteredPlayers} />} />
        <Route path="/player/:id" element={<PlayerDetails />} />
        <Route path="/add-player" element={<PlayerForm fetchAllPlayers={fetchAllPlayers} />} />
      </Routes>
    </div>

  );
};

export default App;
