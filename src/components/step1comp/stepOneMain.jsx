import React from "react";
import { useFormik } from "formik";
import Button from "../../components/button";
import Input from "../../components/input";
import { useNavigate } from "react-router-dom";
import { BoldText } from "../../components/textcomp";
import { DescriptionText } from "../../components/textcomp";
import DateSelector from "../../components/DateSelect";
import { object, string } from "yup";

export default function StepOneMain() {
  const navigate = useNavigate();

  const validation = object({
    name: string("Invalid Entry")
      .required("Please Enter the Name")
      .max(20, "Name should be 20 letters"),
    email: string("Invalid Entry")
      .email("Invalid Entry")
      .required("Email Required"),
    month: string().required("Enter month"),
    day: string().required("Enter day"),
    year: string().required("Enter year"),
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
      name: "",
      email: "",
      month: "",
      day: "",
      year: "",
    },
    validationSchema: validation,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        console.log("Submitted values", values);
        resetForm();
        setSubmitting(false);
        navigate("/step2");
      }, 400);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <main className="flex flex-col items-start gap-[1.12rem] self-stretch">
        <div>
          <BoldText>Create your account</BoldText>
        </div>
        <div className="w-full">
          <Input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            disabled={isSubmitting}
            errors={errors.name}
            touched={touched.name}
          />
        </div>
        <div className="w-full">
          <Input
            name="email"
            placeholder="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            disabled={isSubmitting}
            errors={errors.email}
            touched={touched.email}
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
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.month}
            disabled={isSubmitting}
            errors={errors.month}
            touched={touched.month}
          />
          <DateSelector
            type="day"
            name="day"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.day}
            disabled={isSubmitting}
            errors={errors.day}
            touched={touched.day}
          />
          <DateSelector
            type="year"
            name="year"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.year}
            disabled={isSubmitting}
            errors={errors.year}
            touched={touched.year}
          />
        </div>
      </main>
      <div className="flex  pt-[4.75rem] px-5 pb-0 flex-col justify-end items-center gap-2.5 flex-1 flex-shrink-0 self-stretch">
        <Button
          variant="default"
          type="default"
          disabled={isSubmitting}
          // onClick={() => }
        >
          Create Account
        </Button>
      </div>
    </form>
  );
}
