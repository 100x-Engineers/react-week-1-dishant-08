import React, { useContext, useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import { BoldText, DescriptionText } from "../../components/textcomp";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useFormik } from "formik";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import StepHeader from "../stepHeader";

export default function StepFourMain() {
  const navigate = useNavigate();
  const [isLoading, SetLoading] = useState(false);
  const validation = object({
    email: string("Invalid Entry")
      .email("Invalid Entry")
      .required("Email Required"),
    password: string("Enter Password").required("Please Enter the Password"),
  });

  const handleGuestLogin = async () => {
    if (!isLoading) {
      SetLoading(true);

      try {
        const response = await axios.post(
          "https://one00xapi.onrender.com/api/login",
          {
            email: "randomEmail@example.com",
            password: "randomPassword",
          },
          {
            withCredentials: true,
          }
        );

        // console.log("API response:", response.data);

        // Do any additional actions or navigate as needed
        navigate("/home");
      } catch (error) {
        console.error("API error:", error);
        setError(error.response.data);
        // Handle guest login error if needed
      } finally {
        SetLoading(false);
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  // const { formData, setFormData } = useContext(AuthContext);

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
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: async (values, { setSubmitting }) => {
      // console.log(values);
      if (!isLoading) {
        SetLoading(true);
        try {
          const response = await axios.post(
            "https://one00xapi.onrender.com/api/login",
            {
              email: values.email,
              password: values.password,
            },
            {
              withCredentials: true,
            }
          );

          // console.log("API response:", response.data);

          // Do any additional actions or navigate as needed
          navigate("/home");
        } catch (error) {
          console.error("API error:", error);
          setError(error.response.data);
          // Handle API error if needed
        } finally {
          SetLoading(false);
          setSubmitting(false);
        }
      }
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className=" flex  px-tx pt-0 pb-5 flex-col gap-3 w-screen h-screen z-40 md:w-auto md:h-auto shrink-0 bg-neutral-1000 rounded-2xl">
      <StepHeader number="0" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-screen md:h-full"
      >
        <main className="flex flex-col items-start gap-5 self-stretch">
          <div className="flex flex-col items-start gap-1 self-stretch">
            <BoldText> Login Your Account </BoldText>
            <DescriptionText>
              Don't have an account ?{" "}
              <Link to={"/step1"} className="text-twitter-blue">
                Create Account
              </Link>
            </DescriptionText>
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
                      stroke-width="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      id="Vector_2"
                      d="M12 15.0256C13.6569 15.0256 15 13.6825 15 12.0256C15 10.3688 13.6569 9.02563 12 9.02563C10.3431 9.02563 9 10.3688 9 12.0256C9 13.6825 10.3431 15.0256 12 15.0256Z"
                      stroke="black"
                      stroke-width="2"
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
          <div className="text-red-500 font-bold text-xl italic font-mono ">
            {" "}
            {error}{" "}
          </div>
        </main>
        <footer className="flex pt-20 md:pt-[220px] flex-col justify-end w-full items-center gap-2.5  flex-shrink-0 self-stretch">
          <button
            className="bg-neutral-50 text-neutral-1000 rounded-4xl shadow-3xl backdrop-blur-fx  w-full py-3 px-6  gap-2.5  font-Inter text-fx font-bold"
            type="button"
            onClick={handleGuestLogin}
            isDisabled={isLoading}
          >
            {isLoading ? "Authenticating" : "Login as Guest"}
          </button>
          <Button variant="default" type="next" isDisabled={isLoading}>
            {isLoading ? "Authenticating" : "Login"}
          </Button>
        </footer>
      </form>
    </div>
  );
}
