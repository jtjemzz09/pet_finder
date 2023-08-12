// Import the pets array from data.js
const pets = require('./data');

// Initialize the Express app
const express = require('express');
const app = express();

// Set the port for the server
const PORT = 8080;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Define a route to handle the homepage request
app.get('/', (req, res) => {
    // Send the HTML file for the homepage
    res.sendFile(__dirname + '/index.html');
});

// Define a route to handle a basic API request
app.get('/api', (req, res) => {
    // Respond with a simple "Hello World!"
    res.send('Hello World!');
});

// Define a route to get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // Respond with the entire array of pets as JSON
    res.json(pets);
});

// Define a route to get a pet by its owner using a query string
app.get('/api/v1/pets/owner', (req, res) => {
    // Get the owner from the query string of the request
    const owner = req.query.owner;

    // Find a pet in the pets array that matches the owner
    const pet = pets.find(pet => pet.owner === owner);

    // If a matching pet is found, respond with its details
    if (pet) {
        res.json(pet);
    } else {
        // If no matching pet is found, respond with a 404 error
        res.status(404).json({ error: 'Pet not found for the specified owner.' });
    }
});

// Define a route to get a pet by its name
app.get('/api/v1/pets/:name', (req, res) => {
    // Get the name from the URL parameter of the request
    const name = req.params.name;

    // Find a pet in the pets array that matches the name
    const pet = pets.find(pet => pet.name === name);

    // If a matching pet is found, respond with its details
    if (pet) {
        res.json(pet);
    } else {
        // If no matching pet is found, respond with a 404 error
        res.status(404).json({ error: 'Pet not found for the specified name.' });
    }
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

// Export the Express app for external use
module.exports = app;
