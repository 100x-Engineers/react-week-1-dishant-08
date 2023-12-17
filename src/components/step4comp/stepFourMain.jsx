import React, { useContext, useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { BoldText, DescriptionText } from "../../components/textcomp";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function StepFourMain() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const validation = object({
    password: string("Enter Password").required("Please Enter the Password"),
  });

  const [showPassword, setShowPassword] = useState(false);
  const { formData, setFormData } = useContext(AuthContext);

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
    onSubmit: async (values, { setSubmitting }) => {
      if (!isLoading) {
        setLoading(true);

        try {
          const apiValue = {
            ...formData,
            ...values,
            username: formData.name + "08",
          };
          console.log(apiValue);

          const response = await axios.post(
            "https://one00xapi.onrender.com/api/signup",
            {
              username: apiValue.username,
              email: apiValue.email,
              display_name: apiValue.name, // You might want to verify if this is the correct property
              date_of_birth: apiValue.date_of_birth,
              password: apiValue.password, // Assuming hashehPassword is defined
            },
            {
              withCredentials: true,
            }
          );

          console.log("API response:", response.data);
          // Do any additional actions or navigate as needed
          navigate("/signup");
        } catch (error) {
          console.error("API error:", error);
          // Handle API error if needed
        } finally {
          setSubmitting(false);
          setLoading(false);
        }
      }
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-screen md:h-full">
      <main className="flex flex-col items-start gap-5 self-stretch">
        <div className="flex flex-col items-start gap-1 self-stretch">
          <BoldText>You’ll need a password</BoldText>
          <DescriptionText>Make sure it’s 8 characters or more</DescriptionText>
        </div>
        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          disabled={isSubmitting}
          errors={errors.password}
          touched={touched.password}
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
                    stroke-width="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M12 15.0256C13.6569 15.0256 15 13.6825 15 12.0256C15 10.3688 13.6569 9.02563 12 9.02563C10.3431 9.02563 9 10.3688 9 12.0256C9 13.6825 10.3431 15.0256 12 15.0256Z"
                    stroke="#737373"
                    stroke-width="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            )}
          </button>
        </Input>
      </main>
      <footer className="flex pt-20 md:pt-[300px] flex-col justify-end w-full items-center gap-2.5 flex-grow flex-shrink-0 self-stretch">
        <Button variant="default" type="next" isDisabled={isLoading}>
          {isLoading ? "Creating Account" : "Next"}
        </Button>
      </footer>
    </form>
  );
}
