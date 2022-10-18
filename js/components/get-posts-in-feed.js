import moment from "moment";
//import { stringify } from "postcss";
import {READ_POSTS_URL, RETRIEVE_POST_BY_ID, GET_PROFILEINFO_URL} from "../api-related"
import {getToken} from "../local-storage-related"

let now = moment(new Date()); //todays date
//moment correctly installed and running
const postContainer = document.getElementById("postcontainer");

const bearerKey = getToken();
if(!bearerKey){
    location.replace("signin.html")
}


async function getTheID() {
    console.log("fak u dolan")
    const response = await fetch(READ_POSTS_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerKey}`
        }
    })
        const posts = await response.json();
        const listOfPosts = posts.map((post) => {
        const postID = post.id;
        const ALL_POST_INFO_URL = "?_author=true&_comments=true&_reactions=true" 
                
        const allPostInfo = {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${bearerKey}`
      }
    };
        async function getAllPostInfo(){
          // gets the response from the api and put it inside a constant
          const response = await fetch(READ_POSTS_URL+"/"+`${postID}`+ALL_POST_INFO_URL, allPostInfo);
          //the response have to be converted to json type file, so it can be used
          const allPostData = await response.json();
          //the addData adds the object "data" to an array
          addData(allPostData)
        }

        function addData(noe) {
          // the push method add a new item to an array
          // here it will be adding the object from the function each time it is called
          allPostData.push(noe);
          //the fetched data is available only on this scope
          //console.log("This is the value of date inside the function addData:")
          //console.log("allPostData",allPostData)
          for (let i = 0; i < allPostData.length; i++) {
            //console.log("loop",i, allPostData[i]); 

            

            

            const entirePostData = allPostData[i];
            [entirePostData].filter(item => !!item);

            const authorName = entirePostData.author.name;
            console.log('authorName',authorName);
            const authorEmail = entirePostData.author.email;
            console.log('authorEmail',authorEmail);

            const authorAvatar = entirePostData.author.avatar;
            console.log('authorAvatar',authorAvatar);

            const postTitle = entirePostData.title;
            console.log('postTitle',postTitle);
            
            const postBody = entirePostData.body;
            console.log('postBody',postBody);
            
            const postMediaString = entirePostData.media;
            console.log('postMediaString',postMediaString);
            
            const postReactionsArr = entirePostData.reactions.length;
            console.log('postReactionsArr',postReactionsArr);
            
            const postCommentsArr = entirePostData.comments.length;
            console.log('postCommentsArr',postCommentsArr);
            
            const postCreated = entirePostData.created;
            console.log('postCreated',postCreated);
            
            const postUpdated = entirePostData.updated;
            console.log('postUpdated',postUpdated);
            
            const postID = entirePostData.id;
            console.log('postID',postID);
            
            const countcomments = entirePostData._count.comments;
            console.log('countcomments',countcomments);
            
            const countreactions = entirePostData._count.reactions;
            console.log('countreactions',countreactions);

            postContainer.insertAdjacentHTML= 
            
            `
            
            <hr class="border-gray-600">
                    <div class="flex flex-shrink-0 p-4 pb-0">
                    <!--<a href="/single-post.html?post_id=${postID}" class="flex-shrink-0 group block">-->
                                
                        
                        
                          <div class="flex items-center">
                            <div>
                              <img class="inline-block h-10 w-10 rounded-full" src="${authorAvatar}" alt="" />
                            </div>
                            <div class="ml-3">
                              <p class="text-base leading-6 font-medium text-white">
                               ${authorName}
                                <span class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                 TIMESTAMP ${authorEmail}
                                  </span>
                                   </p>
                            </div>
                          </div>
                        </a>
                    </div>
                    <a href="/single-post.html?post_id=POSTID" class="block focus:outline-none">
                    <div class="pl-16">
                    <h5 class="font-medium leading-tight text-xl mt-0 mb-2 p-4 text-white">TITTEL</h5>
                        
                        <p class="text-base width-auto font-medium ml-4  text-white flex-shrink">
                          ${postBody}
                        </p>
                        <br>
                        <p style="font-size: 10px;" class="width-auto font-thin ml-4 text-white flex-shrink">
                        TAGS
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
                      <hr class="border-gray-600">
                    </div>
                    </div>
                </li>
            `
            }
        }   
        //Calls the function that fetches the data
        getAllPostInfo()
    })};
    getTheID();
        let allPostData = [];
        















(async function getEveryPost() {
    const response = await fetch(READ_POSTS_URL, {method: "GET",headers: {"Content-Type": "application/json","Authorization": `Bearer ${bearerKey}`}})
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
                const postID = post.id;
                  const arr = [post.tags[0]];
                  const results = arr.filter(element => {
                  return element !== undefined;
                  });
                  const unfilteredArr = [results[0]]
                  const filteredTags = unfilteredArr.filter(element => {
                      return element !== undefined && String.length>0;
                      });
                const tags = ("#"+filteredTags+" ")

                const timestamp = moment(postBirthday).fromNow();
                return (
                    `
                    <hr class="border-gray-600">
                    <div class="flex flex-shrink-0 p-4 pb-0">
                    <!--<a href="/single-post.html?post_id=${postID}" class="flex-shrink-0 group block">-->
                    
                                <span class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                 ${timestamp}
                                  </span>
                                
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
/*
export { postID }
console.log(postID)
*/