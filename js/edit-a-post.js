import postcss from "postcss";
import {UPDATE_USERS_POST_URL, RETRIEVE_POST_BY_ID} from "../js/api-related"
import {getToken} from "../js/local-storage-related"


const titleField = document.getElementById("titleField");
const textField = document.getElementById("textField");
const postBtn = document.getElementById("postBtn");
const postTitleErrorMsg = document.getElementById("postTitleErrorMsg");
const postBodyErrorMsg = document.getElementById("postBodyErrorMsg");


 const editPostForm = document.getElementById("editPostForm");

    const editFormBtn = document.getElementById("editFormBtn");
    const deletePostBtn = document.getElementById("deletePostBtn")
    
    console.log('editPostForm',editPostForm);
    console.log('editFormBtn',editFormBtn);
    console.log('deletePostBtn',deletePostBtn);
    console.log( "ready!" );


$( document ).ready(function() {
    console.log( "document loaded" );
});

$( window ).on( "load", function() {
    console.log( "window loaded" );
});



/*
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
        console.log('wapbabelula your post looks good this far',);
        console.log('',titleField.value);
        console.log('',textField.value);
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
            console.log('responseData', responseData);
            window.location.reload();
            postForm.reset();
        } else {
            const errorfromserver = "Error while communicating with server:" + await response.json();
            const errorMessage = "something went wrong";
            throw new Error(errorMessage)
            console.log('', errorfromserver);
        }
       })().catch(errorfromserver => {
        console.log(errorfromserver)
       });       
    } else {
        window.alert("There was an error." + errorfromserver + errorMessage)
    }
}
)
*/
