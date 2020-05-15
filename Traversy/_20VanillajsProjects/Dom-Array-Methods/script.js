// Grabbing Elements
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// An Array of Objects that will carry our Data
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch Random User and Add Money
async function getRandomUser(){
	const response = await fetch('https://randomuser.me/api');
	const data = await response.json();
	// what we need from the results array from returned data
	const user = data.results[0];

	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000)
	};

	addData(newUser);
}

// Adding newUser to Data Array
function addData(object){
	// data is the array created at the beginning of the file
	data.push(object);

	updateDom();
}

// Updating the Dom
function updateDom(providedData = data){
	// Clearing the Main Div
	main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

	providedData.forEach(item => {
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
		main.appendChild(element);
	});
}

// Formatting Wealth
function formatMoney(number){
	return `$` + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Doubling the Money
function doubleMoney(){
	data = data.map((user) => {
		return{ ...user, money: user.money*2 }
	});
	updateDom();
}

// Sort by Richest
function sortByRichest(){
	data.sort((a, b) => b.money - a.money);
	updateDom();
}

// Show ONLY Millionaires
function showMillionaires(){
	data = data.filter(user => user.money > 1000000);
	updateDom();
}

// Calculating Wealth
function calculateWealth(){
	const wealth = data.reduce((accumelator, user) => (accumelator += user.money), 0);
	const wealthElement = document.createElement('div');
	wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
	main.appendChild(wealthElement);
}

//Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);