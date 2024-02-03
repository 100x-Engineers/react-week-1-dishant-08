import React from "react";

import { useContext, useState } from "react";
import { AuthContext, ForyouTabContext } from "../../context/AuthContext";

export default function ForyouTab() {
  const { tab, setTab } = useContext(ForyouTabContext);

  return (
    <div className=" flex pt-5 px-20  pb-0 justify-center items-center gap-40  border-b  border-b-neutral-700 self-stretch ">
      <button
        className={` flex flex-col justify-center items-center gap-4   shrink-0 border-transparent ${
          tab ? "border-twitter-blue border-b-4" : " "
        }`}
        onClick={() => setTab(true)}
      >
        <span
          className={`font-Inter  text-fx text-neutral-50 font-semibold pb-2  ${
            tab ? " text-neutral-400 " : " "
          } `}
        >
          For you
        </span>
      </button>
      <button
        className={` flex flex-col justify-center items-center gap-4   shrink-0 border-transparent ${
          tab ? " " : "border-twitter-blue border-b-4"
        }`}
        onClick={() => setTab(false)}
      >
        <span
          className={`font-Inter  text-fx text-neutral-50 font-semibold pb-2  ${
            tab ? " " : " text-neutral-400 "
          } `}
        >
          Following
        </span>
      </button>
    </div>
  );
}
