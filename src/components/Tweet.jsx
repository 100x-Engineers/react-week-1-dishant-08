import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Card from "./card";

export default function Tweet() {
  const { tweet } = useContext(AuthContext);
  const [post, setPosts] = useState([]);
  const getAllPosts = async () => {
    const response = await fetch("/api/feed");
    const data = await response.json();
    console.log(data);
    setPosts(data.posts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // const handlePost = async() => {

  // }
  return (
    <>
      {post.map((twt) => {
        return (
          <Card
            key={twt.id}
            postId={twt.id}
            text={twt.content}
            time={twt.posted_at}
          />
        );
      })}
      {[...tweet].reverse().map((twt) => {
        return <Card key={twt.id} text={twt.content} />;
      })}
    </>
  );
}
