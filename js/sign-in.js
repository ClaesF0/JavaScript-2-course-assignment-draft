import { LOGIN_URL, SIGNUP_URL } from "./api-related"
import {getToken, saveToken, storeUserSession, collectUserName, clearStorage} from "./local-storage-related"

//SIGN-IN PAGE
const signInForm = document.querySelector("#signin-form")
const emailField = document.querySelector("#emailField")
const passwordField = document.querySelector("#passwordField")


const emailFieldError = document.querySelector("#emailFieldError")
const emailInvalidError = document.querySelector("#emailInvalidError")
const passwordFieldError = document.querySelector("#passwordFieldError")
const otherErrorField = document.querySelector("#errorMessage")



// checked

//only noroff adress
const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;

//cooperates with the regular expression
function validEmail(email){
    return email.match(regEx) ? true : false;
}

function validDomain () {
    if (emailField.value.trim().length && validEmail(emailField.value) === true) {
        emailInvalidError.classList.add("hidden");
        emailField.classList.add("border-green-700");
        validDomain = true;
    } else if (emailField.value.trim().length && validEmail(emailField.value) !== true) {
        emailInvalidError.classList.remove("hidden");
    }
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

const capsLockReminder = document.getElementById("capsLockReminder");
signInForm.addEventListener('keyup', function (e) {
    if (e.getModifierState('CapsLock')) {
        capsLockReminder.classList.remove("hidden");
    } else {
        capsLockReminder.classList.add("hidden");
    }
}
);

//user can sign in
if (signInForm){
    signInForm.addEventListener("submit", function(event){
        event.preventDefault();
    
        let isEmailField = false;
        if (emailField.value.trim().length > 0) {
            emailFieldError.classList.add("hidden");
            isEmailField = true;
            emailField.classList.remove("border-red-700");
        } else {
            emailFieldError.classList.remove("hidden");
            emailField.classList.add("border-red-700");
        }
    
        let validDomain = false;
        if (emailField.value.trim().length && validEmail(emailField.value) === true) {
            emailInvalidError.classList.add("hidden");
            validDomain = true;
            emailField.classList.remove("border-red-700");
        } else if (emailField.value.trim().length && validEmail(emailField.value) !== true) {
            emailInvalidError.classList.remove("hidden");
            emailField.classList.add("border-red-700");
        }
    
        let correctPassword = false;
        if (passwordField.value.trim().length >= 8) {
            passwordFieldError.classList.add("hidden");
            correctPassword = true;
            passwordField.classList.remove("border-red-700");
        } else {
            passwordFieldError.classList.remove("hidden");
            passwordField.classList.add("border-red-700");
            passwordFieldError.innerHTML = 'Password of at least 8 letters is required. Please add ' + (8-passwordField.value.length) + ' characters.';
        }
    
        let formValidated = 
        isEmailField &&
        validDomain &&
        correctPassword;
    
        if (formValidated) {
            console.log("Validation success");
            const userData = {
                "email": emailField.value,
                "password": passwordField.value
            }
    
           const USER_LOGIN_ENDPOINT = `${LOGIN_URL}`;
    
            async function signInUser() {
                try {
                    const response = await fetch(USER_LOGIN_ENDPOINT, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(userData)
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        console.log("data:", data);
                        console.log("data.accessToken:", data.accessToken);
                        //location.replace("index.html")
                        // save Token
                    saveToken(data.accessToken);
                    // token saved in local storage, (const) bearerKey in local-storage-related.js
                    const signInDataToStorage = {
                        name: data.name,
                        email: data.email
                    }
                    console.log("signInDataToStorage", signInDataToStorage);
                    storeUserSession(signInDataToStorage);
                    location.replace("index.html")
                    } else {
                        otherErrorField.innerHTML = `The following error occured: ${data.message}`
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            signInUser();
        } else {
            otherErrorField.innerHTML = `The following error occured: ${data.message} and ${(e)}`
        }
    })
}









   