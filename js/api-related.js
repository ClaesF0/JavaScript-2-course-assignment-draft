console.log('API-RELATED.JS INIT',);
import { collectUserName } from "../js/local-storage-related";
const userName = collectUserName();

const BASE_URL_FOR_API = "https://nf-api.onrender.com/";

// AUTH
const LOGIN_URL =  BASE_URL_FOR_API + "api/v1/social/auth/login"
const SIGNUP_URL = BASE_URL_FOR_API + "api/v1/social/auth/register"

//POSTS
const CREATE_POST_URL = BASE_URL_FOR_API + "api/v1/social/posts"
const READ_POSTS_URL = BASE_URL_FOR_API + "api/v1/social/posts"
const GET_USERS_OWN_POSTS_URL = BASE_URL_FOR_API + `api/v1/social/profiles/${userName}?_posts=true`
const DELETE_USER_POST_BY_ID = BASE_URL_FOR_API + `api/v1/social/posts`

export {BASE_URL_FOR_API, LOGIN_URL, SIGNUP_URL, CREATE_POST_URL, READ_POSTS_URL, GET_USERS_OWN_POSTS_URL, DELETE_USER_POST_BY_ID}; 

console.log('API-RELATED.JS SUCCESSFUL',);