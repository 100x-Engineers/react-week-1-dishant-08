import Input from "../../components/input";
import Button from "../../components/button";
import { BoldText } from "../../components/textcomp";
import { DescriptionText } from "../../components/textcomp";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useFormik } from "formik";

export default function StepFourMain() {
  const navigate = useNavigate();
  const validation = object({
    password: string("Enter Password").required("Please Enter the Password"),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validation,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        console.log("Submitted values", values);
        resetForm();
        setSubmitting(false);
        navigate("/");
      }, 400);
    },
  });
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex   flex-col  h-screen md:h-full "
      >
        <main className="flex flex-col items-start gap-5 self-stretch">
          <div className=" flex flex-col items-start gap-1 self-stretch">
            <BoldText>You’ll need a password</BoldText>
            <DescriptionText>
              Make sure it’s 8 characters or more
            </DescriptionText>
          </div>
          <Input
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            disabled={isSubmitting}
            errors={errors.password}
            touched={touched.password}
          >
            <button className="group">
              <svg
                className=" fill-none stroke-neutral-500 group-focus:fill-neutral-200 group-focus:stroke-black "
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={25}
                viewBox="0 0 24 25"
              >
                <path
                  d="M2 12.0256C2 12.0256 5 5.02563 12 5.02563C19 5.02563 22 12.0256 22 12.0256C22 12.0256 19 19.0256 12 19.0256C5 19.0256 2 12.0256 2 12.0256Z"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15.0256C13.6569 15.0256 15 13.6825 15 12.0256C15 10.3688 13.6569 9.02563 12 9.02563C10.3431 9.02563 9 10.3688 9 12.0256C9 13.6825 10.3431 15.0256 12 15.0256Z"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Input>
        </main>
        <footer className="flex pt-20     md:pt-[300px]  flex-col justify-end w-full  items-center gap-2.5 flex-grow  flex-shrink-0 self-stretch">
          <Button
            variant="default"
            type="next"
            // onClick={() => {
            //   navigate("/");
            // }}
          >
            Next
          </Button>
        </footer>
      </form>
    </>
  );
}
