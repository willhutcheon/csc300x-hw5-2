"use strict";
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
const multer = require("multer");
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module

let categories = ['funnyJoke', 'lameJoke'];
let jokes = {
    'funnyJoke': [
        {
            'joke': 'Why did the student eat his homework?',
            'response': 'Because the teacher told him it was a piece of cake!'
        },
        {
            'joke': 'What kind of tree fits in your hand?',
            'response': 'A palm tree'
        },
        {
            'joke': 'What is worse than raining cats and dogs?',
            'response': 'Hailing taxis'
        }
    ],
    'lameJoke': [
        {
            'joke': 'Which bear is the most condescending?',
            'response': 'Pan-DUH'
        },
        {
            'joke': 'What would the Terminator be called in his retirement?',
            'response': 'The Exterminator'
        }
    ]
};

app.get("/jokebook/categories", function (req, res) {
    res.json(categories); // Respond with the list of joke categories
});

app.get("/jokebook/joke/:category", function (req, res) {
    const category = req.params.category;
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

    if (categories.includes(category)) {
        let categoryJokes = jokes[category];
        if (limit) {
            categoryJokes = categoryJokes.slice(0, limit);
        }
        res.json(categoryJokes);
    } else {
        res.status(400).json({ 'error': `no category listed for ${category}` });
    }
});

app.post("/jokebook/joke/new", function (req, res) {
    const { category, joke, response } = req.body;

    if (!category || !joke || !response || !categories.includes(category)) {
        return res.status(400).json({ 'error': 'invalid or insufficient user input' });
    }

    const newJoke = { joke, response }; // Create a new joke object

    jokes[category].push(newJoke); // Push the new joke to the category array

    res.json(jokes[category]); // Respond with the updated array of jokes for the category
});


app.get("/", function (req, res) {
    res.send("Hello, World from Express!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('Example app listening on port: ' + PORT + "!");
});
