// Grabbing DOM elements
const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgianBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

// Figure Parts
const figureParts = document.querySelectorAll('.figure-part');

// Words
const words = ['application', 'programming', 'interface', 'wizard'];

// Pcking a Random Word
let selectedWord = words[Math.floor(Math.random()*words.length)];


// Letters
const correctLetters = [];
const wrongLetters = [];

//Functions
// Showing Hidden Word
function displayWord() {
	wordElement.innerHTML = `
	${selectedWord
		.split('')
		.map(letter => `
		<span class="letter">
			${correctLetters.includes(letter) ? letter : ''}
		</span>
		`
		).join('')}
	`;

	const innerWord = wordElement.innerText.replace(/\n/g, '');

	if(innerWord === selectedWord){
		finalMessage.innerText = 'Congratulations! You Won!';
		popup.style.display = 'flex';
	}
}

// Updating Wrong Letter Element
function updateWrongLettersElement(){
	console.log('Update Wrong Letters');
}

// Show Notification
function showNotification(){
	notification.classList.add('show');
	setTimeout(() =>{notification.classList.remove('show')}, 2000);
}


// Reading Keys
window.addEventListener('keydown', event => {
	const letter = event.key;
	if(event.keyCode >= 65 && event.keyCode <= 90){
		console.log(letter);
	 	if(selectedWord.includes(letter)){

	 		if(!correctLetters.includes(letter)){
	 			correctLetters.push(letter);
	 			displayWord();
	 		} else {
	 			showNotification();
	 		}
	 	} else {
		  if(!wrongLetters.includes(letter)){
		 		wrongLetters.push(letter);
		 		updateWrongLettersElement();
		 	} else {
		 		showNotification();
		 	}
	 	}
	}
})

console.log(wrongLetters);
console.log(correctLetters);

displayWord();