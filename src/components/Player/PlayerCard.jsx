import React from 'react';
import { Link } from 'react-router-dom';
import RemovePlayerButton from '../RemovePlayerButton';

const PlayerCard = ({ player, onRemove }) => {
    return (
        <div className="player-card">
            <h2>{player.name}</h2>
            <p>Player ID: {player.id}</p>
            <img src={player.imageUrl} alt={player.name} />
            <Link to={`/player/${player.id}`}>See Puppy Details</Link>
            <br />
            <RemovePlayerButton playerId={player.id} onRemove={onRemove} />
        </div>
    );
};

export default PlayerCard;
