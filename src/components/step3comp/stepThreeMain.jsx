import React from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { useFormik } from "formik";

import { useNavigate } from "react-router-dom";
import { BoldText } from "../../components/textcomp";
import { DescriptionText } from "../../components/textcomp";
import { object, number } from "yup";
export default function StepThreeMain() {
  const navigate = useNavigate();

  const validation = object({
    verification: number("Enter number code").required("Please Enter the code"),
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
      verification: "",
    },
    validationSchema: validation,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        console.log("Submitted values", values);
        resetForm();
        setSubmitting(false);
        navigate("/step4");
      }, 400);
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex   flex-col h-screen md:h-full "
    >
      <main className="flex flex-col items-start gap-5 self-stretch  ">
        <div className=" flex flex-col items-start gap-1 self-stretch">
          <BoldText>Create your account</BoldText>
          <DescriptionText>
            Enter it below to verify dishant.sahu@gmail.com
          </DescriptionText>
        </div>
        <div className=" flex flex-col items-end gap-3 self-stretch group ">
          <Input
            name="verification"
            placeholder="Verification code"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.verification}
            disabled={isSubmitting}
            errors={errors.verification}
            touched={touched.verification}
          />
          <p className="text-twitter-blue font-Inter text-[0.875rem] ">
            Didn’t receive a code?
          </p>
        </div>
      </main>
      <footer className="flex pt-20   md:pt-[280px]  flex-col justify-end w-full  items-center gap-2.5 flex-grow  flex-shrink-0 self-stretch">
        <Button variant="default" type="next" disabled={isSubmitting}>
          Next
        </Button>
      </footer>
    </form>
  );
}

// onClick={() => {
//   // navigate("/step4");
// }}
