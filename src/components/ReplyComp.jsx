import { useContext, useState, useCallback } from "react";
import userAvatar from "../assets/user-avatar.png";
import Button from "./button";
import { AuthContext } from "../context/AuthContext";
import { convertBufferToDataURL } from "../constants";
import { useReply } from "../hooks";

const ReplyComp = ({ postId, onSuccess }) => {
  const [tweetText, setTweetText] = useState("");
  const { currentLogUser } = useContext(AuthContext);
  const { reply, isLoading, error } = useReply();

  const handleReply = useCallback(async () => {
    if (!tweetText.trim() || isLoading) return;

    try {
      await reply(postId, tweetText);
      setTweetText("");
      onSuccess?.();
    } catch {
      // Error is handled by the hook
    }
  }, [tweetText, isLoading, reply, postId, onSuccess]);

  return (
    <div className="flex p-4 gap-3 border-b border-b-neutral-700">
      {currentLogUser?.dp?.data ? (
        <img
          src={convertBufferToDataURL(currentLogUser.dp.data)}
          alt="user-avatar"
          className="w-16 rounded-full h-12"
        />
      ) : (
        <img src={userAvatar} alt="user-avatar" className="w-12 h-12" />
      )}
      <div className="flex-1 flex flex-col gap-2">
        <textarea
          className="bg-inherit w-full mt-1.5 caret-twitter-blue focus:outline-none resize-none
          rounded-md placeholder-neutral-500 text-base text-neutral-50"
          placeholder="Post your reply"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
        />
        {error && (
          <p className="text-red-400 text-xs">Failed to post reply</p>
        )}
      </div>
      <Button
        variant="solidBlue"
        type="small"
        onClick={handleReply}
        isDisabled={isLoading || !tweetText.trim()}
      >
        {isLoading ? "Replying..." : "Reply"}
      </Button>
    </div>
  );
};

export default ReplyComp;
