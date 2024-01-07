import React, { useContext, useState } from "react";
import userAvatar from "../assets/user-avatar.png";
import Button from "./button";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { convertBufferToDataURL } from "../constants";

const ReplyComp = ({ postId }) => {
  const [tweetText, setTweetText] = useState("");
  // const [isLoading, SetLoading] = useState(false);
  const { isLoading, SetLoading, currentLogUser, replyrender, Setreplyrender } =
    useContext(AuthContext);
  return (
    <div className="flex p-4 gap-3 border-b border-b-neutral-700 ">
      {!!currentLogUser?.dp?.data ? (
        <img
          src={convertBufferToDataURL(currentLogUser?.dp?.data)}
          alt="user-avatar"
          className="w-16 rounded-full h-12"
        />
      ) : (
        <img src={userAvatar} alt="user-avatar" className="w-12 h-12" />
      )}
      <textarea
        className="bg-inherit  w-full  mt-1.5 caret-twitter-blue focus:outline-none  resize-none
        rounded-md placeholder-neutral-500 text-base text-neutral-50"
        placeholder="Post Your reply"
        value={tweetText}
        onChange={(e) => setTweetText(e.target.value)}
      />

      {/* value={tweetText}
                onChange={(e) => setTweetText(e.target.value)} */}
      <Button
        variant="solidBlue"
        type="small"
        onClick={async () => {
          if (tweetText != "" && !isLoading) {
            SetLoading(true);
            try {
              await axios.post(
                `https://one00xapi.onrender.com/api/reply/${postId}`,
                {
                  koko: tweetText,
                },
                {
                  withCredentials: true,
                }
              );
              setTweetText("");
              Setreplyrender(!replyrender);
              // window.location.reload(false);
            } catch (error) {
              console.error("Error", error);
            } finally {
              SetLoading(false);
            }
          }
        }}
        isDisabled={isLoading}
      >
        {isLoading ? "Replying..." : "Reply"}
      </Button>
    </div>
  );
};

export default ReplyComp;
