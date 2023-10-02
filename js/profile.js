import moment from "moment";
import { BASE_URL_FOR_API } from "../js/api-related";
import { collectUserName, getToken } from "../js/local-storage-related";

URL.params = new URLSearchParams(window.location.search);
const profileName = URL.params.get("profile_name");
console.log("profileName", profileName);

const GET_PROFILES_POSTS_URL =
  BASE_URL_FOR_API + `api/v1/social/profiles/${profileName}?_posts=true`;

const userName = collectUserName();

let now = moment(new Date()); //todays date
//moment correctly installed and running
//const postContainer = document.getElementById("postcontainer");
const postContainer = document.getElementById("singlepostcontainer");
const errorContainer = document.getElementById("errorContainer");

const bearerKey = getToken();
if (!bearerKey) {
  location.replace("signin.html");
}

console.log("get users own posts", GET_PROFILES_POSTS_URL);

(async function getUsersPost() {
  const response = await fetch(GET_PROFILES_POSTS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerKey}`,
    },
  });
  if (response.ok) {
    const postsJson = await response.json();
    postContainer.innerHTML = "";
    const { posts } = postsJson;
    if (!posts.length) {
      alert("You have no posts");
    } else {
      const amountOfPosts = posts.length;
      for (let i = 0; i < amountOfPosts; i++) {
        //console.log(posts[i]);
      }
      const listOfPosts = posts
        .map((post) => {
          const postBody = post.body;
          const postTitle = post.title;
          const postBirthday = post.created;
          const postID = post.id;
          //console.log('POST ID POST ID ',postID);
          const timestamp = moment(postBirthday).fromNow();
          //console.log(postsJson)
          return `
          <hr class="border-gray-600">
                    <div class="flex flex-shrink-0 p-4 pb-0">
                                <span class="absolute inset-0" aria-hidden="true"></span>
                        <a href="#" class="flex-shrink-0 group block">
                          <div class="flex items-center">
                            <div>
                              <img class="inline-block h-10 w-10 px-3 rounded-full" src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
                            </div>
                            <div class="ml-3">
                              <p class="text-base px-3 ml-3 leading-6 font-medium text-white">
                                ${profileName} 
                                <span class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                    ${timestamp}
                                  </span>
                                   </p>
                            </div>
                          </div>
                        </a>
                    </div>
                    <a href="/single-post.html?post_id=${postID}" class="block focus:outline-none">
                    <div class="pl-16">
                    <h5 class="font-medium leading-tight text-xl mt-0 mb-2 p-4 text-white">${postTitle}</h5>
                     </h2>
                        <p class="text-base width-auto font-medium ml-4  text-white flex-shrink">
                          ${postBody}
                        </p></a>
                        <!--<div class="md:flex-shrink pr-6 pt-3">
                            <img class="rounded-lg w-full h-64" src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80" alt="Woman paying for a purchase">
                          </div>-->
                        <div class="flex">
                            <div class="w-full">
                            <br>
                                <div class="flex items-center">

                                    <hr class="border-gray-600">
                                    <!--middle creat tweet-->
                                    <div class="flex">                  
                                    </div>
                                        </div>    
                                </div>
                            </div>
                        </div>
                      </div> 
                      <hr class="border-gray-600">
                </div>
                </form>
              </div>   
                    </div>
                    </div>
                </li>
            `;
        })
        .join("");
      // Add Posts to the page
      postContainer.insertAdjacentHTML("beforeend", listOfPosts);
    }
  } else {
    const err = await response.json();
    const message = `Sorry some error ${err}`;
    throw new Error(message);
  }
})().catch((err) => {
  console.log(err);
  // postsNotificationMessage.innerHTML = err
});
