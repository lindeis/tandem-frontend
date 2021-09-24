import { userLabel, username, passwordLabel, password, initLoginForm } from './yeti.js';
import { confirmPassword, initRegisterForm } from "./yetiRegister.js";
import { message, img, usernameRequired, passwordRequired, usernameAlert, passwordAlert, appendError, removeError } from "./validate.js";

var confirmPasswordLabel = document.querySelector('#confirmPasswordLabel');
let confirmPasswordAlert = img.cloneNode();
let confirmPasswordRequired = message.cloneNode(true);
confirmPasswordRequired.innerHTML = 'Required';
let usernameTooShort = message.cloneNode(true);
usernameTooShort.innerHTML = 'Minimum 3 characters';
let passwordTooShort = message.cloneNode(true);
passwordTooShort.innerHTML = 'Minimum 5 characters';
let passwordsDoNotMatch = message.cloneNode(true);
passwordsDoNotMatch.innerHTML = 'Does not match';
let usernameInvalid = message.cloneNode(true);
usernameInvalid.innerHTML = 'Contains invalid character';
let passwordInvalid = message.cloneNode(true);
passwordInvalid.innerHTML = 'Contains invalid character';

let confirmPasswordClicked = false;

function isUsernameValid() {
    const regex = /^[a-zA-Z0-9._]+$/;
    return regex.test(username.value);
}

function isPasswordValid() {
    const regex = /^[a-zA-Z0-9 !\"#$%&'()*+,-./:;<=>?@^_`{|}~]+$/;
    return regex.test(password.value);
}

function updateUsernameError() {
    removeError(userLabel, usernameAlert, usernameRequired);
    removeError(userLabel, usernameAlert, usernameTooShort);
    removeError(userLabel, usernameAlert, usernameInvalid);
    if (username.value == '') {
        appendError(userLabel, usernameAlert, usernameRequired);
    } else if (!isUsernameValid()) {
        appendError(userLabel, usernameAlert, usernameInvalid);
    } else if (username.value.length < 3) {
        appendError(userLabel, usernameAlert, usernameTooShort);
    }
}

function updatePasswordError() {
    removeError(passwordLabel, passwordAlert, passwordRequired);
    removeError(passwordLabel, passwordAlert, passwordTooShort);
    removeError(passwordLabel, passwordAlert, passwordInvalid);
    if (password.value == '') {
        appendError(passwordLabel, passwordAlert, passwordRequired);
    } else if (!isPasswordValid()) {
        appendError(passwordLabel, passwordAlert, passwordInvalid);
    } else if (password.value.length < 5) {
        appendError(passwordLabel, passwordAlert, passwordTooShort);
    }
}

function updateConfirmPasswordError() {
    if (confirmPasswordClicked == true) {
        removeError(confirmPasswordLabel, confirmPasswordAlert, confirmPasswordRequired);
        removeError(confirmPasswordLabel, confirmPasswordAlert, passwordsDoNotMatch);
        if (confirmPassword.value == '') {
            appendError(confirmPasswordLabel, confirmPasswordAlert, confirmPasswordRequired);
        } else if (password.value != confirmPassword.value) {
            appendError(confirmPasswordLabel, confirmPasswordAlert, passwordsDoNotMatch)
        }
    }
}

function validateRegister() {
    username.addEventListener('blur', updateUsernameError);
    username.addEventListener('input', updateUsernameError);
    password.addEventListener('blur', updatePasswordError);
    password.addEventListener('input', updatePasswordError);
    password.addEventListener('blur', updateConfirmPasswordError);
    password.addEventListener('input', updateConfirmPasswordError);
    confirmPassword.addEventListener('blur', updateConfirmPasswordError);
    confirmPassword.addEventListener('input', updateConfirmPasswordError);
    confirmPassword.addEventListener('focus', function () {
        confirmPasswordClicked = true;
    })
}

window.onload = function () {
    initLoginForm();
    initRegisterForm();
    validateRegister();
};