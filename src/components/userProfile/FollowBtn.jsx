import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const FollowBtn = ({ follower, following }) => {
  const [state, SetState] = useState(false);
  const { render, Setrender } = useContext(AuthContext);
  const Follow = async () => {
    try {
      const respone = await axios.post(
        "https://one00xapi.onrender.com/api/follow",
        {
          following_id: following,
        },
        {
          withCredentials: true,
        }
      );
      console.log(respone.data);
      SetState(true);
      Setrender(!render);
    } catch (error) {
      console.error(error, "Failed to follow");
    }
  };
  const Unfollow = async () => {
    try {
      const respone = await axios.post(
        "https://one00xapi.onrender.com/api/unfollow",
        {
          following_id: following,
        },
        {
          withCredentials: true,
        }
      );
      console.log(respone.data);
      SetState(false);
      Setrender(!render);
    } catch (error) {
      console.error(error, "Failed to follow");
    }
  };

  const getFollowingStatus = async () => {
    try {
      const response = await axios.get(
        `https://one00xapi.onrender.com/api/checkFollowStatus?following_id=${following}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      SetState(response.data.status);
    } catch (error) {
      console.error(error, "Failed to  Get Following Status");
    }
  };
  useEffect(() => {
    getFollowingStatus();
  }, []);
  useEffect(() => {
    following && getFollowingStatus();
  }, [following, render]);

  return (
    <>
      <button
        className={` ${
          !state ? "text-black  bg-white " : "text-neutral-50"
        }  text-[1rem] font-bold font-Inter py-2 px-5 rounded-[1.875rem] mt-2 mr-4 border border-edit-stroke self-end `}
        onClick={() => {
          if (state) Unfollow();
          else Follow();
        }}
      >
        {state ? "Following" : "Follow"}
      </button>
    </>
  );
};

export default FollowBtn;
