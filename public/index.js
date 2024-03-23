document.getElementById("newJokeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this); // Get form data
    const newJoke = {}; // Create an object to store the form data

    // Populate the newJoke object with form data
    formData.forEach((value, key) => {
        newJoke[key] = value;
    });

    // Send a POST request to the server with the new joke data
    fetch("/jokebook/joke/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newJoke)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to add new joke');
        }
    })
    .then(data => {
        console.log("New joke added:", data);
        alert("New joke added successfully!");

        // Update HTML to display the new joke
        const category = data.category; // Assuming the server sends back the category of the new joke
        const newJokeHTML = `<p><strong>Category:</strong> ${category}</p>
                             <p><strong>Joke:</strong> ${data.joke}</p>
                             <p><strong>Response:</strong> ${data.response}</p>`;

        const jokesContainer = document.getElementById(`${category}JokesContainer`); // Replace "category" with actual category ID or class
        jokesContainer.insertAdjacentHTML('beforeend', newJokeHTML);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to add new joke. Please try again.");
    });
});