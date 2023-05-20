const input = document.querySelector(".form-input[type='password']");

input.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (input.type == "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
})

const select = document.querySelector('select');
const account = document.querySelector(".form-input[type='email']");

select.addEventListener('change', function () {
    const selectedValue = select.value;
    if (selectedValue == "1") {
        account.value = "Usuário";
    } else if (selectedValue == "2") {
        account.value = "Freelancer";
    }
});