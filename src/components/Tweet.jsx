import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Card from "./card";

import axios from "axios";
export default function Tweet() {
  const { tweet } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      {posts.map((twt) => (
        <Card
          key={twt.id}
          postId={twt.id}
          text={twt.content}
          time={twt.posted_at}
        />
      ))}
      {[...tweet].reverse().map((twt) => (
        <Card key={twt.id} text={twt.content} />
      ))}
    </>
  );
}
