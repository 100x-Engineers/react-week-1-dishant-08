import { useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { BoldText, DescriptionText } from "../../components/textcomp";
import useSignupFlow from "../../hooks/useSignupFlow";

export default function StepFourMain() {
  const [showPassword, setShowPassword] = useState(false);
  const { data, errors, serverError, isSubmitting, setField, submitSignup } =
    useSignupFlow();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitSignup();
      }}
      className="flex flex-col h-screen md:h-full"
    >
      <main className="flex flex-col items-start gap-5 self-stretch">
        <div className="flex flex-col items-start gap-1 self-stretch">
          <BoldText>Pick a username & password</BoldText>
          <DescriptionText>
            Your username is unique. The password must be 8 characters or more.
          </DescriptionText>
        </div>
        <div className="w-full">
          <Input
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={(e) => setField("username", e.target.value)}
            disabled={isSubmitting}
            errors={errors.username}
            touched={!!errors.username}
          />
        </div>
        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={data.password}
          onChange={(e) => setField("password", e.target.value)}
          disabled={isSubmitting}
          errors={errors.password}
          touched={!!errors.password}
        >
          <button
            className="icon-button"
            onClick={toggleShowPassword}
            type="button"
          >
            {showPassword ? (
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-neutral-500 fill-neutral-200"
              >
                <g id="visible=F">
                  <path
                    id="Vector"
                    d="M2 12.0256C2 12.0256 5 5.02563 12 5.02563C19 5.02563 22 12.0256 22 12.0256C22 12.0256 19 19.0256 12 19.0256C5 19.0256 2 12.0256 2 12.0256Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M12 15.0256C13.6569 15.0256 15 13.6825 15 12.0256C15 10.3688 13.6569 9.02563 12 9.02563C10.3431 9.02563 9 10.3688 9 12.0256C9 13.6825 10.3431 15.0256 12 15.0256Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            ) : (
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="visible=T">
                  <path
                    id="Vector"
                    d="M2 12.0256C2 12.0256 5 5.02563 12 5.02563C19 5.02563 22 12.0256 22 12.0256C22 12.0256 19 19.0256 12 19.0256C5 19.0256 2 12.0256 2 12.0256Z"
                    stroke="#737373"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M12 15.0256C13.6569 15.0256 15 13.6825 15 12.0256C15 10.3688 13.6569 9.02563 12 9.02563C10.3431 9.02563 9 10.3688 9 12.0256C9 13.6825 10.3431 15.0256 12 15.0256Z"
                    stroke="#737373"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            )}
          </button>
        </Input>
        {serverError && <p className="text-red-600">{serverError}</p>}
      </main>
      <footer className="flex pt-20 md:pt-[300px] flex-col justify-end w-full items-center gap-2.5 flex-grow flex-shrink-0 self-stretch">
        <Button variant="default" type="next" isDisabled={isSubmitting}>
          {isSubmitting ? "Creating Account" : "Next"}
        </Button>
      </footer>
    </form>
  );
}
