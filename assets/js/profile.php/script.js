const button = document.querySelector('.password-button');
button.addEventListener('click', () => {
    let div = document.querySelector('.password-change');
    div.classList.toggle('hide');
})