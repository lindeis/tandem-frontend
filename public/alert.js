let alert = document.createElement('div');
alert.classList.add('alert');
alert.classList.add('d-flex');
alert.classList.add('align-items-center');
alert.setAttribute('role', 'alert');
alert.style.top = '10vh';
alert.style.left = '50%';
alert.style.transform = 'translate(-50%)';
alert.style.width = '400px';

let img = document.createElement('img');

let message = document.createElement('div');
message.style.paddingLeft = '3%';
message.style.paddingTop = '1%';

alert.appendChild(img);
alert.appendChild(message);

function successfulRegistration() {
    alert.classList.add('alert-success');
    img.src = 'assets/check-circle-fill.svg';
    message.innerHTML = 'Registration successful! You can now login.';
    document.body.appendChild(alert);
}

if (window.location.href === 'http://localhost:3000/login?redirectedFrom=register') {
    successfulRegistration();
}

export { alert, img, message };