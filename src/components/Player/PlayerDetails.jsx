import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-ET-WEB-FT`;

const PlayerDetails = ({ isOpen, onRequestClose }) => {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);

    const fetchSinglePlayer = async (playerId) => {
        try {
            const response = await fetch(`${API_URL}/players/${playerId}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            setPlayer(result.data.player);
        } catch (err) {
            console.error(`Oh no, trouble fetching player #${playerId}!`, err);
        }
    };

    useEffect(() => {
        fetchSinglePlayer(id);
    }, [id]);

    if (!player) return <p>Loading...</p>;

    return isOpen ? (
        <div className="overlay" onClick={onRequestClose}>
            <div className="player-details">
                <h2>{player.name}</h2>
                <p>Player ID: {player.id}</p>
                <p>Breed: {player.breed}</p>
                <p>Team: {player.team ? player.team.name : "Unassigned"}</p>
                <img src={player.imageUrl} alt={player.name} />
                <button onClick={onRequestClose}>Close</button>
            </div>
        </div>
    ) : null
};

export default PlayerDetails;
