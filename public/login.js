async function postLogin() {

    let username = document.getElementById('username');
    let password = document.getElementById('password');

    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'username': username.value, 'password': password.value})
    })

    let responseObj = await response.json();

    if (response.status === 200) {
        localStorage.setItem('tandem-token', responseObj.token);
    }

    let error = document.getElementById('error');

    if (response.status === 401) {
        error.innerText = 'Wrong username or password!';
    }

    if (response.status === 400) {
        error.innerText = 'Please fill in all the required fields!';
    }
}