import { useNavigate } from "react-router-dom";
import calender from "../../assets/calendar-sv.svg";

import PropTypes from "prop-types"; // ES6
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Edit from "../../pages/userProfile/editProfile";
import { createPortal } from "react-dom";
import FollowBtn from "./followbtn";

UserHeader.propTypes = {
  userName: PropTypes.string,
  userFullname: PropTypes.string,
  bio: PropTypes.string,
  userImage: PropTypes.string.isRequired,
  UserBackground: PropTypes.string.isRequired,
  following: PropTypes.string,
  followers: PropTypes.string,
  bioLink: PropTypes.string,
};

export default function UserHeader({
  userName,
  userFullname,
  bio,
  userId,
  userImage,
  UserBackground,
  following,
  followers,
  bioLink,
  joinedAt,
}) {
  const navigate = useNavigate();
  // const {currentLogUser, setcurrentLogUser} = useContext(AuthContext)
  const { showEditModal, SetShowEditModal, currentLogUser, setcurrentLogUser } =
    useContext(AuthContext);
  // console.log(currentLogUser);
  return (
    <>
      <header className=" flex flex-col ">
        <div className="relative">
          <img
            className=" bg-cover w-full "
            src={UserBackground}
            alt="bg-image"
          />
          <img
            className=" absolute -bottom-8 left-3 border-4 rounded-[12.5rem]  border-neutral-1000 w-[4.25rem] h-[4.25rem] "
            src={userImage}
            alt="user-avatar"
          />
        </div>

        {/* <button
          className=" text-neutral-50 text-[1rem] font-medium font-Inter py-2 px-5 rounded-[1.875rem] mt-2 mr-4 border border-edit-stroke self-end "
          onClick={() => SetShowEditModal(true)}
        >
          Edit profile
        </button> */}
        {currentLogUser?.id === userId ? (
          <button
            className=" text-neutral-50 text-[1rem] font-medium font-Inter py-2 px-5 rounded-[1.875rem] mt-2 mr-4 border border-edit-stroke self-end "
            onClick={() => SetShowEditModal(true)}
          >
            Edit profile
          </button>
        ) : (
          <FollowBtn follower={currentLogUser?.id} following={userId} />
        )}

        {showEditModal &&
          createPortal(<Edit />, document.getElementById("portal"))}

        <div className="flex flex-col justify-end items-start gap-4 ml-5 mr-4 ">
          <div className="flex flex-col justify-end items-start gap-1">
            <div className=" text-neutral-50 font-Inter text-[1.25rem] font-bold  ">
              {userFullname}
            </div>
            <div className=" text-neutral-500 font-Inter text-tx ">
              @{userName}
            </div>
          </div>
          <div className="font-Inter text-neutral-50 text-fx ">{bio}</div>
          <div className="flex items-start gap-5">
            <div>
              <svg
                className="inline"
                xmlns="http://www.w3.org/2000/svg"
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M11.7981 7.97276C11.522 8.19723 11.1163 8.15593 10.8911 7.88043C10.6603 7.59817 10.7089 7.18094 10.9983 6.95925L12.1484 6.07833C13.2553 5.10389 13.3626 3.41668 12.3882 2.30984C11.4137 1.203 9.72651 1.09566 8.61967 2.0701L6.39198 4.03131C5.28514 5.00575 5.17781 6.69296 6.15225 7.79981C6.50763 8.20348 6.72173 8.39149 7.05031 8.47144C7.35654 8.54594 7.60816 8.79521 7.57754 9.10888C7.57358 9.14945 7.56499 9.18943 7.55193 9.22804L7.5476 9.24084C7.4508 9.52715 7.16824 9.71674 6.87174 9.65817C6.21567 9.52855 5.76817 9.25523 5.21403 8.62579C3.78341 7.00079 3.94099 4.52372 5.56599 3.0931L7.79369 1.13188C9.41869 -0.298735 11.8958 -0.14115 13.3264 1.48385C14.757 3.10886 14.5994 5.58593 12.9744 7.01655L11.7981 7.97276Z"
                  fill="#737373"
                />
                <path
                  d="M2.50584 7.02742C2.78196 6.80293 3.18766 6.8442 3.41291 7.11969C3.6437 7.40194 3.59515 7.81917 3.30572 8.04088L2.15566 8.92187C1.04888 9.89638 0.94165 11.5836 1.91616 12.6904C2.89067 13.7972 4.57789 13.9044 5.68467 12.9299L7.91223 10.9685C9.01901 9.99402 9.12624 8.3068 8.15173 7.20002C7.79632 6.79636 7.58221 6.60837 7.25362 6.52844C6.94739 6.45396 6.69575 6.2047 6.72636 5.89103C6.73031 5.85047 6.7389 5.81049 6.75195 5.77187L6.75628 5.75907C6.85306 5.47276 7.13562 5.28314 7.43212 5.3417C8.0882 5.47128 8.53571 5.74457 9.08989 6.37397C10.5206 7.99889 10.3632 10.476 8.73828 11.9067L6.51071 13.868C4.8858 15.2988 2.40872 15.1413 0.977996 13.5164C-0.452725 11.8915 -0.295301 9.41443 1.32961 7.98371L2.50584 7.02742Z"
                  fill="#737373"
                />
              </svg>
              <span className=" text-twitter-blue font-Inter ">{bioLink}</span>
            </div>
            <div>
              <img className="inline" src={calender} alt="calendar" />
              <span className="text-neutral-500 font-Inter text-fx ">
                {joinedAt}
              </span>
            </div>
          </div>
          <div className="flex items-end gap-5">
            <div>
              <span className="font-Inter text-fx font-medium text-neutral-50">
                {following}
              </span>
              <span className="font-Inter text-fx font-medium text-neutral-500">
                {" "}
                Following
              </span>
            </div>
            <div>
              <span className="font-Inter text-fx font-medium text-neutral-50">
                {followers}
              </span>
              <span className="font-Inter text-fx font-medium text-neutral-500">
                Followers
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
