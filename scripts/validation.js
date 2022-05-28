function checkLetter(key) {
	if (specialCharacters(key)) {
		warning.textContent = "No pueden ingresarse caracteres especiales!";
		return false;
	} else if (punctuation(key)) {
		warning.textContent = "No valen las letras con acentos!";
		return false;
	} else if (lowerCase(key)) {
		warning.textContent = "Las letras deben estar en mayusculas!";
		return false;
	} else if (number(key)) {
		warning.textContent = "No puede ingresarse un número";
		return false;
	} else {
		return true;
	}
}

function specialCharacters(key) {
	var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

	if (format.test(key)) {
		return true;
	} else {
		return false;
	}
}

function punctuation(key) {
	var format = /[áéíóú]+/;

	if (format.test(key)) {
		return true;
	} else {
		return false;
	}
}

function lowerCase(key) {
	if (/[a-z]/.test(key)) {
		return true;
	}
}

function number(key) {
	if (/[1-9]/.test(key)) {
		return true;
	}
}