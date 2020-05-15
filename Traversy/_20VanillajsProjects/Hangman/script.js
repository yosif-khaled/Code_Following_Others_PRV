// Grabbing DOM elements
const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgianBtn = document.getElementById('play-button');
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
	wrongLettersElement.innerHTML = `
		${wrongLetters.length > 0 ? '<p>wrong</p>' : ''}
		${wrongLetters.map(letter => `<span>${letter}</span>`)}
	`;

	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if(index < errors){
			part.style.display  = 'block';
		} else {
			part.style.display = 'none';
		}

	if(wrongLetters.length === figureParts.length){
		finalMessage.innerText = 'Unfortunatly You LOST!!';
		popup.style.display = 'flex';
	}
	})
}

// Show Notification
function showNotification(){
	notification.classList.add('show');
	setTimeout(() =>{notification.classList.remove('show')}, 2000);
}


// Reading Keys
window.addEventListener('keydown', event => {

	if(event.keyCode >= 65 && event.keyCode <= 90){
		const letter = event.key;

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
});

// Restart Game
playAgianBtn.addEventListener('click', () =>{
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)]

	displayWord();

	updateWrongLettersElement();

	popup.style.display = 'none';
});

console.log(wrongLetters);
console.log(correctLetters);

displayWord();