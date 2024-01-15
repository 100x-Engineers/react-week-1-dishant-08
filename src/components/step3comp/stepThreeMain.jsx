import React, { useContext, useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { BoldText, DescriptionText } from "../../components/textcomp";
import { object, number } from "yup";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function StepThreeMain() {
  const navigate = useNavigate();
  const { formData } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);

  // Form validation schema using Yup
  const validationSchema = object({
    verification: number().required("Please enter the code"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      verification: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values, { setSubmitting, resetForm }) {
    try {
      setLoading(true);

      // Make the API call to verify the code
      const response = await axios.post(
        "https://one00xapi.onrender.com/verifymail",
        {
          otp: values.verification,
        },
        {
          withCredentials: true,
          // Add headers if required (e.g., Authorization header with API key/token)
        }
      );

      // Check the response from the server
      if (response.data.msg === "You are verified") {
        console.log(response.data);
        console.log("Verification successful");
        resetForm();
        setSubmitting(false);
        navigate("/step4");
      } else {
        console.log("Verification failed");
        // Handle the case where the verification failed
        // Display an error message to the user
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      // Handle the error appropriately
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col h-screen md:h-full"
    >
      <main className="flex flex-col items-start gap-5 self-stretch">
        <div className="flex flex-col items-start gap-1 self-stretch">
          <BoldText>Create your account</BoldText>
          <DescriptionText>
            Enter the verification code sent to {formData.email}
          </DescriptionText>
        </div>
        <div className="flex flex-col items-end gap-3 self-stretch group">
          <Input
            name="verification"
            placeholder="Verification code"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.verification}
            disabled={formik.isSubmitting}
            error={formik.errors.verification}
            touched={formik.touched.verification}
          />
          <p
            className="text-twitter-blue font-Inter text-[0.875rem]"
            onClick={() => navigate(-1)}
          >
            Didn’t receive a code?
          </p>
        </div>
      </main>
      <footer className="flex pt-20 md:pt-[280px] flex-col justify-end w-full items-center gap-2.5 flex-grow flex-shrink-0 self-stretch">
        <Button variant="default" type="next" isDisabled={isLoading}>
          {isLoading ? "Loading..." : "Next"}
        </Button>
      </footer>
    </form>
  );
}
