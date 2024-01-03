import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Card from "./card";

import axios from "axios";
export default function Tweet() {
  const { tweet } = useContext(AuthContext);
  // const { render } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const { isLoading, render } = useContext(AuthContext);

  const getAllPosts = async () => {
    try {
      const response = await axios.get(
        "https://one00xapi.onrender.com/api/feed",
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };
  console.log(posts.content);
  useEffect(() => {
    getAllPosts();
  }, [isLoading, render]);

  return (
    <>
      {[...posts]
        .reverse()
        .map((twt) =>
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

      {/* {[...tweet].reverse().map((twt) => (
        <Card key={twt.id} text={twt.content} />
      ))} */}
    </>
  );
}
