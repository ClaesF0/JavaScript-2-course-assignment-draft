import { collectUserName } from "../local-storage-related";


function createHeaderBar() {
  const { currentPage } = document.location;
  const navBar = document.getElementById("navBar");
  if (navBar) {
    const userName = collectUserName();
    let links;
    links = `
            <li class="p-8"><a href="/signup.html" class="${currentPage === "/signup.html" ? "text-blue-600" : ""}">SignUp</a></li>
            <li class="p-8"><a href="/signin.html" class="${currentPage === "/signin.html" ? "text-blue-600" : ""}">LogIn</a></li>
            `;
    if (userName) {
      links = `
    <li>
      <a href="index.html" class="${currentPage === "/index.html" ? "text-blue-600" : ""} block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Feed</a>
    </li>
    <li>
      <a href="make-post.html" class="${currentPage === "/make-post.html" ? "text-blue-600" : ""}block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Make a new post</a>
    </li>
    <li>
      <a href="my-posts.html" class="${currentPage === "/my-posts.html" ? "text-blue-600" : ""}block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My posts</a>
    </li>
    <li>
      <a href="profile.html" class="${currentPage === "/profile.html" ? "text-blue-600" : ""}block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">${userName}'s profile</a>
    </li>     
`;
    }
    navBar.innerHTML = 
    `
    <nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href="index.html" class="flex items-center">
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Piece of Mind</span>
        </a>
        <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        ${links}
        </ul>
        <button type="button" id="logout-btn" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Log Out</button>
        </div>
      </nav>`;
  }
}




export {createHeaderBar};

