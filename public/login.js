import { frontend, backend } from './host.js';
import { alert, img, message } from './alert.js';

async function postLogin() {

    let username = document.getElementById('username');
    let password = document.getElementById('password');

    event.preventDefault(); // Prevents the submit button from reloading the page and possibly iterrupting the fetch

    const response = await fetch(backend("login"), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'username': username.value, 'password': password.value })
    })

    let responseJson = await response.json();

    alert.classList.add('alert-danger');
    img.src = 'assets/exclamation-triangle-fill.svg';

    if (response.status === 200) {
        document.body.removeChild(alert);
        localStorage.setItem('tandem-token', responseJson.token);
        window.location.href = frontend("lobby");
    }

    if (response.status === 401) {
        message.innerHTML = "Wrong username or password!";
        document.body.appendChild(alert);
    }

    if (response.status === 400) {
        message.innerHTML = "Fill all fields!";
        document.body.appendChild(alert);
    }
}

let loginButton = document.getElementById('login');

loginButton.addEventListener('click', postLogin);