import { showPasswordCheck, onPasswordFocus, onPasswordBlur, onPasswordToggleChange } from "./yeti.js";

var confirmPassword = document.querySelector('#confirmPassword');

confirmPassword.addEventListener('focus', onPasswordFocus);
confirmPassword.addEventListener('blur', onPasswordBlur);
showPasswordCheck.addEventListener('change', function () { onPasswordToggleChange(event, confirmPassword); });