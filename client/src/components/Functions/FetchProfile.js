// useFetchProfile.js
import { SERVER_URL } from "../../Constants";

export const FetchProfile = async (userName) => {
  // console.log("FetchProfile----------------------");
  if (userName) {
    try {
      const response = await fetch(`${SERVER_URL}/profile`, {
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
