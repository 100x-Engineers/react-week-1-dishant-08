import StepOneMain from "../../components/step1comp/stepOneMain";
import StepHeader from "../../components/stepHeader";

export default function Step1() {
  return (
    <div className=" flex  px-tx pt-0 pb-5 flex-col  w-screen h-screen z-40 md:w-auto md:h-auto gap-3 shrink-0 bg-neutral-1000 rounded-2xl">
      <StepHeader number="1" />
      <StepOneMain />
    </div>
  );
}
