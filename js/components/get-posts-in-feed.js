import moment from "moment";
//import { stringify } from "postcss";
import {READ_POSTS_URL, RETRIEVE_POST_BY_ID, GET_PROFILEINFO_URL} from "../api-related"
import {getToken} from "../local-storage-related"
//import {getTheID} from "../components/access-all-post-details"
let now = moment(new Date()); //todays date
//moment correctly installed and running
const postContainer = document.getElementById("postcontainer");




const bearerKey = getToken();
if(!bearerKey){
    location.replace("signin.html")
}

const ALL_POST_INFO_URL = "?_author=true&_comments=true&_reactions=true" 
const allPostInfo = {method: 'GET',headers: {"Content-Type": "application/json","Authorization": `Bearer ${bearerKey}`}}; 

const allPostInfoEndpoint = {
                    method: 'GET',
                    headers: {
                      Authorization: `Bearer ${bearerKey}`
                    }
                  };

(async function getAllPosts() {
    const response = await fetch(READ_POSTS_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerKey}`
        }
    })
    console.log("get all posts response: ", response)
    if (response.ok) {
        const posts = await response.json();
        let now = moment(new Date()); 
        if (!posts.length) {
            //postsNotificationMessage.innerHTML = "Sorry no posts currently";
        } else {
            const listOfHtmlPosts = posts.map((post) => {
                const postBody = post.body;
                const postTitle = post.title;
                const createdDate = post.created;
                const postID = post.id;
                const daysSinceCreated = now.diff(createdDate, 'days');

                
                
                //console.log("individual endpoint",READ_POSTS_URL+"/"+`${postID}`+ALL_POST_INFO_URL, allPostInfoEndpoint);

                  fetch(READ_POSTS_URL+"/"+`${postID}`+ALL_POST_INFO_URL, allPostInfoEndpoint)
                
                  
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
                        const updatedTimestamp = "Updated "+moment(postCreated).fromNow();
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
            `
            postContainer.insertAdjacentHTML('beforeend', newPostData);
                        })
                    .catch(err => console.error("the following error is returned from the api call to get post details:",err));
            })
        }
    } else {
        const err = await response.json();
        alert(`Sorry the following error happened: ${err}`);
    }
})().catch(err => {
    alert(`Sorry the following error happened: ${err}`);
    console.log(err);
});






































































