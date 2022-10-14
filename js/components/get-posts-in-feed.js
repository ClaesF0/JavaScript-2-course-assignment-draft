import moment from "moment";
import {READ_POSTS_URL} from "../api-related"
import {getToken} from "../local-storage-related"

let now = moment(new Date()); //todays date
//moment correctly installed and running
const postContainer = document.getElementById("postcontainer");

const bearerKey = getToken();
if(!bearerKey){
    location.replace("signin.html")
}

(async function getEveryPost() {
    const response = await fetch(READ_POSTS_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerKey}`
        }
    })
    if (response.ok) {
        const posts = await response.json();
        if (!posts.length) {
            //postsNotificationMessage.innerHTML = "Sorry no posts currently";
        } else {
            const listOfPosts = posts.map((post) => {
                
                const postBody = post.body;
                const postTitle = post.title;
                const postAuthor = post.owner;
                const postBirthday = post.created;
                
                const tags = posts.tags;
                console.log("tags før loop",tags)
                for (let i = 0, l=post.tags.length; i < l; i++) {
                const tags = post.tags[i];
                console.log("tags i slutt av loop",tags)
                }

                
                const timestamp = moment(postBirthday).fromNow();
                return (
                    `
                    <hr class="border-gray-600">
                    <div class="flex flex-shrink-0 p-4 pb-0">
                    
                                <span class="absolute inset-0" aria-hidden="true"></span>
                        <a href="#" class="flex-shrink-0 group block">
                          <div class="flex items-center">
                            <div>
                              <img class="inline-block h-10 w-10 rounded-full" src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
                            </div>
                            <div class="ml-3">
                              <p class="text-base leading-6 font-medium text-white">
                                ${postAuthor}
                                <span class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                 ${timestamp}
                                  </span>
                                   </p>
                            </div>
                          </div>
                        </a>
                    </div>
                    <a href="/single-post.html?post_id=${post.id}" class="block focus:outline-none">
                    <div class="pl-16">
                    <h5 class="font-medium leading-tight text-xl mt-0 mb-2 p-4 text-white">${postTitle}</h5>
                    
                   
                        </h2>
                        <p class="text-base width-auto font-medium ml-4  text-white flex-shrink">
                          ${postBody}
                        </p>
                        <br>
                        <p style="font-size: 10px;" class="width-auto font-thin ml-4 text-white flex-shrink">
                          ${"#"+tags+" "}
                        </p>
                        <!--<div class="md:flex-shrink pr-6 pt-3">
                            <img class="rounded-lg w-full h-64" src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80" alt="Woman paying for a purchase">
                          </div>-->
                        <div class="flex">
                            <div class="w-full">
                                <div class="flex items-center">
                                    <div class="flex-1 text-center">
                                        <a href="#" class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                            <svg class="text-center h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                          </a>
                                    </div>
        
                                    <div class="flex-1 text-center py-2 m-2">
                                        <a href="#" class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                            <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
                                        </a>
                                    </div>
        
                                    <div class="flex-1 text-center py-2 m-2">
                                        <a href="#" class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                            <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                        </a>
                                    </div>
        
                                    <div class="flex-1 text-center py-2 m-2">
                                        <a href="#" class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                            <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                    </a>
                                    </div>
                                    <div class="flex-1 text-center py-2 m-2">
                                        <a href="#" class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                            <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path></svg>
                                    </a>
                                    </div>
                                    <div class="flex-1 text-center py-2 m-2">
                                        <a href="#" class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                            <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                      </a>
                      <hr class="border-gray-600">
                    </div>
                    </div>
                </li>
            `
            )
            }).join('');
            // Add Posts to the page
            postContainer.insertAdjacentHTML('beforeend', listOfPosts);
        }
    } else {
        const err = await response.json();
        const message = `Sorry some error ${err}`;
        throw new Error(message)
    }
})().catch(err => {
    console.log("GET POSTS FAILED!!  😥😥😥");
    console.log(err);
   // postsNotificationMessage.innerHTML = err
});

