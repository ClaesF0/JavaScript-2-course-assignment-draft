import moment from "moment";
import {/*GET_USERS_OWN_POSTS_URL, DELETE_USER_POST_BY_ID,*/ RETRIEVE_POST_BY_ID} from "../js/api-related";
import { collectUserName, getToken } from "../js/local-storage-related";

let now = moment(new Date()); //todays date
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
  const postBirthday = data.created;

  const allPostInfo = data;
                        
                        const author = allPostInfo.author.name;
                        const authorName = allPostInfo.author.name;
                        const authorEmail = allPostInfo.author.email;
                        const authorAvatar = allPostInfo.author.avatar;
                        const postTitle = allPostInfo.title;
                        const postBody = allPostInfo.body;
                        const postMediaString = allPostInfo.media;
                        //const postReactionsArr = allPostInfo.reactions.length;
                        const postCommentsArr = allPostInfo.comments.length;
                        const postCreated = allPostInfo.created;
                        //console.log('postCreated',postCreated);
                        //const timestamp = moment(postCreated).fromNow();

                        const postUpdated = allPostInfo.updated;
                        //console.log('postUpdated',postUpdated);
                        const updatedTimestamp = "Updated "+moment(postCreated).fromNow();
                        //console.log('updatedTimestamp',updatedTimestamp);

                        //const tags = allPostInfo.tags; 
                        //console.log('',tags);
                        

                        const postID = allPostInfo.id;
                        //console.log('postID',postID);

                        const countcomments = allPostInfo._count.comments;
                        //console.log('countcomments',countcomments);

                        const countreactions = allPostInfo._count.reactions;
                        //console.log('countreactions',countreactions);

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
                    <hr class="border-gray-600">
                    </li>                        
                                            <div class="flex">
                                                <div class="w-full">
                                                    <div class="flex items-center">
                                                    <section id="editSection">
                                                        <div class="px-4 py-4 flex-2 text-center">
                                                              <button id="editFormBtn" onclick="showEditField" class=" text-white bg-lime-200  py-2 px-4 border hover:border-transparent rounded">
                                                          Edit 
                                                        </button>
                                                        <button id="deletePostBtn" class="bg-transparent text-white bg-red-700 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded">
                                                          Delete
                                                        </button>
                                                        </div>
                                                        </section>
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
                                          <div class="flex-1 px-2 pt-2 mt-2">
                                    <form id="editPostForm" action="submit" class="">
                                    <textarea id="editTitleField" class="hidden bg-transparent text-gray-400 font-medium text-lg w-full" rows="1" cols="30" placeholder="Your edited title goes here"></textarea>
                                    <p id= "postTitleErrorMsg" class="hidden text-red-400 ">Title is required</p>  
                                    <textarea id="editTextField" class="hidden bg-transparent text-gray-400 font-medium text-lg w-full" rows="2" cols="30" placeholder="Your edited random thought goes here"></textarea>
                                      <p id= "postBodyErrorMsg" class="hidden text-red-400 ">Content is required</p>
                                      <div class="flex">
                                        <div class="flex-1">
                                            <button id="submitEditPostBtn" class="hidden bg-blue-400 mt-2 mb-2 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
                                                Post
                                              </button>
                                        </div>
                                    </div>
                                    </form>
                                  </div>   
                                        </div>
                                        </div>
                                    </li>
                                `;
              const editPostForm = document.getElementById("editPostForm");
              const editTitleField = document.getElementById("editTitleField");
              const editTextField = document.getElementById("editTextField");
              const editFormBtn = document.getElementById("editFormBtn");
              const deletePostBtn = document.getElementById("deletePostBtn")
              const submitEditPostBtn = document.getElementById("submitEditPostBtn")
              const editSection = document.getElementById("editSection")

              console.log('editPostForm',editPostForm);
              console.log('editFormBtn',editFormBtn);
              console.log('deletePostBtn',deletePostBtn);
              console.log( "ready!" );

              if(userName !== authorName){
                editSection.classList.add("hidden")
              }

              editFormBtn.addEventListener('click', () => {
                const editPostForm = document.getElementById("editPostForm");
              
                var showEditField = false;
                if (editPostForm.style.visibility === 'hidden') {
                  editTitleField.classList.add("hidden");
                  editTextField.classList.add("hidden");
                  submitEditPostBtn.classList.add("hidden");
                    showEditField = true;
                } else {
                  editTitleField.classList.remove("hidden");
                  editTextField.classList.remove("hidden");
                  submitEditPostBtn.classList.remove("hidden");
                }
              },
              ),
              deletePostBtn.addEventListener('click', () => {
                var postDeletionPrompt;

		          if (confirm("Do you want to delete post?") == true) {
                  const deletedPostObject = {
                    "title": "[]",
                    "body": "[]"
                };
                alert("Post deleted successfully!")
                    
                const options = {
                  method: 'DELETE',
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${bearerKey}`
                  },
                  body: JSON.stringify(deletedPostObject)
                };
                
                fetch('https://nf-api.onrender.com/api/v1/social/posts/'+ postID, options) 
                  .then(response => response.json())
                  .then(response => location.replace("index.html"))
                  .catch(err => console.error(err));
              
			        //postDeletionPrompt = "Post deleted successfully!";
		          } else {
			        postDeletionPrompt = "Deletion Canceled!";
		          } 
              },)

              editPostForm.addEventListener("submit", function (event) {
                event.preventDefault();

                const editedPostObject = {
                  "title": editTitleField.value,
                  "body": editTextField.value
              };
                  
              const options = {
                method: 'PUT',
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${bearerKey}`
                },
                body: JSON.stringify(editedPostObject)
              };
              
              fetch('https://nf-api.onrender.com/api/v1/social/posts/'+ postID, options) 
                .then(response => response.json())
                .then(response => location.reload())
                .catch(err => console.error(err));
              })
}

retrievePostByID();

