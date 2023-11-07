import StepThreeMain from "../../components/step3comp/stepThreeMain";
import StepHeder from "../../components/stepHeader";

export default function Step3() {
  return (
    <div className=" flex h-screen px-tx pt-0 pb-5 flex-col items-start gap-3 shrink-0 bg-neutral-1000 rounded-2xl">
      <StepHeder number="3" />
      <StepThreeMain />
    </div>
  );
}
