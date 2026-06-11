import Button from "../../components/Button";
import Input from "../../components/Input";
import { BoldText, DescriptionText } from "../../components/TextComp";
import DateSelector from "../../components/DateSelect";
import useSignupFlow from "../../hooks/useSignupFlow";

export default function StepOneMain() {
  const { data, errors, setField, submitStepOne } = useSignupFlow();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitStepOne();
      }}
    >
      <main className="flex flex-col items-start gap-[1.12rem] self-stretch">
        <div>
          <BoldText>Create your account</BoldText>
        </div>
        <div className="w-full">
          <Input
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={(e) => setField("name", e.target.value)}
            errors={errors.name}
            touched={!!errors.name}
          />
        </div>
        <div className="w-full">
          <Input
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setField("email", e.target.value)}
            errors={errors.email}
            touched={!!errors.email}
          />
        </div>

        <div className="flex flex-col items-start gap-2 self-stretch">
          <p className="text-neutral-50 font-Inter text-tx font-bold">
            Date of birth
          </p>
          <DescriptionText type="Bold">
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </DescriptionText>
        </div>
        <div className="flex items-center self-stretch gap-3">
          <DateSelector
            type="month"
            name="month"
            value={data.month}
            onChange={(e) => setField("month", e.target.value)}
            errors={errors.month}
            touched={!!errors.month}
          />
          <DateSelector
            type="day"
            name="day"
            value={data.day}
            onChange={(e) => setField("day", e.target.value)}
            errors={errors.day}
            touched={!!errors.day}
          />
          <DateSelector
            type="year"
            name="year"
            value={data.year}
            onChange={(e) => setField("year", e.target.value)}
            errors={errors.year}
            touched={!!errors.year}
          />
        </div>
      </main>
      <div className="flex  pt-[4.75rem] px-5 pb-0 flex-col justify-end items-center gap-2.5 flex-1 flex-shrink-0 self-stretch">
        <Button variant="default" type="default">
          Create Account
        </Button>
      </div>
    </form>
  );
}
