import React from 'react';
import PlayerCard from './PlayerCard';

const PlayerList = ({ players, onPlayerClick, onRemove }) => {
    return (
        <div className="player-list">
            {players.length ? (
                players.map((player) => (
                    <PlayerCard key={player.id} player={player} onPlayerClick={onPlayerClick} onRemove={onRemove} />
                ))
            ) : (
                <p>No players found!</p>
            )}
        </div>
    );
};

export default PlayerList;
