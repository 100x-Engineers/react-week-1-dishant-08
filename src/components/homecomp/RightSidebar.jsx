import TrendingBlock from "./Trendingblock";

export default function RightSidebar() {
  return (
    <>
      <div className="flex  flex-col items-start pt-2.5 pr-5 pb-0 pl-5 gap-tx  border-neutral-700 border-l ">
        <div className="group relative">
          <input
            type="search"
            name="search"
            placeholder="Search"
            className=" w-[21.75rem] h-[2.4375rem] pt-2.5 pr-[12.4375rem] bg-searchbar-fill pb-2.5 pl-[3.1275rem] shrink-0 rounded-[6249.9375rem] text-neutral-50 font-Inter text-fx focus:outline-none border focus:border-twitter-blue"
          />
          <svg
            width={17}
            height={17}
            viewBox="0 0 17 17"
            fill="currentcolor"
            className="sg absolute top-2.5 left-4 w-[1.1875rem] group-focus:text-twitter-blue"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="search">
              <path
                id="Vector"
                d="M16.0446 15.2054L13.1471 12.3079C14.1961 11.065 14.8334 9.46109 14.8334 7.70834C14.8334 3.77375 11.643 0.583336 7.70837 0.583336C3.77379 0.583336 0.583374 3.77375 0.583374 7.70834C0.583374 11.6429 3.77379 14.8333 7.70837 14.8333C9.46192 14.8333 11.065 14.1968 12.3064 13.1471L15.2039 16.0446C15.3202 16.1602 15.473 16.2188 15.6235 16.2188C15.7739 16.2188 15.9282 16.161 16.043 16.0446C16.2766 15.8126 16.2766 15.4374 16.0446 15.2054ZM1.77087 7.70834C1.77087 4.43479 4.43483 1.77084 7.70837 1.77084C10.9819 1.77084 13.6459 4.43479 13.6459 7.70834C13.6459 10.9819 10.9819 13.6458 7.70837 13.6458C4.43483 13.6458 1.77087 10.9819 1.77087 7.70834Z"
                fill="currentcolor"
              />
            </g>
          </svg>
        </div>

        <div className="flex flex-col items-start rounded-2xl bg-Card-fill ">
          <div className="flex py-2.5 px-tx ">
            <p className="text-neutral-50 font-Inter text-xl font-bold ">
              {" "}
              What’s happening{" "}
            </p>
          </div>
          <TrendingBlock topic="#Maduri" posts="2,345 posts" />
          <TrendingBlock topic="#Maduri" posts="2,345 posts" />
          <TrendingBlock topic="#Maduri" posts="2,345 posts" />
          <div className="flex p-tx items-start self-stretch text-twitter-blue ">
            <p className="font-Inter text-tx ">Show more </p>
          </div>
        </div>
      </div>
    </>
  );
}
