import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { BoldText } from "../../components/TextComp";
import useSignupFlow from "../../hooks/useSignupFlow";

export default function StepTwoMain() {
  const navigate = useNavigate();
  const { data, serverError, isSubmitting, sendOtp } = useSignupFlow();

  return (
    <>
      <main className="flex flex-col items-start gap-5 self-stretch bg-neutral-1000 ">
        <div>
          <BoldText>Create your account</BoldText>
        </div>
        <Input
          name="name"
          placeholder="Name"
          tick="true"
          value={data.name}
          onChange={() => navigate(-1)}
        />
        <Input
          name="email"
          placeholder="Email"
          tick="true"
          value={data.email}
          onChange={() => navigate(-1)}
        />
        <Input
          name="Date Of Birth"
          placeholder="Date of Birth"
          tick="true"
          value={`${data.day} ${data.month} ${data.year}`}
          onChange={() => navigate(-1)}
        />
        {serverError && <p className="text-red-600">{serverError}</p>}
      </main>
      <footer className="flex pt-20  md:pt-[180px]  flex-col justify-end w-full  items-center gap-2.5 flex-grow  flex-shrink-0 self-stretch">
        <Button
          variant="solidBlue"
          type="large"
          isDisabled={isSubmitting}
          onClick={sendOtp}
        >
          {isSubmitting ? "Verifying Email" : "Sign Up"}
        </Button>
      </footer>
    </>
  );
}
