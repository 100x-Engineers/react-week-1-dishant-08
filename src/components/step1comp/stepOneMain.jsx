import Button from "../../components/button";
import Input from "../../components/input";

import { useNavigate } from "react-router-dom";
import { BoldText } from "../../components/textcomp";
import { DescriptionText } from "../../components/textcomp";
import DateSelector from "../../components/DateSelect";

export default function StepOneMain() {
  const navigate = useNavigate();

  return (
    <>
      <main className="flex flex-col items-start gap-5 self-stretch">
        <div>
          <BoldText>Create your account</BoldText>
        </div>
        <Input name="Name" placeholder="Name"></Input>
        <Input name="Email" placeholder="Email"></Input>

        <div className=" flex flex-col items-start gap-2 self-stretch">
          <p className="text-neutral-50 font-Inter text-tx font-bold">
            Date of birth
          </p>
          <DescriptionText type="Bold">
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </DescriptionText>
        </div>
        <DateSelector />
      </main>
      <div className="flex  sm:h-0 pt-20 px-5 pb-0 flex-col justify-end  items-center gap-2.5 flex-1  flex-shrink-0 self-stretch">
        <Button
          variant="default"
          type="default"
          onClick={() => navigate("/step2")}
        >
          Create Account
        </Button>
      </div>
    </>
  );
}
