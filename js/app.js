
const formsToValidate = document.querySelectorAll(".validate-form");

formsToValidate.forEach(form => {

    form.addEventListener("submit", e => {
        e.preventDefault();
        formValidator.validate(e.currentTarget);
    });
});

const formValidator = {

    alert: null,

    validate(form) {

        let submit = true;
        const inputs = form.querySelectorAll("input");
        const inputsToValidate = [];

        inputs.forEach(input => {
            if (input.getAttribute('validate')) {
                inputsToValidate.push(input);
            }
        });

        for (let input of inputsToValidate) {

            if (!this.checkInput(input)) {
                submit = false;
                this.setAlert(input);

                for (let input of inputsToValidate) {
                    if (this.checkInput(input)) {
                        this.clearAlert(input);
                    }
                }
                break;

            } else {
                this.clearAlert(input);
            }
        }

        if (submit) {
            form.submit();
        }
    },

    checkInput(input) {

        const value = input.value;
        const rules = input.getAttribute("validate").split("|");

        for (let rule of rules) {
            if (rule == "required") {
                if (!value) {
                    this.alert = "Campo Requerido";
                    return false;
                }

            } else if (rule.split(":")[0] == "min") {
                if (value.length < rule.split(":")[1]) {
                    this.alert = "O valor mínimo é de " + rule.split(":")[1] + " caractéres";
                    return false;
                }

            } else if (rule.split(":")[0] == "max") {
                if (value.length > rule.split(":")[1]) {
                    this.alert = "O valor máximo é de " + rule.split(":")[1] + " caractéres";
                    return false;
                }

            } else if (rule.split(":")[0] == "type") {

                const types = {
                    email: /\S+@\S+\.\S+/,
                    phone: /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g
                };

                if (!types[rule.split(":")[1]].test(value)) {
                    this.alert = "Formato do campo é inválido";
                    return false;
                }
            }
        }

        return true;
    },

    setAlert(input) {

        input.classList.remove("success");
        input.classList.add("error");

        const alertElement = input.parentElement.querySelector(".input-alert");

        if (alertElement) {
            alertElement.innerText = this.alert;
        } else {

            const alert = document.createElement("span");
            alert.classList.add("input-alert")
            alert.innerText = this.alert;
            input.parentElement.appendChild(alert);
        }
    },

    clearAlert(input) {

        input.classList.add("success");
        input.classList.remove("error");

        const alert = input.parentElement.querySelector(".input-alert");
        if (alert) {
            alert.remove();
        }
    }
}