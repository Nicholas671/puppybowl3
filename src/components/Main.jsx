import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Form from './Form/Form';
import Search from './Search/Search';

function Main() {
    return (
        <div>
            <Link to="/form">
                <button>Form</button>
            </Link>
            <Link to="/search">
                <button>Search</button>
            </Link>
            <Routes>
                <Route path="/search" element={<Search />} />
                <Route path="/form" element={<Form />} />
            </Routes>
        </div>
    );
}

export default Main;
