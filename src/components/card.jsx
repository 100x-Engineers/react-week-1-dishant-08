import { useContext, useEffect, useState } from "react";
import comment from "../assets/comment.svg";
import userAvatar from "../assets/user-avatar.png";
import PropTypes from "prop-types"; // ES6
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { convertBufferToDataURL } from "../constants";

import ReplyComp from "./ReplyComp";
import CardReplyComp from "./CardReplyComp";

Card.propTypes = {
  text: PropTypes.string.isRequired,
};

export default function Card({ text, time, postId, userId }) {
  const date = new Date();
  // console.log(postId);

  const [TrendingFocus, setTrendingFocus] = useState(false);
  const [likeFocus, setLikeFocus] = useState(null);
  const [AllLike, setAllLike] = useState(0);
  const [AllRepost, setAllRepost] = useState(0);
  const [like, setLike] = useState(false);
  const [currUser, SetCurrUser] = useState();
  const { render, Setrender, replyrender } = useContext(AuthContext);
  const [RetweetFocus, setRetweetFocus] = useState(false);
  const [shareFocus, setShareFocus] = useState(false);
  const likedPost = async () => {
    try {
      await axios.post(
        "https://one00xapi.onrender.com/api/like",
        {
          post_id: postId,
        },
        {
          withCredentials: true,
        }
      );
      setLike(true); // Set the like state to true
      setAllLike((prev) => prev + 1); // Increment the like count
    } catch (error) {
      console.error("Error", error);
    }
  };
  const rePost = async () => {
    try {
      await axios.post(
        `https://one00xapi.onrender.com/api/retweet/${postId}`,
        null,
        {
          withCredentials: true,
        }
      );
      setRetweetFocus(true); // Set the retweet state to true
      setAllRepost((prev) => prev + 1); // Increment the like count
    } catch (error) {
      console.error("Error", error);
    }
  };

  const unrePost = async () => {
    try {
      await axios.delete(
        `https://one00xapi.onrender.com/api/unretweet/${postId}`,
        {
          withCredentials: true,
        }
      );
      setRetweetFocus(false); // Set the like state to false
      setAllRepost((prev) => prev - 1); // Decrement the like count
    } catch (error) {
      console.error("Error", error);
    }
  };
  const unlikedPost = async () => {
    try {
      await axios.delete(
        `https://one00xapi.onrender.com/api/unlike/${postId}`,
        {
          withCredentials: true,
        }
      );
      setLike(false); // Set the like state to false
      setAllLike((prev) => prev - 1); // Decrement the like count
    } catch (error) {
      console.error("Error", error);
    }
  };

  const getAllLikedPost = async () => {
    try {
      const likesData = await axios.get(
        `https://one00xapi.onrender.com/api/getlike/${postId}`,
        {
          withCredentials: true,
        }
      );
      // console.log(likesData);
      setAllLike(likesData?.data?.count);
      setLike(likesData?.data?.likedPost);
      // setLikeFocus(!likeFocus)
    } catch (error) {
      console.error("Error", error);
    }
  };
  const getAllrePost = async () => {
    try {
      const likesData = await axios.get(
        `https://one00xapi.onrender.com/api/getretweet/${postId}`,
        {
          withCredentials: true,
        }
      );
      // console.log(likesData);
      setAllRepost(likesData?.data?.repostCount);
      setRetweetFocus(likesData?.data?.isRePost);
      // setLikeFocus(!likeFocus)
    } catch (error) {
      console.error("Error", error);
    }
  };
  const [replyData, SetReplyData] = useState();
  const getReplyPost = async () => {
    try {
      const replyDataArr = await axios.get(
        `https://one00xapi.onrender.com/api/replyfeed/${postId}`,
        {
          withCredentials: true,
        }
      );
      // console.log(likesData);
      SetReplyData(replyDataArr?.data);
      // SetReplyData(replyData?.data?.count);
      // setAllRepost(likesData?.data?.repostCount);
      // setRetweetFocus(likesData?.data?.isRePost);
      //
      // setLikeFocus(!likeFocus)
    } catch (error) {
      console.error("Error", error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        `https://one00xapi.onrender.com/api/getUserbyId/${userId}`,
        {
          withCredentials: true,
        }
      );
      const data = await response.data;
      // setPageId(data);
      SetCurrUser(data);
      // onPageIdChange(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    userId && getCurrentUser();
  }, [userId]);

  useEffect(() => {
    postId && getReplyPost();
  }, [replyrender]);

  useEffect(() => {
    // if (likeFocus === true) likedPost();
    // if (likeFocus === false) unlikedPost();

    postId && getAllLikedPost();
  }, [like]);
  useEffect(() => {
    // if (likeFocus === true) likedPost();
    // if (likeFocus === false) unlikedPost();

    postId && getAllrePost();
  }, [RetweetFocus]);

  const timeStamp = moment(time).fromNow();
  const [commentOpen, SetCommentOpen] = useState(false);
  // console.log(time, timeStamp);

  return (
    <div>
      <article className="flex py-2 px-4  gap-4 border-b border-b-neutral-700">
        <Link
          to={`/user/${currUser?.currUser}`}
          onClick={() => Setrender(!render)}
        >
          {!!currUser?.dp?.data ? (
            <img
              src={convertBufferToDataURL(currUser?.dp?.data)}
              alt="user-avatar"
              className="w-12 rounded-full h-12"
            />
          ) : (
            <img src={userAvatar} alt="user-avatar" className="w-12 h-12" />
          )}
        </Link>
        <div className="flex flex-col items-center gap-2 self-stretch flex-1 flex-shrink-0 flex-basis-0">
          <div className="flex flex-col items-start gap-1 self-stretch">
            <div className="flex items-center gap-[0.0625rem] self-stretch">
              <span className="text-neutral-50 font-Inter text-[1rem] font-semibold">
                {currUser?.disName}
              </span>
              <span className="font-Inter text-[1rem] font-normal text-neutral-500">
                @{currUser?.currUser} •{" "}
                {timeStamp ? timeStamp : date.getSeconds() + "s"}{" "}
              </span>
            </div>
            <div className="self-stretch text-neutral-50 font-Inter text-[1rem]">
              {text}
            </div>
          </div>
          <div className="flex py-3 px-0 justify-between items-center self-stretch">
            <div
              onClick={() => {
                SetCommentOpen(!commentOpen);
              }}
              className="flex justify-center items-center gap-[0.3125rem]"
            >
              {/* <img src={comment} alt="comment" /> */}
              {!commentOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M12.1092 9.64524L8.03202 13.1684V11.3646V10.6146H7.28202H5.56048C2.90372 10.6146 0.75 8.46089 0.75 5.80413C0.75 3.14738 2.90373 0.993652 5.56048 0.993652H8.88896C11.609 0.993652 13.814 3.19869 13.814 5.91874C13.814 7.34959 13.1918 8.7097 12.1092 9.64524Z"
                    stroke="#525252"
                    strokeWidth="1.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M12.1092 9.64524L8.03202 13.1684V11.3646V10.6146H7.28202H5.56048C2.90372 10.6146 0.75 8.46089 0.75 5.80413C0.75 3.14738 2.90373 0.993652 5.56048 0.993652H8.88896C11.609 0.993652 13.814 3.19869 13.814 5.91874C13.814 7.34959 13.1918 8.7097 12.1092 9.64524Z"
                    stroke="#1D9BF0"
                    strokeWidth="2.0"
                  />
                </svg>
              )}
              <span
                className={`font-Inter text-xs font-normal ${
                  commentOpen ? "text-twitter-blue " : "text-neutral-500"
                } `}
              >
                {replyData?.count}
              </span>
            </div>

            <button
              className="flex justify-center items-center gap-[0.3125rem]"
              // onClick={() => setRetweetFocus(!RetweetFocus)}
              onClick={() => {
                if (RetweetFocus) {
                  unrePost();
                } else {
                  rePost();
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={21}
                height={15}
                viewBox="0 0 21 15"
                fill="none"
              >
                <g className={` ${!RetweetFocus ? "block" : "hidden"}`}>
                  <path
                    d="M3.72097 1.48621L1.56409 3.64312M3.72097 1.48621L5.87787 3.64312M3.72097 1.48621L3.72097 10.7214C3.72097 12.2918 4.99404 13.5649 6.56445 13.5649L11.4858 13.5649"
                    stroke="#525252"
                    strokeWidth="1.42174"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.2507 13.5649L19.4076 11.408M17.2507 13.5649L15.0938 11.408M17.2507 13.5649L17.2507 4.32975C17.2507 2.75934 15.9776 1.48627 14.4072 1.48627L9.48585 1.48627"
                    stroke="#525252"
                    strokeWidth="1.42174"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <g className={` ${RetweetFocus ? "block" : "hidden"}`}>
                  <path
                    d="M3.15688 1.48621L1 3.64312M3.15688 1.48621L5.31379 3.64312M3.15688 1.48621L3.15688 10.7214C3.15688 12.2918 4.42995 13.5649 6.00037 13.5649L10.9217 13.5649"
                    stroke="#00BE74"
                    strokeWidth="1.42174"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.6866 13.5649L18.8435 11.408M16.6866 13.5649L14.5297 11.408M16.6866 13.5649L16.6866 4.32975C16.6866 2.75934 15.4136 1.48627 13.8431 1.48627L8.92177 1.48627"
                    stroke="#00BE74"
                    strokeWidth="1.42174"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <span
                className={` font-Inter text-xs font-normal  ${
                  RetweetFocus ? "text-Success" : " text-neutral-500"
                } `}
              >
                {AllRepost}
              </span>
            </button>

            {/* <button
              className="flex justify-center items-center gap-[0.3125rem]"
              // className={likeFocus ? "group" : ""}
              onClick={() => {
                
                setLikeFocus(!likeFocus);
                // likeFocus ? likedPost() : unlikedPost();
              }}
              // onClick={() => }
            > */}
            <button
              className="flex justify-center items-center gap-[0.3125rem]"
              onClick={() => {
                if (like) {
                  unlikedPost();
                } else {
                  likedPost();
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={17}
                height={17}
                viewBox="0 0 17 17"
                fill="none"
              >
                <g className={` ${!like ? "block" : "hidden"}`}>
                  <path
                    d="M8.68949 3.88656L8.06479 3.10989C6.34036 0.96597 3.18154 1.31923 1.8957 3.79981C1.27525 4.99675 1.24436 7.42586 1.81333 8.65259C3.72921 12.7834 7.31758 14.7369 8.0055 15.0815C8.08262 15.1201 8.1527 15.1687 8.22534 15.2152C8.54725 15.4213 8.95834 15.3954 9.25784 15.1376C9.31419 15.089 13.4404 13.2347 15.5657 8.65259C16.1346 7.42586 16.1037 4.99675 15.4833 3.79981C14.1974 1.31923 10.51 0.723394 8.68949 3.88656Z"
                    stroke="#525252"
                    strokeWidth="1.5"
                  />
                </g>
                {/* <g className={` ${likeFocus || like ? "block" : "hidden"}`}> */}
                <g className={` ${like ? "block" : "hidden"}`}>
                  <path
                    d="M8.12553 3.88656L7.50083 3.10989C5.77639 0.96597 2.61758 1.31923 1.33173 3.79981C0.711282 4.99675 0.680397 7.42586 1.24936 8.65259C3.16525 12.7834 6.75362 14.7369 7.44153 15.0815C7.51865 15.1201 7.58873 15.1687 7.66137 15.2152C7.98329 15.4213 8.39438 15.3954 8.69387 15.1376C8.75023 15.089 12.8765 13.2347 15.0017 8.65259C15.5707 7.42586 15.5398 4.99675 14.9193 3.79981C13.6335 1.31923 9.94603 0.723394 8.12553 3.88656Z"
                    fill="#F4245E"
                    stroke="#F4245E"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
              <span
                className={` font-Inter text-xs font-normal  ${
                  like ? "text-red-like" : " text-neutral-500"
                } `}
              >
                {AllLike}
              </span>
            </button>

            <div className="flex justify-center items-center gap-[0.3125rem]">
              <button
                // className={ ? "group" : ""}
                onClick={() => setTrendingFocus(!TrendingFocus)}
              >
                <svg
                  width={13}
                  height={15}
                  viewBox="0 0 13 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className={` ${!TrendingFocus ? "block" : "hidden"}`}>
                    <rect
                      x="0.971558"
                      y="5.81122"
                      width="1.71429"
                      height="9.14287"
                      fill="#525252"
                    />
                    <rect
                      x="4.40027"
                      y="0.0969849"
                      width="1.71429"
                      height="14.8572"
                      fill="#525252"
                    />
                    <rect
                      x="7.82874"
                      y="8.09692"
                      width="1.71429"
                      height="6.85715"
                      fill="#525252"
                    />
                    <rect
                      x="11.2573"
                      y="3.52551"
                      width="1.71429"
                      height="11.4286"
                      fill="#525252"
                    />
                  </g>
                  <g className={` ${TrendingFocus ? "block" : "hidden"}`}>
                    <rect
                      x="0.907593"
                      y="5.81122"
                      width="1.71429"
                      height="9.14287"
                      fill="#1D9BF0"
                    />
                    <rect
                      x="4.3363"
                      y="0.0969849"
                      width="1.71429"
                      height="14.8572"
                      fill="#1D9BF0"
                    />
                    <rect
                      x="7.76477"
                      y="8.09692"
                      width="1.71429"
                      height="6.85715"
                      fill="#1D9BF0"
                    />
                    <rect
                      x="11.1934"
                      y="3.52551"
                      width="1.71429"
                      height="11.4286"
                      fill="#1D9BF0"
                    />
                  </g>
                </svg>
              </button>
              <span
                className={` font-Inter text-xs font-normal  ${
                  TrendingFocus ? "text-twitter-blue" : " text-neutral-500"
                } `}
              >
                99.6K
              </span>
            </div>
            <div>
              {/* h-17 */}
              <button
                // className={`group ${shareFocus ? 'focus:opacity-0' : 'group-focus:opacity-100'}`}
                onClick={() => setShareFocus(!shareFocus)}
              >
                <svg
                  width={17}
                  height={17}
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className={` ${!shareFocus ? "block" : "hidden"}`}>
                    <path
                      id="share-sv_2"
                      d="M13.7217 17.0256C13.0133 17.0256 12.4113 16.7777 11.9154 16.2818C11.4196 15.786 11.1717 15.1839 11.1717 14.4756C11.1717 14.3764 11.1788 14.2736 11.1929 14.167C11.2071 14.0605 11.2283 13.965 11.2567 13.8806L5.26418 10.3956C5.02335 10.6081 4.75418 10.7747 4.45668 10.8954C4.15918 11.0161 3.84751 11.0761 3.52168 11.0756C2.81335 11.0756 2.21126 10.8277 1.71543 10.3318C1.2196 9.83599 0.97168 9.23391 0.97168 8.52557C0.97168 7.81724 1.2196 7.21516 1.71543 6.71932C2.21126 6.22349 2.81335 5.97557 3.52168 5.97557C3.84751 5.97557 4.15918 6.03592 4.45668 6.15662C4.75418 6.27732 5.02335 6.44364 5.26418 6.65557L11.2567 3.17057C11.2283 3.08557 11.2071 2.99009 11.1929 2.88412C11.1788 2.77816 11.1717 2.67531 11.1717 2.57557C11.1717 1.86724 11.4196 1.26516 11.9154 0.769324C12.4113 0.27349 13.0133 0.0255737 13.7217 0.0255737C14.43 0.0255737 15.0321 0.27349 15.5279 0.769324C16.0238 1.26516 16.2717 1.86724 16.2717 2.57557C16.2717 3.28391 16.0238 3.88599 15.5279 4.38182C15.0321 4.87766 14.43 5.12557 13.7217 5.12557C13.3958 5.12557 13.0842 5.06551 12.7867 4.94537C12.4892 4.82524 12.22 4.65864 11.9792 4.44557L5.98668 7.93057C6.01501 8.01557 6.03626 8.11134 6.05043 8.21787C6.0646 8.32441 6.07168 8.42697 6.07168 8.52557C6.07168 8.62474 6.0646 8.72759 6.05043 8.83412C6.03626 8.94066 6.01501 9.03614 5.98668 9.12057L11.9792 12.6056C12.22 12.3931 12.4892 12.2268 12.7867 12.1066C13.0842 11.9865 13.3958 11.9261 13.7217 11.9256C14.43 11.9256 15.0321 12.1735 15.5279 12.6693C16.0238 13.1652 16.2717 13.7672 16.2717 14.4756C16.2717 15.1839 16.0238 15.786 15.5279 16.2818C15.0321 16.7777 14.43 17.0256 13.7217 17.0256ZM13.7217 3.42557C13.9625 3.42557 14.1645 3.34397 14.3277 3.18077C14.4909 3.01757 14.5722 2.81584 14.5717 2.57557C14.5717 2.33474 14.4901 2.13272 14.3269 1.96952C14.1637 1.80632 13.9619 1.72501 13.7217 1.72557C13.4808 1.72557 13.2788 1.80717 13.1156 1.97037C12.9524 2.13357 12.8711 2.33531 12.8717 2.57557C12.8717 2.81641 12.9533 3.01842 13.1165 3.18162C13.2797 3.34482 13.4814 3.42614 13.7217 3.42557ZM3.52168 9.37557C3.76251 9.37557 3.96453 9.29397 4.12773 9.13077C4.29093 8.96757 4.37225 8.76584 4.37168 8.52557C4.37168 8.28474 4.29008 8.08272 4.12688 7.91952C3.96368 7.75632 3.76195 7.67501 3.52168 7.67557C3.28085 7.67557 3.07883 7.75717 2.91563 7.92037C2.75243 8.08357 2.67111 8.28531 2.67168 8.52557C2.67168 8.76641 2.75328 8.96842 2.91648 9.13162C3.07968 9.29482 3.28141 9.37614 3.52168 9.37557ZM13.7217 15.3256C13.9625 15.3256 14.1645 15.244 14.3277 15.0808C14.4909 14.9176 14.5722 14.7158 14.5717 14.4756C14.5717 14.2347 14.4901 14.0327 14.3269 13.8695C14.1637 13.7063 13.9619 13.625 13.7217 13.6256C13.4808 13.6256 13.2788 13.7072 13.1156 13.8704C12.9524 14.0336 12.8711 14.2353 12.8717 14.4756C12.8717 14.7164 12.9533 14.9184 13.1165 15.0816C13.2797 15.2448 13.4814 15.3261 13.7217 15.3256Z"
                      fill="#525252"
                    />
                  </g>
                  <g className={` ${shareFocus ? "block" : "hidden"}`}>
                    <path
                      id="share-sv_2"
                      d="M13.6576 17.0256C12.9493 17.0256 12.3472 16.7777 11.8513 16.2818C11.3555 15.786 11.1076 15.1839 11.1076 14.4756C11.1076 14.3764 11.1147 14.2736 11.1288 14.167C11.143 14.0605 11.1643 13.965 11.1926 13.8806L5.20009 10.3956C4.95926 10.6081 4.69009 10.7747 4.39259 10.8954C4.09509 11.0161 3.78343 11.0761 3.45759 11.0756C2.74926 11.0756 2.14718 10.8277 1.65134 10.3318C1.15551 9.83599 0.907593 9.23391 0.907593 8.52557C0.907593 7.81724 1.15551 7.21516 1.65134 6.71932C2.14718 6.22349 2.74926 5.97557 3.45759 5.97557C3.78343 5.97557 4.09509 6.03592 4.39259 6.15662C4.69009 6.27732 4.95926 6.44364 5.20009 6.65557L11.1926 3.17057C11.1643 3.08557 11.143 2.99009 11.1288 2.88412C11.1147 2.77816 11.1076 2.67531 11.1076 2.57557C11.1076 1.86724 11.3555 1.26516 11.8513 0.769324C12.3472 0.27349 12.9493 0.0255737 13.6576 0.0255737C14.3659 0.0255737 14.968 0.27349 15.4638 0.769324C15.9597 1.26516 16.2076 1.86724 16.2076 2.57557C16.2076 3.28391 15.9597 3.88599 15.4638 4.38182C14.968 4.87766 14.3659 5.12557 13.6576 5.12557C13.3318 5.12557 13.0201 5.06551 12.7226 4.94537C12.4251 4.82524 12.1559 4.65864 11.9151 4.44557L5.92259 7.93057C5.95093 8.01557 5.97218 8.11134 5.98634 8.21787C6.00051 8.32441 6.00759 8.42697 6.00759 8.52557C6.00759 8.62474 6.00051 8.72759 5.98634 8.83412C5.97218 8.94066 5.95093 9.03614 5.92259 9.12057L11.9151 12.6056C12.1559 12.3931 12.4251 12.2268 12.7226 12.1066C13.0201 11.9865 13.3318 11.9261 13.6576 11.9256C14.3659 11.9256 14.968 12.1735 15.4638 12.6693C15.9597 13.1652 16.2076 13.7672 16.2076 14.4756C16.2076 15.1839 15.9597 15.786 15.4638 16.2818C14.968 16.7777 14.3659 17.0256 13.6576 17.0256ZM13.6576 3.42557C13.8984 3.42557 14.1004 3.34397 14.2636 3.18077C14.4268 3.01757 14.5082 2.81584 14.5076 2.57557C14.5076 2.33474 14.426 2.13272 14.2628 1.96952C14.0996 1.80632 13.8979 1.72501 13.6576 1.72557C13.4168 1.72557 13.2147 1.80717 13.0515 1.97037C12.8883 2.13357 12.807 2.33531 12.8076 2.57557C12.8076 2.81641 12.8892 3.01842 13.0524 3.18162C13.2156 3.34482 13.4173 3.42614 13.6576 3.42557ZM3.45759 9.37557C3.69843 9.37557 3.90044 9.29397 4.06364 9.13077C4.22684 8.96757 4.30816 8.76584 4.30759 8.52557C4.30759 8.28474 4.22599 8.08272 4.06279 7.91952C3.89959 7.75632 3.69786 7.67501 3.45759 7.67557C3.21676 7.67557 3.01474 7.75717 2.85154 7.92037C2.68834 8.08357 2.60703 8.28531 2.60759 8.52557C2.60759 8.76641 2.68919 8.96842 2.85239 9.13162C3.01559 9.29482 3.21733 9.37614 3.45759 9.37557ZM13.6576 15.3256C13.8984 15.3256 14.1004 15.244 14.2636 15.0808C14.4268 14.9176 14.5082 14.7158 14.5076 14.4756C14.5076 14.2347 14.426 14.0327 14.2628 13.8695C14.0996 13.7063 13.8979 13.625 13.6576 13.6256C13.4168 13.6256 13.2147 13.7072 13.0515 13.8704C12.8883 14.0336 12.807 14.2353 12.8076 14.4756C12.8076 14.7164 12.8892 14.9184 13.0524 15.0816C13.2156 15.2448 13.4173 15.3261 13.6576 15.3256Z"
                      fill="#1D9BF0"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>
      {commentOpen &&
        [...replyData.posts]
          .reverse()
          .map((twt) =>
            twt.content !== null ? (
              <CardReplyComp
                key={twt.id}
                postId={twt.id}
                text={twt.content}
                userId={twt.user_id}
                time={twt.posted_at}
              />
            ) : null
          )}
      {commentOpen && <ReplyComp postId={postId} />}
    </div>
  );
}
