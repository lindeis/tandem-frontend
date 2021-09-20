import { userLabel, username, passwordLabel, password } from './yeti.js';

let required = document.createElement('a');
required.style.fontSize = '0.8em';
required.style.color = 'red';
required.style.paddingLeft = '10px';
required.innerHTML = 'Required';
let usernameRequired = required.cloneNode(true);
let passwordRequired = required.cloneNode(true);

let img = document.createElement('img');
img.src = 'assets/exclamation-triangle-fill.svg';
img.setAttribute('width', '24');
img.setAttribute('height', '24');
img.style.paddingLeft = '10px';
img.style.paddingBottom = '0.5%';
let usernameAlert = img.cloneNode(true);
let passwordAlert = img.cloneNode(true);

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