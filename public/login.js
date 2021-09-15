import {frontend, backend} from './host.js';

async function postLogin() {

    let username = document.getElementById('username');
    let password = document.getElementById('password');

    const response = await fetch(backend("login"), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'username': username.value, 'password': password.value })
    })

    let responseObj = await response.json();

    if (response.status === 200) {
        localStorage.setItem('tandem-token', responseObj.token);
        window.location.href = frontend("lobby");
    }

    let error = document.getElementById('error');
    error.style.color = 'red';
    error.style.textAlign = 'center';

    if (response.status === 401) {
        error.innerText = 'Wrong username or password!';
    }

    if (response.status === 400) {
        let required = document.getElementsByClassName('required')
        for (let i = 0; i < required.length; i++) {
            required[i].style.color = 'red';
            required[i].innerText = ' *';
        }
        error.innerText = 'Please fill in all the required fields!';
    }
}

let loginButton = document.getElementById('login');

loginButton.addEventListener('click', postLogin);