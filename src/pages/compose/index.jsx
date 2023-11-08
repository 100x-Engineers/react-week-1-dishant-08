import { useState, useContext } from "react";
import cancel from "../../assets/create-account-1-signup-x.svg";
import userAvatar from "../../assets/user-avatar.png";
import Button from "../../components/button";
import { AuthContext } from "../../context/AuthContext";

import { Link } from "react-router-dom";

export default function Compose() {
  const [tweetText, setTweetText] = useState("");
  const { tweet, setTweet } = useContext(AuthContext);
  const date = new Date();

  return (
    <>
      <div className="bg-neutral-1000 flex flex-col">
        <header className=" flex justify-between items-end py-3 px-4 ">
          <Link to={-1}>
            <img src={cancel} alt="cross-button" />
          </Link>
          <Button
            variant="solidBlue"
            type="small"
            onClick={() => {
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
            }}
          >
            Post
          </Button>
        </header>
        <main>
          <div className="flex  py-2 px-4  items-start gap-3">
            <img src={userAvatar} alt="user-avatar" />
            <textarea
              rows="20"
              className="bg-inherit  w-full  mt-1.5 caret-twitter-blue focus:outline-none  resize-none
      rounded-md placeholder-neutral-500 text-base text-neutral-50"
              placeholder="What's happening?"
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
            />
          </div>
        </main>
      </div>
    </>
  );
}
