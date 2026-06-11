import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import api from "./useApi";

const STORAGE_KEY = "signup-flow-v1";

export const USERNAME_RE = /^[a-zA-Z0-9_]{3,15}$/;

const stepSchemas = {
  1: z.object({
    name: z
      .string()
      .min(1, "Please enter your name")
      .max(20, "Name should be at most 20 characters"),
    email: z.string().email("Enter a valid email"),
    month: z.string().min(1, "Enter month"),
    day: z.string().min(1, "Enter day"),
    year: z.string().min(1, "Enter year"),
  }),
  3: z.object({
    otp: z.string().min(4, "Enter the verification code"),
  }),
  4: z.object({
    username: z
      .string()
      .regex(USERNAME_RE, "3-15 characters: letters, numbers or underscore"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),
};

const EMPTY = {
  name: "",
  email: "",
  month: "",
  day: "",
  year: "",
  username: "",
  otp: "",
  password: "",
};

// otp and password are deliberately never written to sessionStorage
const PERSISTED_FIELDS = ["name", "email", "month", "day", "year", "username"];

function loadPersisted() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    return EMPTY;
  }
}

/**
 * Single source of truth for the 4-step signup flow: form data (persisted to
 * sessionStorage so refresh keeps progress), per-step zod validation with
 * inline field errors, and the step transition API calls.
 */
export default function useSignupFlow() {
  const navigate = useNavigate();
  const [data, setData] = useState(loadPersisted);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const persisted = {};
    PERSISTED_FIELDS.forEach((field) => {
      persisted[field] = data[field];
    });
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  }, [data]);

  const setField = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    // typing in a field clears its inline error
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setServerError("");
  }, []);

  const validateStep = useCallback(
    (step) => {
      const schema = stepSchemas[step];
      if (!schema) return true;
      const result = schema.safeParse(data);
      if (result.success) {
        setErrors({});
        return true;
      }
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    },
    [data]
  );

  const submitStepOne = useCallback(() => {
    if (validateStep(1)) navigate("/step2");
  }, [validateStep, navigate]);

  const sendOtp = useCallback(async () => {
    setServerError("");
    setIsSubmitting(true);
    try {
      await api.post("/sendmail", { email: data.email });
      navigate("/step3");
    } catch {
      setServerError("Couldn't send the verification email. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [data.email, navigate]);

  const verifyOtp = useCallback(async () => {
    if (!validateStep(3)) return;
    setServerError("");
    setIsSubmitting(true);
    try {
      const response = await api.post("/verifymail", { otp: data.otp });
      if (response.data?.msg === "You are verified") {
        setData((prev) => ({ ...prev, otp: "" }));
        navigate("/step4");
      } else {
        setServerError("Verification failed");
      }
    } catch (err) {
      setServerError(err.response?.data?.msg || "Incorrect code");
    } finally {
      setIsSubmitting(false);
    }
  }, [data.otp, validateStep, navigate]);

  const submitSignup = useCallback(async () => {
    if (!validateStep(4)) return;
    setServerError("");
    setIsSubmitting(true);
    try {
      await api.post("/api/signup", {
        username: data.username,
        email: data.email,
        display_name: data.name,
        date_of_birth: `${data.month} ${data.day} ${data.year}`,
        password: data.password,
      });
      sessionStorage.removeItem(STORAGE_KEY);
      navigate("/signup");
    } catch (err) {
      const message = err.response?.data?.error || "Failed to create account";
      if (/username/i.test(message)) {
        setErrors((prev) => ({ ...prev, username: message }));
      } else if (/email/i.test(message)) {
        setErrors((prev) => ({ ...prev, email: message }));
        setServerError(message);
      } else {
        setServerError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [data, validateStep, navigate]);

  return {
    data,
    errors,
    serverError,
    isSubmitting,
    setField,
    validateStep,
    submitStepOne,
    sendOtp,
    verifyOtp,
    submitSignup,
  };
}
