// Variables
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // adds all seats and add them in a node list
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = parseInt(movieSelect.value);

// Functions
// Save Selected Movie Index and Price
function setMovieData(movieIndex, moviePrice){
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
function updateSelectedCount(){
	const selectedSeats = document.querySelectorAll('.row .seat.selected');

	const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	console.log(seatsIndex);

	const selectedSeatsCount = selectedSeats.length;
	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount*ticketPrice;
}

// Populate UI from Local Storage Data
function populateUI(){
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

	if(selectedSeats !== null && selectedSeats.length > 0){
		seats.forEach((seat, index) => {
			if(selectedSeats.indexOf(index) > -1){
				seat.classList.add("selected");
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

	if(selectedMovieIndex !== null){
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

// Event Listener
// Movie Select Event
movieSelect.addEventListener('change', event => {
	ticketPrice = parseInt(event.target.value);
	setMovieData(event.target.selectedIndex, event.target.value);
	updateSelectedCount();
})

// Seat Click Event
container.addEventListener('click', (event) => {
	// event.target shows you which element you click on
	if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')){
		event.target.classList.toggle('selected');
		//updating count
		updateSelectedCount();
	}
})

// Set Initial Count and Total
updateSelectedCount();