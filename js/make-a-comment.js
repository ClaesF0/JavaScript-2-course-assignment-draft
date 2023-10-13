//import { on } from "npm/lib/npm";
import { BASE_URL_FOR_API } from "../js/api-related";
import { getToken } from "../js/local-storage-related";

document.addEventListener("DOMContentLoaded", () => {
  console.log("make a comment");
  //getAllPosts();
  const postId = window.location.search.split("=")[1];
  const COMMENT_ON_ENTRY_URL =
    BASE_URL_FOR_API + `api/v1/social/posts/${postId}/comment`;
  const commentForm = document.getElementById("commentForm?" + postId);
  const commentField = document.getElementById("commentField?" + postId);
  const commentBtn = document.getElementById("commentBtn?" + postId);
  const commentErrorMsg = document.getElementById("commentErrorMsg");
  const bearerKey = getToken();
  console.log("postId window.location.search.split(''='')[1]", postId);
  console.log("commentForm", commentForm);
  console.log("commentField", commentField);
  console.log("commentBtn", commentBtn);
  console.log("commentErrorMsg", commentErrorMsg);
  console.log("bearerKey", bearerKey);

  console.log("COMMENT_ON_ENTRY_URL:", COMMENT_ON_ENTRY_URL);

  commentBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    onCommentBtnClick();
    console.log("commentBtn.addEventListener");

    const commentText = commentField.value.trim();
    console.log("Headers:", {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerKey}`,
    });
    console.log("Request Body:", JSON.stringify({ comment: commentText }));
    if (commentText.length > 0) {
      commentErrorMsg.classList.add("hidden");

      try {
        console.log("postId window.location.search.split(''='')[1]", postId);
        const COMMENT_ON_ENTRY_URL =
          BASE_URL_FOR_API + `api/v1/social/posts/${postId}/comment`;

        const response = await fetch(COMMENT_ON_ENTRY_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerKey}`,
          },
          body: JSON.stringify({ comment: commentText }),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Comment added successfully:", responseData);

          // Optionally, you can update the UI here
        } else {
          const errorFromServer = await response.json();
          console.error("Error from server:", errorFromServer);
          console.error("Error Response:", response);
          const err = await response.json();
          console.error(err);
          return;
        }
      } catch (error) {
        console.error("Error when adding a new comment:", error);
      }
    } else {
      commentErrorMsg.classList.remove("hidden");
    }
  });
});
