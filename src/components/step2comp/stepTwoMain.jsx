import Input from "../../components/input";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { BoldText } from "../../components/textcomp";

export default function StepTwoMain() {
  const navigate = useNavigate();
  // const validation =
  return (
    <>
      <main className="flex flex-col items-start gap-5 self-stretch bg-neutral-1000 ">
        <div>
          <BoldText>Create your account</BoldText>
        </div>
        <Input name="name" placeholder="Name" tick="true" />
        <Input name="email" placeholder="Email" tick="true" />
        <Input name="Date Of Birth" placeholder="Date of Birth" tick="true" />
      </main>
      <footer className="flex pt-20  md:pt-[180px]  flex-col justify-end w-full  items-center gap-2.5 flex-grow  flex-shrink-0 self-stretch">
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
