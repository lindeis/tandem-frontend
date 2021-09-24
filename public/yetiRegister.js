import { showPasswordCheck, onPasswordFocus, onPasswordBlur, onPasswordToggleChange, initLoginForm } from "./yeti.js";

var confirmPassword = document.querySelector('#confirmPassword');

function initRegisterForm() {
    confirmPassword.addEventListener('focus', onPasswordFocus);
    confirmPassword.addEventListener('blur', onPasswordBlur);
    showPasswordCheck.addEventListener('change', function () { onPasswordToggleChange(event, confirmPassword); });
}

window.onload = function () {
    initLoginForm();
    initRegisterForm();
};

export { confirmPassword, initRegisterForm };