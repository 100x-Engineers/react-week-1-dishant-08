import { useContext, useState, useCallback } from "react";
import userAvatar from "../../assets/user-avatar.png";
import Button from "../Button";
import { AuthContext } from "../../context/AuthContext";
import { useCreatePost } from "../../hooks";

export default function ComposeBox() {
  const [tweetText, setTweetText] = useState("");
  const { currentLogUser } = useContext(AuthContext);
  const { createPost, isLoading, error } = useCreatePost();

  const handlePost = useCallback(async () => {
    if (!tweetText.trim() || isLoading) return;

    try {
      await createPost(tweetText);
      setTweetText("");
    } catch {
      // Error is handled by the hook
    }
  }, [tweetText, isLoading, createPost]);

  return (
    <div className="flex p-4 gap-3 border-b border-b-neutral-700">
      <img
        src={currentLogUser?.dp || userAvatar}
        alt="user-avatar"
        className="w-12 rounded-full h-12 object-cover"
      />
      <div className="flex-1 flex flex-col gap-1">
        <textarea
          className="bg-inherit w-full mt-1.5 caret-twitter-blue focus:outline-none resize-none
          rounded-md placeholder-neutral-500 text-base text-neutral-50"
          placeholder="What's happening?"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
        />
        {error && (
          <p className="text-red-400 text-xs">Failed to post. Please try again.</p>
        )}
      </div>
      <Button
        variant="solidBlue"
        type="small"
        onClick={handlePost}
        isDisabled={isLoading || !tweetText.trim()}
      >
        {isLoading ? "Posting..." : "Post"}
      </Button>
    </div>
  );
}
