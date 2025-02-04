import React from 'react';
import PlayerCard from './Playercard';

const PlayerList = ({ players, removePlayer }) => {
    return (
        <div className="player-list">
            {players.length ? (
                players.map((player) => (
                    <PlayerCard key={player.id} player={player} onRemove={removePlayer} />
                ))
            ) : (
                <p>No players found!</p>
            )}
        </div>
    );
};

export default PlayerList;
