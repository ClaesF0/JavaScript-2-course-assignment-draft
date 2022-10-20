
/*
console.log('ACCESS-ALL-POST-DETAILS INIT',);

import moment from "moment";
//import { stringify } from "postcss";
import {READ_POSTS_URL, RETRIEVE_POST_BY_ID, GET_PROFILEINFO_URL} from "../api-related"
import {getToken} from "../local-storage-related"

let now = moment(new Date()); //todays date
//moment correctly installed and running

const bearerKey = getToken();
if(!bearerKey){
    location.replace("signin.html")
}

let allPostData = [];

 
export async function getTheID() {
    
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
            //console.log('authorName',authorName);
            const authorEmail = entirePostData.author.email;
            //console.log('authorEmail',authorEmail);

            const authorAvatar = entirePostData.author.avatar;
            //console.log('authorAvatar',authorAvatar);

            const postTitle = entirePostData.title;
            //console.log('postTitle',postTitle);
            
            const postBody = entirePostData.body;
            //console.log('postBody',postBody);
            
            const postMediaString = entirePostData.media;
            //console.log('postMediaString',postMediaString);
            
            //const postReactionsArr = entirePostData.reactions.length;
            //console.log('postReactionsArr',postReactionsArr);
            
            const postCommentsArr = entirePostData.comments.length;
            //console.log('postCommentsArr',postCommentsArr);
            
            const postCreated = entirePostData.created;
            //console.log('postCreated',postCreated);
            const timestamp = moment(postCreated).fromNow();

            const postUpdated = entirePostData.updated;
            //console.log('postUpdated',postUpdated);
            const updatedTimestamp = "Updated "+moment(postCreated).fromNow();
            //console.log('updatedTimestamp',updatedTimestamp);
            
            const postID = entirePostData.id;
            //console.log('postID',postID);
            
            const countcomments = entirePostData._count.comments;
            //console.log('countcomments',countcomments);
            
            const countreactions = entirePostData._count.reactions;
            //console.log('countreactions',countreactions);
            
            return
            }
        }   
        //Calls the function that fetches the data
        getAllPostInfo()
    })};
    getTheID();
        


        

export function getAllPostInfo(){};
export { authorName }


console.log('ACCESS-ALL-POST-DETAILS-SUCCESS',);
*/
