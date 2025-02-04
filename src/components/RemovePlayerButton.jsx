import React from 'react';

const RemovePlayerButton = ({ playerId, onRemove }) => {
    const handleRemove = () => {
        onRemove(playerId);
    };

    return (
        <button onClick={handleRemove}>Remove</button>
    );
};

export default RemovePlayerButton;
