import { Link } from "react-router-dom";

export default function TweetLink() {
  return (
    <>
      <Link to={"/tweet"}>
        <div className=" flex p-4 items-start gap-2.5 rounded-[2rem] bg-twitter-blue shadow-3xl fixed bottom-16 right-5 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M25.3333 17.3334H17.3333V25.3334H14.6667V17.3334H6.66666V14.6667H14.6667V6.66675H17.3333V14.6667H25.3333V17.3334Z"
              fill="#F9F9F9"
            />
          </svg>
        </div>
      </Link>
    </>
  );
}
