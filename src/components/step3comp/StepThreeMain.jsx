import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { BoldText, DescriptionText } from "../../components/TextComp";
import useSignupFlow from "../../hooks/useSignupFlow";

export default function StepThreeMain() {
  const navigate = useNavigate();
  const { data, errors, serverError, isSubmitting, setField, verifyOtp } =
    useSignupFlow();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        verifyOtp();
      }}
      className="flex flex-col h-screen md:h-full"
    >
      <main className="flex flex-col items-start gap-5 self-stretch">
        <div className="flex flex-col items-start gap-1 self-stretch">
          <BoldText>Create your account</BoldText>
          <DescriptionText>
            Enter the verification code sent to {data.email}
          </DescriptionText>
        </div>
        <div className="flex flex-col items-end gap-3 self-stretch group">
          <Input
            name="otp"
            placeholder="Verification code"
            value={data.otp}
            onChange={(e) => setField("otp", e.target.value)}
            disabled={isSubmitting}
            errors={errors.otp}
            touched={!!errors.otp}
          />
          <p
            className="text-twitter-blue font-Inter text-[0.875rem]"
            onClick={() => navigate(-1)}
          >
            Didn’t receive a code?
          </p>
        </div>
        {serverError && <p className="text-red-600">{serverError}</p>}
      </main>
      <footer className="flex pt-20 md:pt-[280px] flex-col justify-end w-full items-center gap-2.5 flex-grow flex-shrink-0 self-stretch">
        <Button variant="default" type="next" isDisabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Next"}
        </Button>
      </footer>
    </form>
  );
}
