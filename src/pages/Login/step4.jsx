import StepFourMain from "../../components/step4comp/stepFourMain";
import StepHeder from "../../components/stepHeader";

export default function Step4() {
  return (
    <>
      <div className=" flex  px-tx pt-0 pb-5 flex-col gap-3 w-screen h-screen z-40 md:w-auto md:h-auto shrink-0 bg-neutral-1000 rounded-2xl">
        <StepHeder number="4" />
        <StepFourMain />
      </div>
    </>
  );
}
