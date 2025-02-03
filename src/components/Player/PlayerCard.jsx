import React from 'react';
import { Link } from 'react-router-dom';

const PlayerCard = ({ player }) => {
    return (
        <div className="player-card">
            <h2>{player.name}</h2>
            <p>Player ID: {player.id}</p>
            <img src={player.imageUrl} alt={player.name} />
            <Link to={`/player/${player.id}`}>See Puppy Details</Link>
        </div>
    );
};

export default PlayerCard;
