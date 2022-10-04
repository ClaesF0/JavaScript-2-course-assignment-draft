//SIGNUP PAGE
const signUpForm = document.querySelector("#signup-form")
const nameField = document.querySelector("#nameField")
const emailField = document.querySelector("#emailField")
const passwordField = document.querySelector("#passwordField")
const passwordConfirmField = document.querySelector("#passwordConfirmField")

const signUpFormError = document.querySelector("#signup-formError")
const nameFieldError = document.querySelector("#nameFieldError")
const emailFieldError = document.querySelector("#emailFieldError")
const passwordFieldError = document.querySelector("#passwordFieldError")
const passwordConfirmFieldError = document.querySelector("#passwordConfirmFieldError")


// checked

//register user

//only noroff adress
const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;

//cooperates with the regular expression
function validEmail(email){
    return email.match(regEx) ? true : false;
}

function validPassword(password, confirmPassword) {
    if (!password) {
        return false;
    }
    if (!confirmPassword) {
        return false;
    }
    if (password !== confirmPassword) {
        return false;
    } else {
        return true;
    }
}







//registered user can log in 