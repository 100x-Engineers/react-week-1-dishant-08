import Input from "../../components/input";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { BoldText } from "../../components/textcomp";
import { DescriptionText } from "../../components/textcomp";

export default function StepThreeMain() {
  const navigate = useNavigate();

  return (
    <>
      <main className="flex flex-col items-start gap-5 self-stretch  ">
        <div className=" flex flex-col items-start gap-1 self-stretch">
          <BoldText>Create your account</BoldText>
          <DescriptionText>
            Enter it below to verify dishant.sahu@gmail.com
          </DescriptionText>
        </div>
        <div className=" flex flex-col items-end gap-3 self-stretch group ">
          <Input name="Verification code" placeholder="Verification code" />
          <p className="text-twitter-blue font-Inter text-[0.875rem] ">
            Didn’t receive a code?
          </p>
        </div>
      </main>
      <footer className="flex  pt-20 sm:h-0 sm:pt-[280px]  flex-col justify-end w-full  items-center gap-2.5 flex-grow  flex-shrink-0 self-stretch">
        <Button
          variant="default"
          type="next"
          onClick={() => {
            navigate("/step4");
          }}
        >
          Next
        </Button>
      </footer>
    </>
  );
}
