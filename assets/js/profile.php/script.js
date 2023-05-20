const passwordButton = document.querySelector('[change-password]');
const passwords = document.querySelector('.form-passwords');

// Verifica se há um valor armazenado em localStorage
const storedDisplay = localStorage.getItem('passwordsDisplay');

// Restaura o valor armazenado, se existir
if (storedDisplay) {
    passwords.style.display = storedDisplay;
}

passwordButton.addEventListener('click', () => {
    if (passwords.style.display == 'none') {
        passwords.style.display = 'flex';
        // Armazena o valor em localStorage quando o botão é clicado
        localStorage.setItem('passwordsDisplay', 'flex');
    } else {
        passwords.style.display = 'none';
        // Armazena o valor em localStorage quando o botão é clicado
        localStorage.setItem('passwordsDisplay', 'none');
    }
});

const passwordInputs = document.querySelectorAll('.form-input[type="password"]');

passwordInputs.forEach(input => {
    input.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (input.type == "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    })
})

const backButton = document.querySelector('[back]')

backButton.addEventListener('click', () => {
    window.location.href = "index.php";
})