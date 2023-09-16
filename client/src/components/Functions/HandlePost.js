import { SERVER_URL } from "../../Constants";

export const deletePost = (postId) => {
  fetch(`${SERVER_URL}/post/${postId}`, {
    method: "DELETE",
    credentials: "include", // サーバー側でセッションやクッキーを使用している場合に必要
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        // console.log(data.message);
        // ポストが削除された後の処理（例: 画面の更新）
      }
    })
    .catch((error) => {
      console.error("Error deleting the post:", error);
    });
};
