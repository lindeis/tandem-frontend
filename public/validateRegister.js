import { userLabel, username, passwordLabel, password } from './yeti.js';
import { confirmPassword } from "./yetiRegister.js";
import { message, img, usernameAlert, passwordAlert, appendAlert, removeAlert } from "./validate.js";

var confirmPasswordLabel = document.querySelector('#confirmPasswordLabel');
let confirmPasswordAlert = img.cloneNode();
let confirmPasswordRequired = message.cloneNode(true);
confirmPasswordRequired.innerHTML = 'Required';
let usernameTooShort = message.cloneNode(true);
usernameTooShort.innerHTML = 'Minimum 3 characters';
let passwordTooShort = message.cloneNode(true);
passwordTooShort.innerHTML = 'Minimum 5 characters';

function appendUsernameAlert() {
    if (username.value.length < 3 && username.value != '') {
        appendAlert(userLabel, usernameAlert, usernameTooShort);
    }
}

function removeUsernameAlert() {
    if (username.value.length > 2) {
        removeAlert(userLabel, usernameAlert, usernameTooShort);
    }
}

function appendPasswordAlert() {
    if (password.value.length < 5 && password.value != '') {
        appendAlert(passwordLabel, passwordAlert, passwordTooShort);
    }
}

function removePasswordAlert() {
    if (password.value.length > 4) {
        removeAlert(passwordLabel, passwordAlert, passwordTooShort);
    }
}

function appendConfirmPasswordAlert() {
    if (confirmPassword.value == '') {
        appendAlert(confirmPasswordLabel, confirmPasswordAlert, confirmPasswordRequired);
    }
}

function removeConfirmPasswordAlert() {
    removeAlert(confirmPasswordLabel, confirmPasswordAlert, confirmPasswordRequired);
}

username.addEventListener('blur', appendUsernameAlert);
username.addEventListener('input', removeUsernameAlert);
password.addEventListener('blur', appendPasswordAlert);
password.addEventListener('input', removePasswordAlert);
confirmPassword.addEventListener('blur', appendConfirmPasswordAlert);
confirmPassword.addEventListener('input', removeConfirmPasswordAlert);