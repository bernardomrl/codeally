const input = document.querySelector(".form-input[type='password']");

input.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (input.type == "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
})