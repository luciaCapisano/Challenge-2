const canvas = document.getElementById('hangman');
const context = canvas.getContext("2d");
let warning = document.querySelector('.warning');
let wrong = document.querySelector('.wrong-letters');
let correctLetterLinesDiv = document.querySelector('.correct-letters-lines-div');
let wordList = ["HOLA", "CHAU", "MAÑANA", "SALUDO", "CUMPLEAÑOS"];
let wrongLetters = [];
//let usedLetters = [];
let correctLetters = [];
let secretWord = "";
//let secretArray = [];
let errorsLeft = 6;
let step = 0;

clearCanvas = () => {
	context.clearRect(0, 0, canvas.width, canvas.height)
}

draw = (part) => {
	switch (part) {
		case 'gallows':
			context.strokeStyle = '#000000';
			context.lineWidth = 10;
			context.beginPath();
			context.moveTo(175, 225);
			context.lineTo(5, 225);
			context.moveTo(40, 225);
			context.lineTo(25, 5);
			context.lineTo(100, 5);
			context.lineTo(100, 25);
			context.stroke();
			break;

		case 'head':
			context.lineWidth = 5;
			context.beginPath();
			context.arc(100, 50, 25, 0, Math.PI * 2, true);
			context.closePath();
			context.stroke();
			break;

		case 'body':
			context.beginPath();
			context.moveTo(100, 75);
			context.lineTo(100, 140);
			context.stroke();
			break;

		case 'rightHarm':
			context.beginPath();
			context.moveTo(100, 85);
			context.lineTo(60, 100);
			context.stroke();
			break;

		case 'leftHarm':
			context.beginPath();
			context.moveTo(100, 85);
			context.lineTo(140, 100);
			context.stroke();
			break;

		case 'rightLeg':
			context.beginPath();
			context.moveTo(100, 140);
			context.lineTo(80, 190);
			context.stroke();
			break;

		case 'leftLeg':
			context.beginPath();
			context.moveTo(100, 140);
			context.lineTo(125, 190);
			context.stroke();
			break;
	}
}

const draws = [
	'head',
	'body',
	'rightHarm',
	'leftHarm',
	'rightLeg',
	'leftLeg'
]

function drawNext() {
	draw(draws[step++])
	if (undefined === draws[step]) this.disabled = true;
};

function drawLineDivs() {
	i = 0;
	while (i < secretWord.length) {
		let spanLetter = document.createElement("span");
		spanLetter.classList.add('correct-letter-span');
		correctLetterLinesDiv.appendChild(spanLetter);
		let spanLine = document.createElement("span");
		spanLine.classList.add('correct-line-span');
		correctLetterLinesDiv.appendChild(spanLine);
		i++;
	}
}

function gameOver() {
	alert("Se termino el juego");
}

function reset() {
	clearCanvas();
	step = 0;
	startNewGame();

	//next.disabled = false;
}

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function pickWord() {
	let position = randomBetween(0, wordList.length);
	console.log(wordList[position]);
	return wordList[position];
}

function checkCorrectLetter(letter) {
	let i = secretWord.indexOf(letter);

	const lines = document.querySelectorAll(".correct-letter-span");
	if (i != -1) {
		correctLetters.push(letter);

		while (i != -1) {
			lines[i].innerHTML = letter;
			errorsLeft--;
			aux = i + 1;
			i = secretWord.indexOf(letter, aux);
		}
		if (errorsLeft == 0) {
			gameOver();
		}

	} else {
		if (!wrongLetters.includes(letter)) {
			wrongLetters.push(letter);
			wrong.textContent = wrongLetters;
			drawNext();
		}
	}

	if (errorsLeft == 0) {
		gameOver();
	}

	if(wrongLetters.length == 6){
		gameOver();
	}
}


function startNewGame() {
	draw("gallows");
	secretWord = pickWord();
	wrongLetters = [];
	//secretArray = Array.from(secretWord);
	correctLetterLinesDiv.innerHTML = "";
	wrongLetters.innerHTML = "";
	drawLineDivs();
}

document.addEventListener('keypress', (event) => {
	let letter = event.key;
	if (validateLetter(letter)) {
		checkCorrectLetter(letter);
	};

});


const next = document.getElementById('next').addEventListener('click', drawNext);
document.getElementById('reset').addEventListener('click', reset);

startNewGame();
