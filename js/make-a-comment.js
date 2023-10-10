import { BASE_URL_FOR_API } from "../js/api-related";
import { getToken } from "../js/local-storage-related";

const postId = window.location.search.split("=")[1];

const COMMENT_ON_ENTRY_URL =
  BASE_URL_FOR_API + `api/v1/social/posts/${postId}/comment`;

const commentField = document.getElementById("commentField");
const commentBtn = document.getElementById("commentBtn");
const commentErrorMsg = document.getElementById("commentErrorMsg");
const commentForm = document.getElementById("commentForm");

commentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let approvedCommentField = false;

  if (commentField.value.trim().length > 0) {
    commentErrorMsg.classList.add("hidden");
    approvedCommentField = true;
  } else {
    commentErrorMsg.classList.remove("hidden");
  }

  if (approvedCommentField) {
    const commentObject = {
      comment: commentField.value,
    };

    const bearerKey = getToken();

    (async function makeComment() {
      try {
        const response = await fetch(COMMENT_ON_ENTRY_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerKey}`,
          },
          body: JSON.stringify(commentObject),
        });

        if (response.ok) {
          const responseData = await response.json();
          window.location.reload(); // You might want to update the comments dynamically instead of reloading the page
          commentForm.reset();
        } else {
          const errorFromServer = await response.json();
          const errorMessage = "Something went wrong.";
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.log("Error from server when adding a new comment:", error);
      }
    })();
  } else {
    window.alert("There was an error. Please check your comment.");
  }
});
