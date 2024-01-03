import cancel from "../../assets/create-account-1-signup-x.svg";
import userAvatar from "../../assets/user-avatar.png";
import Button from "../button";

import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { convertBufferToDataURL } from "../../constants";

export default function TweetModal() {
  const { showTweetModal, SetShowTweetModal, currentLogUser } =
    useContext(AuthContext);
  const [tweetText, setTweetText] = useState("");
  const { isLoading, SetLoading } = useContext(AuthContext);

  return (
    <>
      <div className="bg-neutral-1000 flex flex-col rounded-2xl z-40 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-70%]  w-[32rem] ">
        <header className=" flex justify-between items-end py-3 px-4 ">
          <button onClick={() => SetShowTweetModal(false)}>
            <img src={cancel} alt="cross-button" />
          </button>
        </header>
        <main>
          <div className="flex  py-2 px-4  items-start gap-3">
            {!!currentLogUser?.dp?.data ? (
              <img
                src={convertBufferToDataURL(currentLogUser?.dp?.data)}
                alt="user-avatar"
                className="w-14 rounded-full h-12"
              />
            ) : (
              <img src={userAvatar} alt="user-avatar" className="w-12 h-12" />
            )}
            <textarea
              rows="10"
              className="bg-inherit  w-full  mt-1.5 caret-twitter-blue focus:outline-none  resize-none
        rounded-md placeholder-neutral-500 text-base text-neutral-50"
              placeholder="What's happening?"
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
            />
          </div>
        </main>
        <footer className=" py-3 px-4  flex justify-between text-neutral-500 ">
          <div>
            <span
              className={`${
                tweetText.length > 280 ? "text-red-600" : "text-neutral-500"
              }`}
            >
              {tweetText.length < 280
                ? tweetText.length
                : 280 - tweetText.length}{" "}
            </span>
            <span>/280</span>
          </div>

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
                  SetShowTweetModal(false);
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
          {/* onClick={() => {
                setTweet([
                  ...tweet,
                  {
                    id: tweet.length + 1,
                    userId: 42,
                    content: tweetText,
                    postedAt: date.getSeconds(),
                  },
                ]);
                setTweetText("");
              }} */}
        </footer>
      </div>
    </>
  );
}
