import { useContext, useEffect, useState } from "react";
import Card from "./card";
import axios from "axios";
import { AuthContext, ForyouTabContext } from "../context/AuthContext";

export default function FollowingTweet() {
  const { isLoading, render } = useContext(AuthContext);
  const { tab } = useContext(ForyouTabContext);
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const response = await axios.get(
        "https://one00xapi.onrender.com/followingfeed",
        {
          withCredentials: true,
        }
      );

      console.log("FollowingTweet response:", response.data);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching following posts:", error.message);
    }
  };

  useEffect(() => {
    // Fetch posts only when tab is true
    if (tab) {
      getAllPosts();
    }
  }, [tab, isLoading, render]);

  return (
    <>
      {[...posts].map((twt) =>
        twt.content !== null ? (
          <Card
            key={twt.id}
            postId={twt.id}
            text={twt.content}
            userId={twt.user_id}
            time={twt.posted_at}
          />
        ) : null
      )}
    </>
  );
}
