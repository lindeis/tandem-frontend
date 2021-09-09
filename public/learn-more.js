function changeBtnImg() {
    if (document.getElementById('learn-more').getAttribute('aria-expanded') == 'true') {
        img = 'assets/caret-down.svg';
    } else {
        img = 'assets/caret-up.svg';
    }

    document.getElementById('collapseImg').src = img;
}

document.getElementById('learn-more').addEventListener('click', changeBtnImg);