import { userLabel, username, passwordLabel, password } from './yeti.js';

let message = document.createElement('a');
message.style.fontSize = '0.8em';
message.style.color = 'red';
message.style.paddingLeft = '10px';
let usernameRequired = message.cloneNode(true);
usernameRequired.innerHTML = 'Required';
let passwordRequired = message.cloneNode(true);
passwordRequired.innerHTML = 'Required';

let img = document.createElement('img');
img.src = 'assets/exclamation-triangle-fill.svg';
img.setAttribute('width', '24');
img.setAttribute('height', '24');
img.style.paddingLeft = '10px';
img.style.paddingBottom = '0.5%';
let usernameAlert = img.cloneNode();
let passwordAlert = img.cloneNode();

function appendAlert(label, alert, error) {
    label.appendChild(alert);
    label.appendChild(error);
}

function removeAlert(label, alert, error) {
    if (error.parentElement === label) {
        label.removeChild(alert);
        label.removeChild(error);
    }

}

function appendUsernameAlert() {
    if (username.value == '') {
        appendAlert(userLabel, usernameAlert, usernameRequired);
    }
}

function removeUsernameAlert() {
    removeAlert(userLabel, usernameAlert, usernameRequired);
}

function appendPasswordAlert() {
    if (password.value == '') {
        appendAlert(passwordLabel, passwordAlert, passwordRequired);
    }
}

function removePasswordAlert() {
    removeAlert(passwordLabel, passwordAlert, passwordRequired);
}

username.addEventListener('blur', appendUsernameAlert);
username.addEventListener('input', removeUsernameAlert);
password.addEventListener('blur', appendPasswordAlert);
password.addEventListener('input', removePasswordAlert);

export { message, img, usernameAlert, passwordAlert, appendAlert, removeAlert };