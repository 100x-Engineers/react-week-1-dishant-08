import React, { useContext } from "react";
import { useFormik } from "formik";
import Button from "../../components/button";
import Input from "../../components/input";
import { useNavigate } from "react-router-dom";
import { BoldText } from "../../components/textcomp";
import { DescriptionText } from "../../components/textcomp";
import DateSelector from "../../components/DateSelect";
import { object, string } from "yup";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function StepOneMain() {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(AuthContext);

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
      name: formData.name || "", // Use formData.name as initial value, or an empty string if it's undefined
      email: formData.email || "", // Use formData.email as initial value, or an empty string if it's undefined
      month: formData.month || "",
      day: formData.day || "",
      year: formData.year || "",
    },
    validationSchema: validation,
    onSubmit: async (values, { setSubmitting }) => {
      setFormData((prevData) => {
        // let updatedValues = { ...prevData, ...values };
        const updatedValues = {
          ...prevData,
          date_of_birth:
            (values.month || "") +
            " " +
            (values.day || "") +
            " " +
            (values.year || ""),
          ...values,
        };

        console.log(updatedValues);
        // Make an API call here
        // axios
        //   .post("/api/signup", { status: updatedValues.name })
        //   .then((response) => {
        //     console.log("API response:", response.data);
        //     // Do any additional actions or navigate as needed
        // navigate("/step2");
        //   })
        //   .catch((error) => {
        //     console.error("API error:", error);
        //     // Handle API error if needed
        //   });
        return updatedValues;
      });

      navigate("/step2");
      setSubmitting(false);
    },
    // onSubmit: (values, { setSubmitting }) => {
    //   setFormData((prevData) => {
    //     const updatedValues = { ...prevData, ...values };
    //     const response = axios.post('/api/signup', { "status" : updatedValues.name}).then(re)

    //     console.log(updatedValues);
    //     return updatedValues;
    //   });

    //   console.log("Updated formData", formData); // Log the updated formData immediately
    //   setSubmitting(false);
    //   navigate("/step2");
    // },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
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
