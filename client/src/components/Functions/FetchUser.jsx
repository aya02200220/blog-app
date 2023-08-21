export const FetchUser = async (userId) => {
  console.log("Fetch User ----------------------");
  if (userId) {
    try {
      const response = await fetch(`http://localhost:4000/profile/${userId}`, {
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
      throw error;
    }
  }
};
