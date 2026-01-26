import { useState, useCallback } from "react";
import cancel from "../../assets/create-account-1-signup-x.svg";
import userAvatar from "../../assets/user-avatar.png";
import Button from "../../components/button";
import { Link, useNavigate } from "react-router-dom";
import { useCreatePost } from "../../hooks";

export default function Compose() {
  const [tweetText, setTweetText] = useState("");
  const navigate = useNavigate();
  const { createPost, isLoading, error } = useCreatePost();

  const handlePost = useCallback(async () => {
    if (!tweetText.trim() || isLoading || tweetText.length > 280) return;

    try {
      await createPost(tweetText);
      setTweetText("");
      navigate("/home");
    } catch {
      // Error is handled by the hook
    }
  }, [tweetText, isLoading, createPost, navigate]);

  return (
    <div className="bg-neutral-1000 flex flex-col min-h-screen">
      <header className="flex justify-between items-end py-3 px-4">
        <Link to={-1}>
          <img src={cancel} alt="cross-button" />
        </Link>
        <Button
          variant="solidBlue"
          type="small"
          onClick={handlePost}
          isDisabled={isLoading || !tweetText.trim() || tweetText.length > 280}
        >
          {isLoading ? "Posting..." : "Post"}
        </Button>
      </header>
      <main className="flex-1">
        <div className="flex py-2 px-4 items-start gap-3">
          <img src={userAvatar} alt="user-avatar" />
          <div className="flex-1 flex flex-col">
            <textarea
              rows="20"
              className="bg-inherit w-full mt-1.5 caret-twitter-blue focus:outline-none resize-none
              rounded-md placeholder-neutral-500 text-base text-neutral-50"
              placeholder="What's happening?"
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
            />
            {error && (
              <p className="text-red-400 text-sm mt-2">
                Failed to post. Please try again.
              </p>
            )}
          </div>
        </div>
      </main>
      <footer className="py-3 px-4 flex items-start text-neutral-500">
        <span
          className={`${
            tweetText.length > 280 ? "text-red-600" : "text-neutral-500"
          }`}
        >
          {tweetText.length < 280 ? tweetText.length : 280 - tweetText.length}
        </span>
        <span>/280</span>
      </footer>
    </div>
  );
}
