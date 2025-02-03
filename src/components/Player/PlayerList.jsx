import React from 'react';
import PlayerCard from './PlayerCard';

const PlayerList = ({ players }) => {
    return (
        <div className="player-list">
            {players.length ? (
                players.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                ))
            ) : (
                <p>No players found!</p>
            )}
        </div>
    );
};

export default PlayerList;
