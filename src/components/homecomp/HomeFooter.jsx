export default function HomeFooter() {
  return (
    <>
      <footer className="flex flex-col justify-end flex-grow h-screen ">
        <div className=" flex py-[1.125rem] px-6 justify-center items-center gap-10 border-t border-neutral-800 bg-neutral-1000  ">
          <button className="group ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              <g className="opacity-100 group-focus:opacity-0">
                <path
                  d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69ZM12 3L2 12H5V20H11V14H13V20H19V12H22L12 3Z"
                  fill="white"
                />
              </g>
              <g className="opacity-0 group-focus:opacity-100">
                <path
                  d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
                  fill="white"
                />
              </g>
            </svg>
          </button>
          <button className="group ">
            {" "}
            <svg
              className=" fill-none group-focus:fill-white "
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 18 18"
            >
              <path
                d="M1 15C1 13.9391 1.42143 12.9217 2.17157 12.1716C2.92172 11.4214 3.93913 11 5 11H13C14.0609 11 15.0783 11.4214 15.8284 12.1716C16.5786 12.9217 17 13.9391 17 15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17H3C2.46957 17 1.96086 16.7893 1.58579 16.4142C1.21071 16.0391 1 15.5304 1 15Z"
                stroke="white"
                strokeWidth={2}
                strokeLinejoin="round"
              />
              <path
                d="M9 7C10.6569 7 12 5.65685 12 4C12 2.34315 10.6569 1 9 1C7.34315 1 6 2.34315 6 4C6 5.65685 7.34315 7 9 7Z"
                stroke="white"
                strokeWidth={2}
              />
            </svg>
          </button>
        </div>
      </footer>
    </>
  );
}
