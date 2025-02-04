import React, { useState } from 'react';
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/2412-FTB-ET-WEB-FT`;

const PlayerForm = ({ fetchAllPlayers, isOpen, onRequestClose }) => {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPlayer = { name, breed, imageUrl };
        try {
            const response = await fetch(`${API_URL}/players`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPlayer),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            fetchAllPlayers();
            setName('');
            setBreed('');
            setImageUrl('');
            alert(`${newPlayer.name} has been added to the roster!`);
            onRequestClose();
        } catch (err) {
            console.error("Oops, something went wrong with adding that player!", err);
        }
    };

    return isOpen ? (
        <div>
            <div className="overlay" onClick={onRequestClose}></div>
            <div className="popup">
                <form id="new-player-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Puppy Name"
                        required
                    />
                    <input
                        type="text"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        placeholder="Puppy Breed"
                        required
                    />
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Puppy Image"
                        required
                    />
                    <button type="submit">Add New Player</button>
                </form>
            </div>
        </div>
    ) : null;
};

export default PlayerForm;
