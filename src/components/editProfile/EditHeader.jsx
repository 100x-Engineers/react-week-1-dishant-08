import { Link } from "react-router-dom";

export default function EditHeader() {
  return (
    <>
      <header className=" flex py-3 pr-4 justify-between items-center self-stretch ">
        <div className="flex items-center gap-5">
          <Link to={"/user"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={25}
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M12 19.5L5 12.5L12 5.5"
                stroke="#F9F9F9"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 12.5H5"
                stroke="#F9F9F9"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <span className="text-neutral-50 font-Inter text-fx font-bold">
            Edit profile
          </span>
        </div>
        <button className="bg-neutral-50 hover:bg-neutral-300 rounded-[1.875rem] flex items-center justify-center gap-2.5 py-2 px-5 shadow-3xl backdrop-blur-fx disabled:opacity-50">
          <div className="text-neutral-1000 font-Inter text-xs  font-bold">
            Save
          </div>
        </button>
      </header>
    </>
  );
}
