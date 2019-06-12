(function () {
    let addUsername = document.getElementById("addUsername");
    let addPassword = document.getElementById("addPassword");
    let usernameError = document.getElementById("validateUsername");
    let passwordError = document.getElementById("validatePassword");
    let submit = document.getElementById("login");
    let articles = document.getElementById("articles");

    addUsername.addEventListener("input", (e) => {
        usernameError.textContent = "";
    });

    addPassword.addEventListener("input", (e) => {
        passwordError.textContent = "";
    });

    submit.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validate()) {
            return false;
        }
        return true;
    });

    function validate() {
        let fail = false;
        if (addUsername.value == 0) {
            usernameError.textContent = "Username must be greater than 0";
            fail = true;
        }
        if (addPassword.value == 0) {
            passwordError.textContent = "Password must be greater than 0";
            fail = true;
        }

        return fail;

    }
}());