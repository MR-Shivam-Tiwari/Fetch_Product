import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import statement
import App from './App';
import './index.css'; // Import CSS directly here

const root = createRoot(document.getElementById('root')); // Use createRoot from react-dom/client

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
