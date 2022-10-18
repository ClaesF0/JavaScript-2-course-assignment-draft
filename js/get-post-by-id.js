import moment from "moment";
import {/*GET_USERS_OWN_POSTS_URL, DELETE_USER_POST_BY_ID,*/ RETRIEVE_POST_BY_ID} from "../js/api-related";
import { collectUserName, getToken } from "../js/local-storage-related";

let now = moment(new Date()); //todays date
//moment correctly installed and running

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get("post_id");

const bearerKey = getToken();
if (!bearerKey) {
  location.replace("signin.html");
}

console.log("accessToken", bearerKey)
console.log("GET_POST_BY_ID_URL", RETRIEVE_POST_BY_ID)

console.log("postId", postId);

const userName = collectUserName();


const singlePostContainer = document.getElementById("singlepostcontainer");
const errorContainer = document.getElementById("errorContainer");


console.log('singlepostcontainer',singlePostContainer);

/*
const allPostInfo = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTMyLCJuYW1lIjoiY2xhZXMiLCJlbWFpbCI6ImNsYWVzLmZvbGtlc3RhZEBzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwiYmFubmVyIjpudWxsLCJpYXQiOjE2NjQzNjQwMDh9.h62gb9pNRAZmy8y-3BRQRhGUCf_FIjaj28AFHq3rc7w'
    }
  };
  
  fetch('https://nf-api.onrender.com/api/v1/social/posts/231?_author=true&_comments=true&_reactions=true', allPostInfo)
    .then(response => response.json())
    .then(response => console.log("dette er respons fra autogenerert API",response))
    .catch(err => console.error(err));
*/
    

const ALL_POST_INFO_URL = "?_author=true&_comments=true&_reactions=true" 



async function retrievePostByID() {
  const response = await fetch(`${RETRIEVE_POST_BY_ID}/${postId}${ALL_POST_INFO_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerKey}`,
    },
  });
  console.log('response',response);
  const data = await response.json();
  console.log('data',data);
  const postTitle = data.title;
  const postBody = data.body;
  const postID = data.id;
  const postBirthday = data.created;
  const postAuthorObject = data.author;
    //console.log("postauthor:", postAuthorObject)
    const postAuthorName = data.author.name;
    //console.log("postauthorNAME:", postAuthorName)
    const postAuthorEmail = data.author.email;
    //console.log("postauthorEmail:", postAuthorEmail)
    const postAuthorAvatar = data.author.avatar;
    //console.log("postauthoravatar:", postAuthorAvatar)

    const arr = [data.tags[0]];
    console.log('arr of tags', arr);
    
    const results = arr.filter(element => {
    return element !== undefined;
    });
    
    const unfilteredArr = [results[0]]

    const filteredTags = unfilteredArr.filter(element => {
        return element !== undefined && String.length>0;
        });
        

    const tags = ("#"+filteredTags+" ")

    const timestamp = moment(postBirthday).fromNow();
                

  
  console.log('postTitle',postTitle);
  console.log('postBody',postBody);

  singlePostContainer.innerHTML =
  `
  
                  <li>
      <hr class="border-gray-600">
         <a href="#" class="flex-shrink-0 group block">
              <div class="flex items-center">
                  <div>
                      <img class="inline-block h-10 w-10 px-3 rounded-full" src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
                  </div>
                  <div class="ml-3">
                      <p class="text-base px-3 ml-3 leading-6 font-medium text-white">
                              ${postAuthorName}
                          <span class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                             ${postAuthorEmail} ${timestamp}
                          </span>
                      </p>
                  </div>
              </div>
          </a>
          <a href="/single-post.html?post_id=${postID}" class="block focus:outline-none">
  <!--<div class="pl-16">-->
          <h5 class="font-medium leading-tight text-xl mt-0 mb-2 p-4 text-white">
          ${postTitle}
          </h5>
                   <p class="text-base width-auto font-medium ml-4  text-white flex-shrink">
                        ${postBody}
                  </p>
                  <br>
                        <p style="font-size: 10px;" class="width-auto font-thin ml-4 text-white flex-shrink">
                        ${tags}
                        </p>
                      <!--<div class="md:flex-shrink pr-6 pt-3">
                          <img class="rounded-lg w-full h-64" src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80" alt="Woman paying for a purchase">
                      </div>-->
                  <div class="flex">
                      <div class="w-full">
                          <br>
                          <div class="flex items-center">
                              <section>
                                  <div class="px-4 py-4 flex-2 text-center">
                                        <button id="editFormBtn" class=" text-white bg-lime-200  py-2 px-4 border hover:border-transparent rounded">
                                    Edit 
                                  </button>
                                  <button id="deletePostBtn" class="bg-transparent text-white bg-red-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded">
                                    Delete
                                  </button>
                                  </div>
                              </section>
                                  <hr class="border-gray-600">
                          </div>    
                      </div>
                  </div>
  <!--</div>-->
                  
              </a>
              <div class="flex-1 px-2 pt-2 mt-2">
                  <form id="editPostForm" action="" class="">
                  <textarea id="editTitleField" class=" bg-transparent text-gray-400 font-medium text-lg w-full" rows="1" cols="30" placeholder="Your edited title goes here"></textarea>
                  <p id= "postTitleErrorMsg" class="hidden text-red-400 ">Title is required</p>  
                  <textarea id="editTextField" class=" bg-transparent text-gray-400 font-medium text-lg w-full" rows="2" cols="30" placeholder="Your edited random thought goes here"></textarea>
                    <p id= "postBodyErrorMsg" class="hidden text-red-400 ">Content is required</p>
                    <div class="flex">
                      <div class="flex-1">
                          <button id="submitEditPostBtn" class="bg-blue-400 mt-2 mb-2 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
                              Post
                            </button>
                      </div>
                  </div>
                  </form>
              </div>   
          <hr class="border-gray-600"> 
  </li>
  
  
  
  
  
              `;

}

