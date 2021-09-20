import {frontend, backend} from './host.js';

async function register() {
	const username = document.getElementById("username").value;
	const pw1 = document.getElementById("password").value;
	const pw2 = document.getElementById("confirmPassword").value;

	let error = document.getElementById('error');
	error.style.color = 'red';
	error.style.textAlign = 'center';
	if (pw1 !== pw2) {
		error.innerText = "The passwords are not matching.";
		return;
	}

	event.preventDefault();	// Prevents the submit button from reloading the page and possibly iterrupting the fetch

	const response = await fetch(backend("register"), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'username': username,
			'password': pw1
		})
	})

	const responseJson = await response.json();
	if (response.ok) {
		window.location.href = frontend("login", {
			"redirectedFrom": "register"
		});
	} else {
		error.innerText = responseJson.message;
	}
}

let registerButton = document.getElementById('register');

registerButton.addEventListener('click', register)