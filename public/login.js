import { frontend, backend } from './host.js';
import { alert, img, message } from './alert.js';

async function login() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    event.preventDefault();

    const response = await fetch(backend("login"), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'username': username.value,
            'password': password.value
        })
    })

    const responseJson = await response.json();

    alert.classList.add('alert-danger');
    img.src = 'assets/exclamation-triangle-fill.svg';

    if (response.ok) {
        localStorage.setItem('tandem-token', responseJson.token);
        window.location.href = frontend("lobby");
    }
    if (response.status === 400) {
        message.innerHTML = "Please fill in all fields";
        document.body.appendChild(alert);
    }
    if (response.status === 401) {
        message.innerHTML = "Wrong username or password";
        document.body.appendChild(alert);
    }
}

const loginButton = document.getElementById('login');

loginButton.addEventListener('click', login);