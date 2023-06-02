const exit = document.querySelector('[exit]');
const profile = document.querySelector('[profile]');
const login = document.querySelector('[login]');
const register = document.querySelector('[register]');

if (exit) {
    exit.addEventListener('click', () => {
        location.href = '../helpers/logout.php';
    });
}

if (profile) {
    profile.addEventListener('click', () => {
        location.href = 'profile.php';
    });
}

if (login) {
    login.addEventListener('click', () => {
        location.href = 'login.php';
    });
}

if (register) {
    register.addEventListener('click', () => {
        location.href = 'register.php';
    });
}