import { collectUserName } from "../local-storage-related";
import {clearStorage} from "../local-storage-related"
import {getToken} from "../local-storage-related"

const bearerKey = getToken();

function createHeaderBar() {
  const { currentPage } = document.location;
  const navBar = document.getElementById("navBar");
  if (navBar) {
    const userName = collectUserName();
    let links;
    links = `
            <li class="p-8"><a href="/signup.html" class="${currentPage === "/signup.html" ? "text-white" : ""}">SignUp</a></li>
            <li class="p-8"><a href="/signin.html" class="${currentPage === "/signin.html" ? "text-white" : ""}">LogIn</a></li>
            `;
    if (userName) {
      links = `
    <li>
      <a href="index.html" class="block py-2 p-1  text-white rounded hover:bg-gray-100 md:hover:bg-transparent bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Feed </a>
    </li>
      <a href="my-posts.html" class="block py-2 p-1  text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"> My posts </a>
    </li>
    <li>
      <a href="profile.html" class="block py-2 p-1  text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"> ${userName}'s profile </a>
    </li>     
`;
    }
    navBar.innerHTML = 
    `
    <nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div class="container flex flex-wrap justify-between items-center mx-auto w-4/5">
        <a href="index.html" class="flex items-center">
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Piece of Mind</span>
        </a>
        <ul class="flex flex-row p-1 mt-1 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        ${links}
        </ul>
        <div class="relative text-gray-300 w-60 px-2 sm:px-4 py-2.5 mr-2">
              <button type="submit" class="absolute ml-4 mt-3 mr-4">
                  <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                  </svg>
                </button>
              <input type="search" name="search" id="searchInput" placeholder="Search" class="bg-blue-800 h-10 px-10 pr-5 w-full rounded-full text-sm focus:outline-none bg-purple-white shadow rounded border-0">
              <ul class"list-group" id="list"></ul>
              <ul class"list-group" id="listTwo"></ul>
          </div>
        <button type="button" id="logout-btn" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Log Out</button>
        </div>
      </nav>
      `;
  }
  
const logoutbtn = document.getElementById("logout-btn");

if (logoutbtn) {
  logoutbtn.addEventListener("click", function () {
        clearStorage();
        window.location.replace("/signin.html");
    })
}
//Search for usernames starts here
const searchApiForProfiles = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${bearerKey}`
  }
};

fetch('https://nf-api.onrender.com/api/v1/social/profiles', searchApiForProfiles)
  .then(response => response.json())
  .then((data) => {
    const people = data;

    const searchInput = document.getElementById("searchInput");
    const list = document.getElementById("list");

function setList(group){
  clearList();
  for(const person of group){
    const item=document.createElement('li')
    item.classList.add('list-group-item')
    //const linkToProfile = `<a href="/profile.html/${person.name}">Profile:${person.name}</a>`;
    const text = document.createTextNode("Username: "+person.name);
    
    item.appendChild(text);
    list.appendChild(item);
  }
    if (group.length === 0){
      setNoResults();
 
  }
}

function clearList(){
    while (list.firstChild){
      list.removeChild(list.firstChild);
    }
}

function setNoResults () {
    const item=document.createElement('li')
    item.classList.add('list-group-item')
    const text = document.createTextNode("No matching user found");
    item.appendChild(text);
    list.appendChild(item);
}

function getRelevancy(value, searchTerm){ //maximizing relevancy with origin of amount of search/result match
  if (value === searchTerm) {
    return 2;
  } else if (value.startsWith(searchTerm)) {
    return 1;
  } else if(value.includes(searchTerm)) {
    return 0;
  }
}

searchInput.addEventListener('input', (event) => {
  //console.log(event.target.value)
  let value = event.target.value;
  if (value && value.trim().length > 0) {
      value = value.trim().toLowerCase(); //avoid cAsE sEnsItIvIty IsSueS
      setList(people.filter(person=>{
        return person.name.includes(value);
      }).sort((personA, personB)=>{
        return getRelevancy(personB.name, value) -getRelevancy(personA.name, value);
      })); //her er array som søkes i 
  } else {
    clearList();
  }
});
//Search 1 ends here
  }
  )
  .catch(err => console.error(err));

////////Call for post data begins/////////
const searchApiForPosts = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${bearerKey}`
  }
};

fetch('https://nf-api.onrender.com/api/v1/social/posts', searchApiForPosts)
  .then(response => response.json())
  .then((allPostData) => {
    const people = allPostData;
    console.log("DATA FRA ANDRE API CALL",allPostData)
    const searchInput = document.getElementById("searchInput");
    const list = document.getElementById("listTwo");

function setList(group){
  clearList();
  for(const post of group){
    console.log('GROUP',group);
    
    const item=document.createElement('li')
    item.classList.add('list-group-item')
    //const linkToProfile = `<a href="/profile.html/${person.name}">Profile:${person.name}</a>`;
    const title = document.createTextNode("Post with title: "+'"'+post.title+'"');
    item.appendChild(title);
    list.appendChild(item);
  }
    if (group.length === 0){
      setNoResults();
 
  }
}

function clearList(){
    while (list.firstChild){
      list.removeChild(list.firstChild);
    }
}

function setNoResults () {
    const item=document.createElement('li')
    item.classList.add('list-group-item')
    const text = document.createTextNode("No results found");
    item.appendChild(text);
    list.appendChild(item);
}

function getRelevancy(value, searchTerm){ //maximizing relevancy with origin of amount of search/result match
  if (value === searchTerm) {
    return 2;
  } else if (value.startsWith(searchTerm)) {
    return 1;
  } else if(value.includes(searchTerm)) {
    return 0;
  }
}

searchInput.addEventListener('input', (event) => {
  //console.log(event.target.value)
  let value = event.target.value;
  if (value && value.trim().length > 0) {
      value = value.trim().toLowerCase(); //avoid cAsE sEnsItIvIty IsSueS
      setList(people.filter(post=>{
        return post.title.includes(value);
      }).sort((postA, postB)=>{
        return getRelevancy(postB.title, value) -getRelevancy(postA.title, value);
      })); //her er array som søkes i 
  } else {
    clearList();
  }
});
//Search ends here
  }
  )
  .catch(err => console.error(err));
/////////END OF CALL 2/////////
}
createHeaderBar();

export {createHeaderBar};
