import Tweet from "../../components/Tweet";
import HomeHeader, { ForyouTab } from "../../components/homecomp/HomeHeader";
import LeftSidebar from "../../components/homecomp/LeftSidebar";
import RightSidebar from "../../components/homecomp/RightSidebar";
import userAvatar from "../../assets/user-avatar.png";
import Button from "../../components/button";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function DesktopPage() {
  const [tweetText, setTweetText] = useState("");
  // const [isLoading, SetLoading] = useState(false);
  const { isLoading, SetLoading } = useContext(AuthContext);
  return (
    <div className="flex justify-center ">
      <div className="flex ">
        <LeftSidebar page="home" />
        <div className="w-[37.5rem] h-screen px-[0.0625rem] flex flex-col overflow-y-auto no-scrollbar ">
          <div className="flex p-4 border-b border-b-neutral-700 ">
            <p className=" text-neutral-50 font-Inter text-[1.1875rem] font-bold ">
              Home
            </p>
          </div>

          <ForyouTab />
          <div className="flex p-4 gap-3 border-b border-b-neutral-700 ">
            <img src={userAvatar} alt="user-avatar" />
            <textarea
              className="bg-inherit  w-full  mt-1.5 caret-twitter-blue focus:outline-none  resize-none
      rounded-md placeholder-neutral-500 text-base text-neutral-50"
              placeholder="What's happening?"
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
                      "https://one00xapi.onrender.com/api/post",
                      {
                        koko: tweetText,
                      },
                      {
                        withCredentials: true,
                      }
                    );
                    setTweetText("");
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
              {isLoading ? "Posting..." : "Post"}
            </Button>
          </div>

          <Tweet />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
