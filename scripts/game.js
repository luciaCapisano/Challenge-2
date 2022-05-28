const canvas = document.getElementById('hangman');
const context = canvas.getContext("2d");
let warning = document.querySelector('.warning');
let wrong = document.querySelector('.wrong-letters');
let correctLettersDiv = document.querySelector('.correct-letters-div');
let correctLetterLines = document.querySelector('.correct-letters-lines-div');
let displayLetters = document.querySelector('.letters');
let wordList = ["HOLA", "CHAU", "MAÑANA", "SALUDO", "CUMPLEAÑOS"];
let wrongLetters = [];
let letrasUsadas = [];
let correctLetters = [];
let secretWord = "";
let secretArray = [];
let errorsLeft = 6;
let errores = 0;
var step = 0;


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


function drawLinesCanvas(lines) {
	x = 50;
	i = 0;
	while (i < lines) {
		context.strokeStyle = '#444';
		context.lineWidth = 5;
		let space = i * 10;
		context.beginPath();
		context.moveTo(x, 350);
		context.lineTo((x + 50), 350);
		context.stroke();
		x += 70;
		i++;
	}
}

function drawLinesSpan(lines) {
	i = 1;
	while (i < lines) {
		let spanLetter = document.createElement("span");
		correctLetterLines.appendChild(spanLetter).classList.add('correct-letter-span');
		i++;
	}
}

function drawLineDivs(){
	i = 0;
	while (i < secretWord.length) {
		let divLetter = document.createElement("div");
		divLetter.classList.add('correct-letter-div'); 
		correctLetterLines.appendChild(divLetter);

		let spanLetter = document.createElement("span");
		correctLetterLines.appendChild(spanLetter).classList.add('correct-letter-span');

		i++;
	}
}

function displayCorrectLetters() {
	correctLetters.forEach((letter) => {
		let li = document.createElement("li");
		li.textContent = letter;
		displayLetters.appendChild(li);
	})
}

function agregarLetra(letter){
    let i = secretWord.indexOf(letter);



	alert(i);
    const guiones = document.querySelectorAll(".correct-letter-div");
    if(i != -1){
        letrasUsadas.push(letter);
		alert("i = " + i);


        while(i != -1){
            guiones[i].innerHTML = letter;
            errorsLeft --;
            aux = i + 1;
            i =  secretWord.indexOf(letter, aux);
        }
        if(errorsLeft == 0){
            gameOver();
        }

    }else{
        wrongLetters.push(letter);
		wrong.textContent = wrongLetters;
			drawNext();
        errores++;
      
    }
    if(errorsLeft == 0){
        gameOver();
    }
}


function gameOver(){
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
	if (secretWord.includes(letter)) {
		correctLetters.push(letter, secretWord.indexOf(letter));
		displayLetters.textContent = "";
		displayCorrectLetters();
	} else {
		if (!wrongLetters.includes(letter)) {
			wrongLetters.push(letter);
			wrong.textContent = wrongLetters;
			drawNext();
		}
	}
}


function checkPositionLetter(letter) {

	//secretWord.indexOf(letter);

	console.log(secretWord.indexOf(letter));

}

function addWrongLetters(letter) {


}

function addWord() {
	wordList.push();
}


function startNewGame() {
	draw("gallows");
	secretWord = pickWord();
	wrongLetters = [];
	secretArray = Array.from(secretWord);
	correctLettersDiv.innerHTML = "";
	correctLetterLines.innerHTML = "";
	wrongLetters.innerHTML = "";
	drawLineDivs();
}

startNewGame();

document.addEventListener('keypress', (event) => {
	let letter = event.key;
	if (checkLetter(letter)) {
		agregarLetra(letter);

		//checkCorrectLetter(letter);
	};

});



const next = document.getElementById('next').addEventListener('click', drawNext);
document.getElementById('reset').addEventListener('click', reset);