retrievePostByID();






  
//  if (response.ok) {
//    const singlePostJson = await response.json();
//    singlePostContainer.innerHTML = "";
//    const { post } = singlePostJson;
//    if (!post.length) {
//      errorContainer.innerHTML = "You have no posts";
//    } else {
//      const amountOfPosts = post.length;
//      for (let i = 0; i < amountOfPosts; i++) {
//        console.log(post[i]);
//      }
//      const listOfPosts = posts
//        .map((post) => {
//          //const postBody = post.body;
//          //const postTitle = post.title;
//          const postBirthday = post.created;
//          const timestamp = moment(postBirthday).fromNow();
//          return singlePostContainer.innerHTML =
//          `
//
//                <li>
//    <hr class="border-gray-600">
//       <a href="#" class="flex-shrink-0 group block">
//            <div class="flex items-center">
//                <div>
//                    <img class="inline-block h-10 w-10 px-3 rounded-full" src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
//                </div>
//                <div class="ml-3">
//                    <p class="text-base px-3 ml-3 leading-6 font-medium text-white">
//                            USERNAME
//                        <span class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
//                            TIMESTAMP
//                        </span>
//                    </p>
//                </div>
//            </div>
//        </a>
//        <a href="/single-post.html?post_id=${post.id}" class="block focus:outline-none">
//<!--<div class="pl-16">-->
//        <h5 class="font-medium leading-tight text-xl mt-0 mb-2 p-4 text-white">POSTTITLE</h5>
//                 <p class="text-base width-auto font-medium ml-4  text-white flex-shrink">
//                      ${postBody}
//                </p>
//                    <!--<div class="md:flex-shrink pr-6 pt-3">
//                        <img class="rounded-lg w-full h-64" src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80" alt="Woman paying for a purchase">
//                    </div>-->
//                <div class="flex">
//                    <div class="w-full">
//                        <br>
//                        <div class="flex items-center">
//                            <section>
//                                <div class="px-4 py-4 flex-2 text-center">
//                                      <button id="editFormBtn" class=" text-white bg-lime-200  py-2 px-4 border hover:border-transparent rounded">
//                                  Edit 
//                                </button>
//                                <button id="deletePostBtn" class="bg-transparent text-white bg-red-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded">
//                                  Delete
//                                </button>
//                                </div>
//                            </section>
//                                <hr class="border-gray-600">
//                        </div>    
//                    </div>
//                </div>
//<!--</div>-->
//                
//            </a>
//            <div class="flex-1 px-2 pt-2 mt-2">
//                <form id="editPostForm" action="" class="">
//                <textarea id="editTitleField" class=" bg-transparent text-gray-400 font-medium text-lg w-full" rows="1" cols="30" placeholder="Your edited title goes here"></textarea>
//                <p id= "postTitleErrorMsg" class="hidden text-red-400 ">Title is required</p>  
//                <textarea id="editTextField" class=" bg-transparent text-gray-400 font-medium text-lg w-full" rows="2" cols="30" placeholder="Your edited random thought goes here"></textarea>
//                  <p id= "postBodyErrorMsg" class="hidden text-red-400 ">Content is required</p>
//                  <div class="flex">
//                    <div class="flex-1">
//                        <button id="submitEditPostBtn" class="bg-blue-400 mt-2 mb-2 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
//                            Post
//                          </button>
//                    </div>
//                </div>
//                </form>
//            </div>   
//        <hr class="border-gray-600"> 
//</li>
//
//
//
//
//
//            `;
//           /* 
//           
//
//
//
//          
////                    <hr class="border-gray-600">
////                    <div class="flex flex-shrink-0 p-4 pb-0">
////                                <span class="absolute inset-0" aria-hidden="true"></span>
////                        <a href="#" class="flex-shrink-0 group block">
////                          <div class="flex items-center">
////                            <div>
////                              <img class="inline-block h-10 w-10 px-3 rounded-full" src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
////                            </div>
////                            <div class="ml-3">
////                              <p class="text-base px-3 ml-3 leading-6 font-medium text-white">
////                                ${userName} 
////                                <span class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
////                                    ${timestamp}
////                                  </span>
////                                   </p>
////                            </div>
////                          </div>
////                        </a>
////                    </div>
////                    <a href="/single-post.html?post_id=${post.id}" class="block focus:outline-none">
////                    <div class="pl-16">
////                    <h5 class="font-medium leading-tight text-xl mt-0 mb-2 p-4 text-white">${postTitle}</h5>
////                     </h2>
////                        <p class="text-base width-auto font-medium ml-4  text-white flex-shrink">
////                          ${postBody}
////                        </p>
////                        <!--<div class="md:flex-shrink pr-6 pt-3">
////                            <img class="rounded-lg w-full h-64" src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80" alt="Woman paying for a purchase">
////                          </div>-->
////                        <div class="flex">
////                            <div class="w-full">
////                            <br>
////                                <div class="flex items-center">
////                                <section>
////                                    <div class="px-4 py-4 flex-2 text-center">
////                                          <button id="editFormBtn" class=" text-white bg-lime-200  py-2 px-4 border hover:border-transparent rounded">
////                                      Edit 
////                                    </button>
////                                    <button id="deletePostBtn" class="bg-transparent text-white bg-red-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded">
////                                      Delete
////                                    </button>
////                                    </div>
////                                    </section>
////                                    <hr class="border-gray-600">
////                                    <!--middle creat tweet-->
////                                    <div class="flex">                  
////                                    </div>
////                                        </div>    
////                                </div>
////                            </div>
////                        </div>
////                      </div>
////                      </a>
////                      <hr class="border-gray-600">
////                      <div class="flex-1 px-2 pt-2 mt-2">
////                <form id="editPostForm" action="" class="">
////                <textarea id="editTitleField" class=" bg-transparent text-gray-400 font-medium text-lg w-full" rows="1" cols="30" placeholder="Your edited title goes here"></textarea>
////                <p id= "postTitleErrorMsg" class="hidden text-red-400 ">Title is required</p>  
////                <textarea id="editTextField" class=" bg-transparent text-gray-400 font-medium text-lg w-full" rows="2" cols="30" placeholder="Your edited random thought goes here"></textarea>
////                  <p id= "postBodyErrorMsg" class="hidden text-red-400 ">Content is required</p>
////                  <div class="flex">
////                    <div class="flex-1">
////                        <button id="submitEditPostBtn" class="bg-blue-400 mt-2 mb-2 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
////                            Post
////                          </button>
////                    </div>
////                </div>
////                </form>
////              </div>   
////                    </div>
////                    </div>
////                </li>
//
//           */ 
//        })
//        .join("");
//      // Add Posts to the page
//      singlePostContainer.insertAdjacentHTML("beforeend", listOfPosts);
//    }
//  } else {
//    const err = await response.json();
//    const message = `Sorry some error ${err}`;
//    throw new Error(message);
//  }
//})().catch((err) => {
//  console.log("GET POSTS FAILED!!  😥😥😥");
//  console.log(err);
//  // postsNotificationMessage.innerHTML = err
//});
//