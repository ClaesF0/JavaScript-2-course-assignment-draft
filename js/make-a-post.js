import {CREATE_POST_URL} from "../js/api-related"
import {getToken} from "../js/local-storage-related"

const titleField = document.getElementById("titleField");
const textField = document.getElementById("textField");
const postBtn = document.getElementById("postBtn");
const postTitleErrorMsg = document.getElementById("postTitleErrorMsg");
const postBodyErrorMsg = document.getElementById("postBodyErrorMsg");
const postForm = document.getElementById("postForm");

postForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var approvedTitleField = false;
    if (titleField.value.trim().length > 0 ) {
        postTitleErrorMsg.classList.add("hidden");
        approvedTitleField = true;
    } else {
        postTitleErrorMsg.classList.remove("hidden");
    }

    var approvedTextField = false;
    if (textField.value.trim().length > 0 ) {
        postBodyErrorMsg.classList.add("hidden");
        approvedTextField = true;
    } else {
        postBodyErrorMsg.classList.remove("hidden");
    }
    
    const postFormOK = approvedTitleField && approvedTextField;

    if(postFormOK) {
        
        const postObject = {
            "title": titleField.value,
            "body": textField.value
        };
        const bearerToken = getToken();
        
        
        
       (async function makePost() {
        const response = await fetch(CREATE_POST_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            },
            body: JSON.stringify(postObject)
            
        })
        
        if (response.ok) {
            const responseData = await response.json();
            //console.log('responseData', responseData);
            window.location.reload();
            postForm.reset();
        } else {
            const errorfromserver = "Error while communicating with server:" + await response.json();
            const errorMessage = "something went wrong";
            throw new Error(errorMessage)
            console.log('error from server when creating new post:', errorfromserver);
        }
       })().catch(errorfromserver => {
        console.log(errorfromserver)
       });       
    } else {
        window.alert("There was an error." + errorfromserver + errorMessage)
    }
}
)
