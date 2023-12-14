import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Card from "./card";

export default function Tweet() {
  const { tweet } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const response = await fetch("/api/feed");
      const data = await response.json();
      console.log(data);
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
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
