function successfulRegistration() {
    let alert = document.createElement('div');
    alert.classList.add('alert');
    alert.classList.add('alert-success');
    alert.classList.add('d-flex');
    alert.classList.add('align-items-center');
    alert.setAttribute('role', 'alert');
    alert.style.marginTop = '3%';
    document.body.appendChild(alert);

    let img = document.createElement('img');
    img.src = 'assets/check-circle-fill.svg';
    alert.appendChild(img);
    
    let message = document.createElement('div');
    message.style.paddingLeft = '1%';
    message.innerHTML = 'Registration successful! You can now login.';
    alert.appendChild(message);
}

if (window.location.href === 'http://localhost:3000/login?redirectedFrom=register') {
    successfulRegistration();
}