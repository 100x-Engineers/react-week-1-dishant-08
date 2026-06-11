import ThreeDot from "../../assets/copy-link-vector.svg";

export default function TrendingBlock({ topic, posts }) {
  return (
    <>
      <div className="flex w-[21.875rem] py-2.5 px-tx gap-tx items-start ">
        <div className="flex flex-col items-start gap-[0.375rem] flex-grow  ">
          <div className="flex justify-center items-center gap-[0.375rem] self-stretch ">
            <p className="font-Inter text-xs text-neutral-500 flex-grow ">
              Trending
            </p>
            <img src={ThreeDot} alt="threeDot" />
          </div>
          <div className="text-neutral-50 font-Inter text-tx font-bold ">
            {topic}
          </div>
          <div className="text-neutral-500 font-Inter text-xs ">{posts}</div>
        </div>
      </div>
    </>
  );
}
