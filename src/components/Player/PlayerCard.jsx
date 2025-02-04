import React from 'react';
import { Link } from 'react-router-dom';
import RemovePlayerButton from '../RemovePlayerButton';

const PlayerCard = ({ player, onPlayerClick = () => { }, onRemove = () => { } }) => {
    const handleClick = () => {
        onPlayerClick(player.id);
    };
    return (
        <div className="player-card" onClick={handleClick}>
            <h2>{player.name}</h2>
            <p>Player ID: {player.id}</p>
            <img src={player.imageUrl} alt={player.name} />
            <Link to={`/player/${player.id}`}>See Puppy Details</Link>
            <RemovePlayerButton playerId={player.id} onRemove={onRemove} />
        </div>
    );
};

export default PlayerCard;
