console.log('LOCAL-STORAGE-RELATED.JS INIT',);

const bearerKey = "token";
const userKey = "user";

function saveToken (token) {
    console.log("token: ", token)
    console.log("tokenKey: ", tokenKey)
    saveToStorage(tokenKey, token);
}


function getToken() {
    return getFromStorage(tokenKey);
}

// save user object
function storeUserSession(user) {
    saveToStorage(userKey, user);
}

function collectUserName() {
    const user = getFromStorage(userKey);
    if (userKey) {
        return user.name
    } else {
        return null;
    }
}

// function which save data to the local storage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

// function which gets data from the local storage
function getFromStorage(key) {
    const value = localStorage.getItem(key);
    if (value) {
        return JSON.parse(value); // convert to JS
    } else {
        return []
    }
}

function clearStorage() {
    localStorage.clear();
}

export {getToken, saveToken, storeUserSession, collectUserName, clearStorage}

console.log('LOCAL-STORAGE-RELATED.JS SUCCESSFUL',);
