import { confirmPassword } from "./yetiRegister.js";
import { required, img } from "./validate.js";

var confirmPasswordLabel = document.querySelector('#confirmPasswordLabel');
let confirmPasswordRequired = required.cloneNode(true);
let confirmPasswordAlert = img.cloneNode();
let confirmPasswordAlertVisible = false;

function appendConfirmPasswordAlert() {
    if (confirmPassword.value == '') {
        confirmPasswordLabel.appendChild(confirmPasswordAlert);
        confirmPasswordLabel.appendChild(confirmPasswordRequired);
        confirmPasswordAlertVisible = true;
    }
}

function removeConfirmPasswordAlert() {
    if (confirmPasswordAlertVisible == true) {
        confirmPasswordLabel.removeChild(confirmPasswordAlert);
        confirmPasswordLabel.removeChild(confirmPasswordRequired);
        confirmPasswordAlertVisible = false;
    }
}

confirmPassword.addEventListener('blur', appendConfirmPasswordAlert);
confirmPassword.addEventListener('input', removeConfirmPasswordAlert);