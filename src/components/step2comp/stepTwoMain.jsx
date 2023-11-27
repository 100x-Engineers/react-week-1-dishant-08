import Input from "../../components/input";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { BoldText } from "../../components/textcomp";

export default function StepTwoMain() {
  const navigate = useNavigate();
  return (
    <>
      <main className="flex flex-col items-start gap-5 self-stretch bg-neutral-1000 ">
        <div>
          <BoldText>Create your account</BoldText>
        </div>
        <Input name="Name" placeholder="Name" />
        <Input name="Email" placeholder="Email" />
        <Input name="Date Of Birth" placeholder="Date of Birth" />
      </main>
      <footer className="flex pt-20 h-screen sm:h-0 sm:pt-[170px]  flex-col justify-end w-full  items-center gap-2.5 flex-grow  flex-shrink-0 self-stretch">
        <Button
          variant="solidBlue"
          type="large"
          onClick={() => {
            navigate("/step3");
          }}
        >
          Sign Up
        </Button>
      </footer>
    </>
  );
}
