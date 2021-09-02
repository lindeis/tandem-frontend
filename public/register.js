async function register() {
	let error = false;
	const username = document.getElementById("username").value;
	const pw1 = document.getElementById("password1").value;
	const pw2 = document.getElementById("password2").value;
	let errorMessage = ""
	if (!(pw1 === pw2)) {
		errorMessage += "The passwords are not matching.\n";
		error = true;
	} else if (pw1.length < 3) {
		errorMessage += "The password is too short.\n";
		error = true;
	}
	if (username.length < 3) {
		errorMessage += "The username is too short.\n";
		error = true;
	}

	if (!error) {
		const response = await fetch("http://localhost:8080/register", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'username': username,
				'password': pw1
			})
		});
		const responseJson = await response.json();
		if (response.ok) {
			errorMessage += "User " + responseJson.username + " was created successfully";
		} else {
			errorMessage += responseJson.message;
		}
	}

	document.getElementById("message").innerHTML = errorMessage;
}