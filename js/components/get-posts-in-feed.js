import moment from "moment";
//import { stringify } from "postcss";
import { collectUserName } from "../local-storage-related";
import {
  READ_POSTS_URL,
  RETRIEVE_POST_BY_ID,
  GET_PROFILEINFO_URL,
} from "../api-related";
import { getToken } from "../local-storage-related";
//import {getTheID} from "../components/access-all-post-details"
let now = moment(new Date()); //todays date
//moment correctly installed and running
const postContainer = document.getElementById("postcontainer");

const bearerKey = getToken();
if (!bearerKey) {
  location.replace("/signin.html");
}


function redirectInvalid() {
  if (!bearerKey) {
    location.replace("/signin.html");
  }
}
redirectInvalid();

const userName = collectUserName();
console.log('userName',userName);



const ALL_POST_INFO_URL = "?_author=true&_comments=true&_reactions=true";
const allPostInfo = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerKey}`,
  },
};

const allPostInfoEndpoint = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${bearerKey}`,
  },
};

(async function getAllPosts() {
  const response = await fetch(READ_POSTS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerKey}`,
    },
  });
  if (response.ok) {
    const posts = await response.json();
    let now = moment(new Date());
    if (!bearerKey) {
      location.replace("signin.html");
    }
    if (!posts.length) {
      alert("Sorry no posts could be displayed at this time :((");
    } else {
      const postsMapped = posts.map((post) => {
        const postID = post.id;
        //console.log("individual endpoint",READ_POSTS_URL+"/"+`${postID}`+ALL_POST_INFO_URL, allPostInfoEndpoint);

        fetch(
          READ_POSTS_URL + "/" + `${postID}` + ALL_POST_INFO_URL,
          allPostInfoEndpoint
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const allPostInfo = data;
            const authorName = allPostInfo.author.name;
            const authorEmail = allPostInfo.author.email;
            const authorAvatar = allPostInfo.author.avatar;
            const postTitle = allPostInfo.title;
            const postBody = allPostInfo.body;
            const postMediaString = allPostInfo.media;
            //const postReactionsArr = allPostInfo.reactions.length;
            //console.log('postReactionsArr',postReactionsArr);
            const postCommentsArr = allPostInfo.comments.length;
            const postCreated = allPostInfo.created;
            const timestamp = moment(postCreated).fromNow();
            const postUpdated = allPostInfo.updated;
            const updatedTimestamp = "Updated " + moment(postCreated).fromNow();
            const tags = allPostInfo.tags;
            const postID = allPostInfo.id;
            const countcomments = allPostInfo._count.comments;
            const countreactions = allPostInfo._count.reactions;
            const postContainer = document.getElementById("postcontainer");
            let newPostData = `
                        <li class="list-none">
                        <hr class="border-gray-600">
                        <div class="flex flex-shrink-0 p-4 pb-0">
                        <a href="#" class="flex-shrink-0 group block">
                          <div class="flex items-center">
                            <div>
                              <img class="inline-block h-10 w-10 rounded-full" src="${authorAvatar}" alt="" />
                            </div>
                            <div class="ml-4">
                              <p class="text-base leading-6 font-medium text-white">
                                ${authorName}
                                <span class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                    ${timestamp}
                                  </span>
                                  <br>
                                  <span class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                <a href = "mailto: abc@example.com">${authorEmail}</a> 
                                  </span>
                                   </p>
                            </div>
                          </div>
                        </a>
                    </div>
                    </div> 
                    <div class="center px-4">
                    <a href="/single-post.html?post_id=${postID}" class="flex-shrink-0 group block">
                          <h5 class="font-medium leading-tight text-xl mt-0 mb-2 p-4 text-white">
                            ${postTitle}
                            </h5>
                            <p class="text-base width-auto font-medium ml-4  text-white flex-shrink">
                            ${postBody}
                            </p>
                      </div>  
                          <span class="text-blue-400"> ${tags}</span>
                        </p>
                        <div class="md:flex-shrink w-3/5 px-6 mx-6 center">
                            <img class="rounded-lg center " src="${postMediaString}" alt="">
                          </div></a>
                        <div class="flex">
                            <div class="w-full">
                                <br>
                            </div>
                        </div>
                      </div>
                      <hr class="border-gray-600">
                      </li>
            `;
            postContainer.insertAdjacentHTML("beforeend", newPostData);
          })
          .catch((err) =>
            console.error("the following error is returned from the api call to get post details:",err, " (NOTE: if the error is 'TypeError: can't access property name, allPostInfo.author is undefined' then just disregard it, clearly it is defined as you can tell from the feed):"
            )
          );
      });
    }
  } else {
    const err = await response.json();
    alert(`Sorry the following error happened: ${err}`, err);
    console.log(err);
  }
})().catch((err) => {
  alert(`Sorry the following error happened: ${err}`);
  console.log(err);
});

