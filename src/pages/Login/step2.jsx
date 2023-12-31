import StepTwoMain from "../../components/step2comp/stepTwoMain";
import StepHeder from "../../components/stepHeader";

export default function Step2() {
  return (
    <>
      <div className=" flex  px-tx pt-0 pb-5 flex-col items-start w-screen h-screen z-40 md:w-auto md:h-auto gap-3 shrink-0 bg-neutral-1000 rounded-2xl">
        <StepHeder number="2" />
        <StepTwoMain />
      </div>
    </>
  );
}
