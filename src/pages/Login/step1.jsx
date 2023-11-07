import StepOneMain from "../../components/step1comp/stepOneMain";
import StepHeader from "../../components/stepHeader";

export default function Step1() {
  return (
    <div className=" flex px-tx pt-0 pb-5 bg-neutral-1000 w-full h-screen flex-col items-start gap-3 shrink-0  rounded-2xl">
      <StepHeader number="1" />
      <StepOneMain />
    </div>
  );
}
