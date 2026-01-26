import { useContext, useState, useCallback } from "react";
import LeftSidebar from "../../components/homecomp/LeftSidebar";
import RightSidebar from "../../components/homecomp/RightSidebar";
import userAvatar from "../../assets/user-avatar.png";
import Button from "../../components/button";
import { AuthContext, ForyouTabContext } from "../../context/AuthContext";
import { convertBufferToDataURL } from "../../constants";
import ForyouTab from "../../components/homecomp/ForyouTab";
import { useCreatePost } from "../../hooks";
import SuspenseFeed from "../../components/SuspenseFeed";
import SuspenseFollowingFeed from "../../components/SuspenseFollowingFeed";

export default function DesktopPage() {
  const [tweetText, setTweetText] = useState("");
  const { tab } = useContext(ForyouTabContext);
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
    <div className="flex justify-center">
      <div className="flex">
        <LeftSidebar page="home" />
        <div className="w-[37.5rem] h-screen px-[0.0625rem] flex flex-col overflow-y-auto no-scrollbar">
          <div className="flex p-4 border-b border-b-neutral-700">
            <p className="text-neutral-50 font-Inter text-[1.1875rem] font-bold">
              Home
            </p>
          </div>
          <ForyouTab />
          <div className="flex p-4 gap-3 border-b border-b-neutral-700">
            {currentLogUser?.dp?.data ? (
              <img
                src={convertBufferToDataURL(currentLogUser.dp.data)}
                alt="user-avatar"
                className="w-14 rounded-full h-12"
              />
            ) : (
              <img src={userAvatar} alt="user-avatar" className="w-12 h-12" />
            )}
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
          {/* Suspense-enabled feeds with partial rendering */}
          <div className={`${!tab ? "hidden" : "block"}`}>
            <SuspenseFeed />
          </div>
          <div className={`${tab ? "hidden" : "block"}`}>
            <SuspenseFollowingFeed />
          </div>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
