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
console.log("userName", userName);

const mockResponseBody = [
  {
    title: "Example Title 1",
    body: "This is an example post body.",
    tags: ["example", "coding", "placeholder"],
    media:
      "https://gfx.nrk.no/doWe1SsBvtzcKdBKzqlArwnybdC60DjJN1PUm3iM605w.jpg",
    reactions: [
      {
        user: "user1",
        reactionType: "like",
      },
      {
        user: "user2",
        reactionType: "love",
      },
    ],
    comments: [
      {
        user: "user3",
        comment: "Great post!",
      },
      {
        user: "user4",
        comment: "I like the content.",
      },
    ],
    created: "2023-10-05T12:00:00.000Z",
    updated: "2023-10-05T14:30:00.000Z",
    id: 1,
    author: {
      name: "exampleUser",
      email: "exampleuser@example.com",
      avatar:
        "https://gfx.nrk.no/RPA9O-oaHMOiDyLezTXaowNd6FsQcmujAvISqXZfDlAA.jpg",
      banner:
        "https://www.onlygfx.com/wp-content/uploads/2019/06/8-comic-ribbon-banner-cover.jpg",
    },
    _count: {
      comments: 2,
      reactions: 2,
    },
  },
  {
    title: "Example Title 2",
    body: "Another example post body.",
    tags: ["example", "testing", "static"],
    media:
      "https://gfx.nrk.no/Vrg1hA6GfwmWnSWromkEygPRZku5MN3Yfs616G-MrUsA.jpg",
    reactions: [],
    comments: [],
    created: "2023-10-05T13:30:00.000Z",
    updated: "2023-10-05T13:30:00.000Z",
    id: 2,
    author: {
      name: "anotherUser",
      email: "anotheruser@example.com",
      avatar:
        "https://gfx.nrk.no/arTNxAp1x3wo04uIzCMUkwUyaawxAzEI208vq9_CQrew.jpg",
      banner: null,
    },
    _count: {
      comments: 0,
      reactions: 0,
    },
  },
  {
    title: "k",
    body: "kk",
    tags: ["game", "mountain", "dancing"],
    media:
      "https://images.unsplash.com/photo-1696024344604-46b33ba2c753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    reactions: [],
    comments: [],
    created: "2023-10-04T14:04:30.335Z",
    updated: "2023-10-04T14:04:30.335Z",
    id: 2766,
    author: {
      name: "testbruker123",
      email: "testbruker123@stud.noroff.no",
      avatar: null,
      banner: null,
    },
    _count: {
      comments: 0,
      reactions: 0,
    },
  },
  {
    title: "k",
    body: "kk",
    tags: ["game", "mountain", "dancing"],
    media:
      "https://images.unsplash.com/photo-1696024344604-46b33ba2c753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    reactions: [],
    comments: [],
    created: "2023-10-04T14:04:30.333Z",
    updated: "2023-10-04T14:04:30.333Z",
    id: 2765,
    author: {
      name: "norofftest123",
      email: "norofftest123@stud.noroff.no",
      avatar: null,
      banner: null,
    },
    _count: {
      comments: 0,
      reactions: 0,
    },
  },
  // ... (more entries)
  {
    title: "Holy Divers",
    body: '"Holy Divers: A mockumentary on quirky divers tackling wild challenges in a fictional underwater world, full of humor and heart."',
    tags: ["Comedy", "Action", "Family", "Mockumentary"],
    media:
      "https://images.unsplash.com/photo-1561983779-7d7e065befa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1978&q=80.jpg",
    reactions: [
      {
        symbol: "👍",
        count: 1,
        postId: 2745,
      },
    ],
    comments: [],
    created: "2023-10-04T12:57:14.888Z",
    updated: "2023-10-04T12:57:14.888Z",
    id: 2745,
    author: {
      name: "runeunhjem",
      email: "rununh17678@stud.noroff.no",
      avatar:
        "https://portfolio1-ca.netlify.app/images/rune-profile-pic-medium.png",
      banner: "https://runeunhjem.no/images/banner.jpg",
    },
    _count: {
      comments: 0,
      reactions: 1,
    },
  },
  {
    title: "k",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vel justo hendrerit volutpat. Sed auctor nisi ac urna pharetra, eu egestas elit bibendum. Integer eu lectus vel sem euismod luctus. In hac habitasse platea dictumst.",
    tags: ["game", "mountain", "dancing"],
    media: "https://via.placeholder.com/800x400",
    reactions: [
      { symbol: "👍", count: 5 },
      { symbol: "❤️", count: 2 },
      { symbol: "👏", count: 1 },
    ],
    comments: [
      {
        author: "JohnDoe",
        text: "Great post! I love the dancing theme.",
        created: "2023-10-04T15:30:00.000Z",
      },
      {
        author: "Alice",
        text: "The mountain view is breathtaking!",
        created: "2023-10-04T15:45:00.000Z",
      },
    ],
    created: "2023-10-04T14:04:30.335Z",
    updated: "2023-10-04T14:04:30.335Z",
    id: 2766,
    author: {
      name: "testbruker123",
      email: "testbruker123@stud.noroff.no",
      avatar: "https://via.placeholder.com/50",
      banner: "https://via.placeholder.com/800x200",
    },
    _count: {
      comments: 2,
      reactions: 3,
    },
  },
  // ... (more entries)
  {
    title: "Holy Divers",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut quam nec felis lacinia accumsan. Sed vel tortor sagittis, aliquet est vel, interdum orci.",
    tags: ["Comedy", "Action", "Family", "Mockumentary"],
    media: "https://via.placeholder.com/1200x600",
    reactions: [
      { symbol: "👍", count: 10 },
      { symbol: "😄", count: 3 },
    ],
    comments: [
      {
        author: "FilmFanatic",
        text: "This sounds like a hilarious mockumentary! Can't wait to watch!",
        created: "2023-10-04T13:30:00.000Z",
      },
      {
        author: "Cinephile",
        text: "The poster is intriguing. Is there a release date?",
        created: "2023-10-04T14:00:00.000Z",
      },
    ],
    created: "2023-10-04T12:57:14.888Z",
    updated: "2023-10-04T12:57:14.888Z",
    id: 2745,
    author: {
      name: "runeunhjem",
      email: "rununh17678@stud.noroff.no",
      avatar: "https://via.placeholder.com/50",
      banner: "https://via.placeholder.com/800x200",
    },
    _count: {
      comments: 2,
      reactions: 2,
    },
  },
];

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

    const posts = mockResponseBody;

    //if (!response.ok) {
    //  const err = await response.json();
    //  console.error(err);
    //  return;
    //}

    //const posts = await response.json();

    let now = moment(new Date());

    if (!bearerKey) {
      location.replace("signin.html");
    }

    if (!posts.length) {
      console.log("Sorry no posts could be displayed at this time :((");
    } else {
      //for (const post of posts) {
      for (const post of mockResponseBody) {
        const postID = post.id;
        //console.log("individual endpoint",READ_POSTS_URL+"/"+`${postID}`+ALL_POST_INFO_URL, allPostInfoEndpoint);

        //const postInfoResponse = await fetch(
        //  READ_POSTS_URL + "/" + `${postID}` + ALL_POST_INFO_URL,
        //  allPostInfoEndpoint
        //);
        //
        //if (!postInfoResponse.ok) {
        //  const err = await postInfoResponse.json();
        //  console.error(err);
        //  continue;
        //}
        //
        //const allPostInfo = await postInfoResponse.json();
        const allPostInfo = post;

        console.log("tags", stringifyWithDepth(allPostInfo.tags, 3));
        console.log("reactions", stringifyWithDepth(allPostInfo.reactions, 3));
        function stringifyWithDepth(obj, depth) {
          const cache = new Set();

          return JSON.stringify(
            obj,
            (key, value) => {
              if (typeof value === "object" && value !== null) {
                if (cache.has(value)) {
                  return "[Circular Reference]";
                }
                cache.add(value);
              }
              return value;
            },
            depth
          );
        }

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
        console.log("postCommentsArr", postCommentsArr);
        console.log("comments", allPostInfo.comments);

        console.log("countcomments", countcomments);

        for (const comment of postCommentsArr) {
          // Access individual comment using 'comment'
          const commentUser = comment.user;
          const commentText = comment.comment;
          console.log("commentText", commentText);
          console.log("user (in comment)", commentUser);
          // Do something with the comment data...
        }

        //reactions
        const postReactionsArr = allPostInfo.reactions;
        console.log("postReactionsArr", postReactionsArr);

        const countreactions = allPostInfo._count.reactions;
        const reactions = allPostInfo.reactions;
        console.log("reactions", reactions);

        const countreactionsstring = countreactions.toString();

        for (const reaction of postReactionsArr) {
          // Access individual reaction using 'reaction'
          const user = reaction.user;
          const reactionType = reaction.reactionType;
          // Do something with the reaction data...
        }

        const postContainer = document.getElementById("postcontainer");

        let newPostData = `
        <hr>
        <section class=" mb-4 w-full"> 
  

        <div class="flex p-4 border-red-500 justify-between">
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

    <div class="mx-auto border-2 border-red-500">
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
      ${countreactionsstring} 👍
    </div>
    <div class="mr-4">
      ${countcommentsstring} comments
    </div>


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
  <form class="flex items-center">
  <input type="text" id="commentField" class="border-2 border-white rounded-lg p-2 m-2">
  <button id="commentBtn" class="bg-blue-500 hover:bg-white text-white hover:text-blue-500 font-bold py-2 px-4 rounded">
    Comment
  </button>
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
