import { AuthContext, ForyouTabContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Card from "./card";

import axios from "axios";
export default function Tweet() {
  const { tweet } = useContext(AuthContext);
  // const { render } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const { tab } = useContext(ForyouTabContext);
  const { isLoading, render } = useContext(AuthContext);
  const { currentLogUser, setcurrentLogUser } = useContext(AuthContext);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        "https://one00xapi.onrender.com/api/curuser",
        {
          withCredentials: true,
        }
      );
      const data = await response.data;
      setcurrentLogUser(data);
      // oncurrentLogUserChange(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getAllPosts = async () => {
    try {
      const response = await axios.get(
        "https://one00xapi.onrender.com/api/feed",
        {
          withCredentials: true,
        }
      );

      // console.log(response.data);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };
  // console.log(posts.content);
  useEffect(() => {
    getAllPosts();
  }, [isLoading, render]);

  // tab, setTab;

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
