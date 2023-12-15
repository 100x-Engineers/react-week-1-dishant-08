import { useState, useContext } from "react";
import cancel from "../../assets/create-account-1-signup-x.svg";
import userAvatar from "../../assets/user-avatar.png";
import Button from "../../components/button";

import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

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
            onClick={async () => {
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
              } catch (error) {
                console.error("Error", error);
              }

              // setTweet([
              //   ...tweet,
              //   {
              //     id: tweet.length + 1,
              //     userId: 42,
              //     content: tweetText,
              //     postedAt: date.getSeconds(),E
              //   },
              // ]);
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
        <footer className=" py-3 px-4  flex items-start text-neutral-500 ">
          <span
            className={`${
              tweetText.length > 280 ? "text-red-600" : "text-neutral-500"
            }`}
          >
            {tweetText.length < 280 ? tweetText.length : 280 - tweetText.length}{" "}
          </span>
          <span>/280</span>
        </footer>
      </div>
    </>
  );
}
