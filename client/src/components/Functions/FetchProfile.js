// useFetchProfile.js

// export const FetchProfile = async (userName) => {
//   if (userName) {
//     await fetch("http://localhost:4000/profile", {
//       credentials: "include",
//     })
//       .then((response) => {
//         if (!response.ok) {
//           return response.text().then((text) => {
//             throw new Error(
//               `HTTP error! status: ${response.status}, message: ${text}`
//             );
//           });
//         }
//         return response.json();
//       })
//       .then((userInfo) => {
//         console.log("User info返しました：", userInfo);
//         return userInfo;
//       })
//       .catch((error) => {
//         console.error(
//           "There was a problem with the fetch operation:",
//           error.message
//         );
//       });
//   }
// };

// export const FetchProfile = async (userName) => {
//   if (!userName) return;

//   try {
//     const response = await fetch("http://localhost:4000/profile", {
//       credentials: "include",
//     });

//     if (!response.ok) {
//       const text = await response.text();
//       throw new Error(
//         `HTTP error! status: ${response.status}, message: ${text}`
//       );
//     }

//     const userInfo = await response.json();
//     console.log("User info返しました：", userInfo);
//     return userInfo;
//   } catch (error) {
//     console.error(
//       "There was a problem with the fetch operation:",
//       error.message
//     );
//   }
// };
export const FetchProfile = async (userName) => {
  console.log("FetchProfile----------------------");
  if (userName) {
    try {
      const response = await fetch("http://localhost:4000/profile", {
        credentials: "include",
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${text}`
        );
      }

      const userInfo = await response.json();
      return userInfo;
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
      throw error; // これにより呼び出し元でエラーをキャッチできます。
    }
  }
};