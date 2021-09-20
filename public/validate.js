import { userLabel, username, passwordLabel, password } from './yeti.js';

let required = document.createElement('a');
required.style.fontSize = '0.75em';
required.style.color = 'red';
required.style.paddingLeft = '10px';
required.innerHTML = 'Required';
let usernameRequired = required.cloneNode(true);
let passwordRequired = required.cloneNode(true);

let alert = document.createElement('img');
alert.src = 'assets/exclamation-triangle-fill.svg';
alert.style.paddingLeft = '10px';
alert.style.paddingBottom = '3px';
let usernameAlert = alert.cloneNode(true);
let passwordAlert = alert.cloneNode(true);

let usernameAlertVisible = false;
let passwordAlertVisible = false;

function appendUsernameAlert() {
    if (username.value == '') {
        userLabel.appendChild(usernameAlert);
        userLabel.appendChild(usernameRequired);
        usernameAlertVisible = true;
    }
}

function removeUsernameAlert() {
    if (usernameAlertVisible == true) {
        userLabel.removeChild(usernameAlert);
        userLabel.removeChild(usernameRequired);
        usernameAlertVisible = false;
    }
}

function appendPasswordAlert() {
    if (password[0].value == '') {
        passwordLabel.appendChild(passwordAlert);
        passwordLabel.appendChild(passwordRequired);
        passwordAlertVisible = true;
    }
}

function removePasswordAlert() {
    if (passwordAlertVisible == true) {
        passwordLabel.removeChild(passwordAlert);
        passwordLabel.removeChild(passwordRequired);
        passwordAlertVisible = false;
    }
}

username.addEventListener('blur', appendUsernameAlert);
username.addEventListener('input', removeUsernameAlert);
password[0].addEventListener('blur', appendPasswordAlert);
password[0].addEventListener('input', removePasswordAlert);