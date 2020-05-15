// Variables
const currencyElement_1 = document.getElementById('currency-one');
const currencyElement_2 = document.getElementById('currency-two');
const amountElement_1 = document.getElementById('amount-one');
const amountElement_2 = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch Exchange Rates & Update DOM
function calculate(){
	const currency_1 = currencyElement_1.value;
	const currency_2 = currencyElement_2.value;

	fetch(`https://api.exchangerate-api.com/v4/latest/${currency_1}`)
		.then(res => res.json())
		.then(data => {
			const rate = data.rates[currency_2];

			rateElement.innerText = `1 ${currency_1} = ${rate} ${currency_2}`;

			amountElement_2.value = (amountElement_1.value * rate).toFixed(2);
		})
}


// Event Listeners
currencyElement_1.addEventListener('change', calculate);
amountElement_1.addEventListener('input', calculate);
currencyElement_2.addEventListener('change', calculate);
amountElement_2.addEventListener('input', calculate);
swap.addEventListener('click', () => {
	const temp = currencyElement_1.value;
	currencyElement_1.value = currencyElement_2;
	currencyElement_2.value = temp;
	calculate();
});
calculate();