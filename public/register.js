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

	const response = await fetch("http://localhost:8080/register", {
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
		window.location.href = 'http://localhost:3000/login';
	}

	if (response.status === 422) {
		error.innerText = responseJson.message;
	}

	if (response.status === 409) {
		error.innerText = responseJson.message;
	}
}

let registerButton = document.getElementById('register');

registerButton.addEventListener('click', register)