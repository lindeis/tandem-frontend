import { frontend, backend } from './host.js';
import { alert, img, message } from '/alert.js';

async function register() {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const confirmPassword = document.getElementById("confirmPassword").value;

	alert.classList.add('alert-danger');
	img.src = 'assets/exclamation-triangle-fill.svg';

	if (password !== confirmPassword) {
		message.innerHTML = 'Passwords do not match';
		document.body.appendChild(alert);
		return;
	}

	event.preventDefault();

	const response = await fetch(backend("register"), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'username': username,
			'password': password
		})
	})

	const responseJson = await response.json();

	if (response.ok) {
		window.location.href = frontend("login", {
			"redirectedFrom": "register"
		});
	}
	if (response.status === 400) {
		message.innerHTML = 'Please fill in all fields';
		document.body.appendChild(alert);
	}
	if (response.status === 409) {
		message.innerHTML = 'Username already taken'
		document.body.appendChild(alert);
	}
}

const registerButton = document.getElementById('register');

registerButton.addEventListener('click', register);