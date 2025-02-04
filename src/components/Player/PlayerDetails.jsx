import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";

const cohortName = "2412-FTB-ET-WEB-FT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

function PlayerDetails() {
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let { id } = useParams();

    const fetchSinglePlayer = async (playerId) => {
        try {
            console.log(`Fetching player #${playerId}`);
            const response = await fetch(`${API_URL}/players/${playerId}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            console.log('Player data:', result.data.player);
            setPlayer(result.data.player);
        } catch (err) {
            console.error(`Oh no, trouble fetching player #${playerId}!`, err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchSinglePlayer(id);
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!player) return <p>Player not found.</p>;
    return (
        <div className="player-details">
            <h2>{player.name}</h2>
            <p>Player ID: {player.id}</p>
            <p>Breed: {player.breed}</p>
            <p>Team: {player.team ? player.team.name : "Unassigned"}</p>
            <img src={player.imageUrl} alt={player.name} />
            <br />
            <Link to="/">Back to Players List</Link>
        </div>
    );
}

export default PlayerDetails;
