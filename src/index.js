

// Get references to the tickets remaining and buy ticket button
const ticketsRemainingElement = document.getElementById('tickets-remaining');
const buyTicketButton = document.getElementById('buy-ticket');

// Retrieve the remaining tickets from localStorage or set to 467 if not found
let ticketsRemaining = localStorage.getItem('ticketsRemaining');
if (ticketsRemaining === null) {
  ticketsRemaining = 467; // Default value
} else {
  ticketsRemaining = parseInt(ticketsRemaining); // Convert from string to number
}

// Update the displayed tickets
ticketsRemainingElement.textContent = ticketsRemaining;

// Function to handle buying a ticket
function buyTicket() {
  if (ticketsRemaining > 0) {
    ticketsRemaining--; // Decrease the number of tickets
    ticketsRemainingElement.textContent = ticketsRemaining; // Update the display
    localStorage.setItem('ticketsRemaining', ticketsRemaining); // Save to localStorage

    // Update button text if tickets reach 0
    if (ticketsRemaining === 0) {
      buyTicketButton.textContent = 'Sold Out!';
      buyTicketButton.disabled = true; // Disable the button
    }

    alert('Jibambe mkuu!'); // Notify the user
  } else {
    alert('iza msee zoea iyo hali!'); // Notify the user if tickets are sold out
  }
}

// Add event listener to the button
buyTicketButton.addEventListener('click', buyTicket);

// Update button text on page load if tickets are already 0
if (ticketsRemaining === 0) {
  buyTicketButton.textContent = 'Sold Out!';
  buyTicketButton.disabled = true; // Disable the button
}
// Fetch movie data from db.json
function fetchMovies() {
  fetch('http://localhost:3000/movies')
    .then((response) => response.json())
    .then((movies) => {
      const movieList = document.querySelector('.movie-list');
      movieList.innerHTML = ''; // Clear existing list

      // Populate the list with movies
      movies.forEach((movie) => {
        const movieItem = document.createElement('div');
        movieItem.innerHTML = `
          ${movie.name}
          <button class="delete-button">Delete</button>
        `;
        movieList.appendChild(movieItem);
      });

      // Add event listeners to delete buttons
      const deleteButtons = document.querySelectorAll('.delete-button');
      deleteButtons.forEach((button) => {
        button.addEventListener('click', deleteMovie);
      });
    })
    .catch((error) => {
      console.error('Error fetching movies:', error);
    });
}

// Call fetchMovies to load the movie list when the page loads
fetchMovies();