/*

let allPostData = [];
let filteredPostData = [];
(async function getTheID() {
    
        const response = await fetch(READ_POSTS_URL, {
            method: "GET",
            headers: {"Content-Type": "application/json","Authorization": `Bearer ${bearerKey}`}})

            const posts = await response.json();
            const listOfPosts = posts.map((post) => {
            const postID = post.id;
            const ALL_POST_INFO_URL = "?_author=true&_comments=true&_reactions=true" 
                  
                    
            const allPostInfo = {method: 'GET',headers: {"Content-Type": "application/json","Authorization": `Bearer ${bearerKey}`}}; 
            async function getAllPostInfo(){
              // gets the response from the api and put it inside a constant
              const response = await fetch(READ_POSTS_URL+"/"+`${postID}`+ALL_POST_INFO_URL, allPostInfo);
              //the response have to be converted to json type file, so it can be used
              const allUnfilteredPostData = await response.json();
              //the addData adds the object "data" to an array
              addData(allUnfilteredPostData)

              function addData(something) {
              
                allUnfilteredPostData.push(something);
                
                for (let i = 0; i < allUnfilteredPostData.length; i++) {
                  //console.log("loop",i, allPostData[i]); 
                  const filteredPostData = allUnfilteredPostData[0];
                  [filteredPostData].filter(item => !!item);
                  //console.log('DETTE ER FILTERED POST DATA',filteredPostData);
                }
                  
              }
              
                  
                  const authorName = filteredPostData.author.name;
                  //console.log('authorName',authorName);
                  const authorEmail = filteredPostData.author.email;
                  //console.log('authorEmail',authorEmail);
      
                  const authorAvatar = filteredPostData.author.avatar;
                  //console.log('authorAvatar',authorAvatar);
      
                  const postTitle = filteredPostData.title;
                  //console.log('postTitle',postTitle);
                  
                  const postBody = filteredPostData.body;
                  //console.log('postBody',postBody);
                  
                  const postMediaString = filteredPostData.media;
                  //console.log('postMediaString',postMediaString);
                  
                  const postReactionsArr = filteredPostData.reactions.length;
                  //console.log('postReactionsArr',postReactionsArr);
                  
                  const postCommentsArr = filteredPostData.comments.length;
                  //console.log('postCommentsArr',postCommentsArr);
                  
                  const postCreated = filteredPostData.created;
                  //console.log('postCreated',postCreated);
                  const timestamp = moment(postCreated).fromNow();
      
                  const postUpdated = filteredPostData.updated;
                  //console.log('postUpdated',postUpdated);
                  const updatedTimestamp = "Updated "+moment(postCreated).fromNow();
                  //console.log('updatedTimestamp',updatedTimestamp);
                  
                  const postID = filteredPostData.id;
                  //console.log('postID',postID);
                  
                  const countcomments = filteredPostData._count.comments;
                  //console.log('countcomments',countcomments);
                  
                  const countreactions = filteredPostData._count.reactions;
                  //console.log('countreactions',countreactions);
            }
            
            
            }   
            //Calls the function that fetches the data
        getAllPostInfo();
            
            
        })();


(async function getEveryPost() {
    const response = await fetch(READ_POSTS_URL, {method: "GET",headers: {"Content-Type": "application/json","Authorization": `Bearer ${bearerKey}`}})
    if (response.ok) {
        const posts = await response.json();
        if (!posts.length) {
            ////postsNotificationMessage.innerHTML = "Sorry no posts currently";
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
                
                        //her får vi ufiltrert rådata
                //console.log('her er all post data inni andre funksjon',allPostData);
                     console.log('allpostdata',allPostData);
                      
                //console.log('',authorName);
                //console.log('FILTERED POST DATA I ANDRE FUNKCJON',filteredPostData);
                
                
                
                return (
                    `
                    <hr class="border-gray-600">
                    <div class="flex flex-shrink-0 p-4 pb-0">
                    <!--<a href="/single-post.html?post_id=${postID}" class="flex-shrink-0 group block">-->
                    
                                <span class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                 
                                  </span>
                                  ${postBody}
                                
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
})()







.catch(err => {
    console.log("GET POSTS FAILED!!  😥😥😥");
    console.log(err);
   // //postsNotificationMessage.innerHTML = err
});
/*
export { postID }
console.log(postID)
*/


/*
async function getTheID() {
    
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

            const filteredPostData = allPostData[i];
            [filteredPostData].filter(item => !!item);

            const authorName = filteredPostData.author.name;
            //console.log('authorName',authorName);
            const authorEmail = filteredPostData.author.email;
            //console.log('authorEmail',authorEmail);

            const authorAvatar = filteredPostData.author.avatar;
            //console.log('authorAvatar',authorAvatar);

            const postTitle = filteredPostData.title;
            //console.log('postTitle',postTitle);
            
            const postBody = filteredPostData.body;
            //console.log('postBody',postBody);
            
            const postMediaString = filteredPostData.media;
            //console.log('postMediaString',postMediaString);
            
            const postReactionsArr = filteredPostData.reactions.length;
            //console.log('postReactionsArr',postReactionsArr);
            
            const postCommentsArr = filteredPostData.comments.length;
            //console.log('postCommentsArr',postCommentsArr);
            
            const postCreated = filteredPostData.created;
            //console.log('postCreated',postCreated);
            
            const postUpdated = filteredPostData.updated;
            //console.log('postUpdated',postUpdated);
            
            const postID = filteredPostData.id;
            //console.log('postID',postID);
            
            const countcomments = filteredPostData._count.comments;
            //console.log('countcomments',countcomments);
            
            const countreactions = filteredPostData._count.reactions;
            //console.log('countreactions',countreactions);
            }
        }   
        //Calls the function that fetches the data
        getAllPostInfo()
    })};
    getTheID();
        //let allPostData = [];
      */  
