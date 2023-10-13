import moment from "moment";
//import { stringify } from "postcss";
import { collectUserName } from "../local-storage-related";
import {
  READ_POSTS_URL,
  RETRIEVE_POST_BY_ID,
  GET_PROFILEINFO_URL,
  BASE_URL_FOR_API,
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
console.log("userName", userName);

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
  try {
    //const response = await fetch(READ_POSTS_URL, {
    //  method: "GET",
    //  headers: {
    //    "Content-Type": "application/json",
    //    Authorization: `Bearer ${bearerKey}`,
    //  },
    //});

    const numberOfPostsToRetrieve = 10; // Set the number of posts you want to retrieve

    const response = await fetch(
      `${READ_POSTS_URL}?_limit=${numberOfPostsToRetrieve}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerKey}`,
        },
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error(err);
      return;
    }

    const posts = await response.json();

    if (!bearerKey) {
      location.replace("signin.html");
    }

    if (!posts.length) {
      console.log("Sorry no posts could be displayed at this time :((");
    } else {
      for (const post of posts) {
        const postID = post.id;

        const postInfoResponse = await fetch(
          READ_POSTS_URL + "/" + `${postID}` + ALL_POST_INFO_URL,
          allPostInfoEndpoint
        );

        if (!postInfoResponse.ok) {
          const err = await postInfoResponse.json();
          console.error(err);
          continue;
        }
        const allPostInfo = await postInfoResponse.json();

        const authorName = allPostInfo.author.name;
        const authorEmail = allPostInfo.author.email;
        const authorAvatar = allPostInfo.author.avatar;
        const postTitle = allPostInfo.title;
        const postBody = allPostInfo.body;
        const postMediaString = allPostInfo.media;

        const postCreated = allPostInfo.created;
        const timestamp = moment(postCreated).fromNow();
        const postUpdated = allPostInfo.updated;
        const updatedTimestamp = "Updated " + moment(postCreated).fromNow();
        const tags = allPostInfo.tags;
        const formattedTags =
          tags && tags.some((tag) => tag.trim() !== "")
            ? tags.map((tag) => `#${tag}`).join(" ")
            : "";

        //console.log("tags", tags);
        //const postID = allPostInfo.id;
        // comments
        const countcomments = allPostInfo._count.comments;
        const countcommentsstring = countcomments.toString();
        const postCommentsArr = allPostInfo.comments;
        //console.log("postCommentsArr", postCommentsArr);
        //console.log("comments", allPostInfo.comments);

        //console.log("countcomments", countcomments);

        for (const comment of postCommentsArr) {
          // Access individual comment using 'comment'
          const commentUser = comment.user;
          const commentText = comment.comment;
          //console.log("commentText", commentText);
          //console.log("user (in comment)", commentUser);
          // Do something with the comment data...
        }

        //reactions
        const postReactionsArr = allPostInfo.reactions;
        //console.log("postReactionsArr", postReactionsArr);

        const countreactions = allPostInfo._count.reactions;

        const reactionsArr = allPostInfo.reactions;
        console.log("reactionsArr", reactionsArr);

        for (const reaction of reactionsArr) {
          const reactionUser = reaction.postId;
          const reactionSymbol = reaction.symbol;

          console.log("reactionUser", reactionUser);
          console.log("reactionSymbol", reactionSymbol);
        }

        const countreactionsstring = countreactions.toString();

        const postContainer = document.getElementById("postcontainer");

        let newPostData = `
        <hr>
        <section class=" mb-4 w-full"> 
  

        <div class="flex p-4 justify-between">
        <div class="flex items-center">
          <a href="/profile.html?profile_name=${authorName}" class="text-black flex-shrink-0">
            ${
              authorAvatar && isImageURL(authorAvatar)
                ? `<img class="inline-block h-12 rounded-full mr-4" src="${authorAvatar}" alt="${authorName}'s image" />`
                : `<img class="inline-block h-12 rounded-full mr-4" src="https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg" alt="no image of author" />`
            }
            <div class="text-left">
              <p class="text-lg font-bold text-white">${authorName}</p>
              <span class="text-sm leading-5 font-medium text-gray-50 hover:text-gray-300 transition ease-in-out duration-150">
                <a href="mailto:${authorEmail}">${authorEmail}</a>
              </span>
            </div>
          </a>
        </div>
        <div class="ml-auto">
          ${timestamp}
        </div>
      </div> 
    </div>

    <div class="mx-auto ">
      <a href="/single-post.html?post_id=${postID}" class="flex-shrink-0 group block">
        <h5 class="mt-0 mb-2 text-lg font-semibold text-white italic">
          ${postTitle}
        </h5>
        <p class="width-auto text-lg font-semibold text-white flex-shrink">
          ${postBody}
        </p>
        <p class="text-lg font-bold">${formattedTags}</p>
        </p>
        </a>
    </div>  
 
    <div class="picturediv w-full md:w-[300px] lg:w-[800px]">
    ${
      postMediaString && isImageURL(postMediaString)
        ? `<img class="rounded-lg mt-4 mx-4 border-2 border-red-500 " src="${postMediaString}" alt="Post Media is ${postMediaString}" />`
        : ""
    }
  </div>
  
    <div class="flex items-center text-white mb-4 p-2">
    <div class="mr-4">
      ${countreactionsstring} reactions
    </div>
    <div class="mr-4">
      ${countcommentsstring} comments
    </div>
  </div>
  <div class="reactions-container flex flex-row">
  ${reactionsArr.map((reaction) => `<p>${reaction.symbol}</p>`).join("")}
</div>
  
  <!-- Display individual comments -->
  <div class="comments-container">
    ${postCommentsArr
      .map(
        (comment) =>
          `<div class="comment-item px-4 text-white">
            <a href="/profile.html?profile_name=${comment.user}" target="_blank" rel="noopener noreferrer" class="font-bold mb-2">${comment.user}</a>
            <p>${comment.comment}</p>
          </div>`
      )
      .join("")}
  </div>
  <!-- Comment Form -->
  <form id="commentForm?${postID}" class="flex items-center">
    <input id="commentField?${postID}" type="text" class="border-2 border-white rounded-lg p-2 m-2">
    <button id="commentBtn?${postID}" class="bg-blue-500 hover:bg-white text-white hover:text-blue-500 font-bold py-2 px-4 rounded">
      Comment
    </button>
    <p id="commentErrorMsg" class="hidden text-red-500">Message needed</p>
  </form>


</section>
`;

        postContainer.insertAdjacentHTML("beforeend", newPostData);
      }
    }
  } catch (err) {
    console.error(err);
  }
})();

function isImageURL(url) {
  // Regular expression to check if the URL ends with a valid image file extension
  const imageRegex =
    /\.(jpeg|jpg|gif|png|bmp|svg|webp|ico|tiff|jfif|pjpeg|pjp)$/i;
  return imageRegex.test(url);
}
