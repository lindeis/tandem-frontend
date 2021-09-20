function successfulRegistration() {
    let alert = document.createElement('div');
    alert.classList.add('alert');
    alert.classList.add('alert-success');
    alert.classList.add('d-flex');
    alert.setAttribute('role', 'alert');
    alert.style.marginTop = '10vh';
    alert.style.marginLeft = '50%';
    alert.style.transform = 'translate(-50%, -50%)';
    alert.style.width = '400px';
    document.body.appendChild(alert);

    let img = document.createElement('img');
    img.src = 'assets/check-circle-fill.svg';
    alert.appendChild(img);
    
    let message = document.createElement('div');
    message.style.paddingLeft = '3%';
    message.innerHTML = 'Registration successful! You can now login.';
    alert.appendChild(message);
}

if (window.location.href === 'http://localhost:3000/login?redirectedFrom=register') {
    successfulRegistration();
}