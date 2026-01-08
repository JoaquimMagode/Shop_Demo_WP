import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import { db } from './data/mockDatabase';

// Init DB
db.init();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
