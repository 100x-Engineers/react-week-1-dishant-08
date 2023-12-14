import Input from "../../components/input";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { BoldText } from "../../components/textcomp";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function StepTwoMain() {
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(AuthContext);
  useEffect(() => {
    console.log(formData);
  }, []);
  // console.log("Step 2", formData);
  // const validation =
  return (
    <>
      <main className="flex flex-col items-start gap-5 self-stretch bg-neutral-1000 ">
        <div>
          <BoldText>Create your account</BoldText>
        </div>
        <Input
          name="name"
          placeholder="Name"
          tick="true"
          value={formData.name}
          onChange={() => navigate(-1)}
        />
        <Input
          name="email"
          placeholder="Email"
          tick="true"
          value={formData.email}
          onChange={() => navigate(-1)}
        />
        <Input
          name="Date Of Birth"
          placeholder="Date of Birth"
          tick="true"
          value={formData.day + " " + formData.month + " " + formData.year}
          onChange={() => navigate(-1)}
        />
      </main>
      <footer className="flex pt-20  md:pt-[180px]  flex-col justify-end w-full  items-center gap-2.5 flex-grow  flex-shrink-0 self-stretch">
        <Button
          variant="solidBlue"
          type="large"
          onClick={() => {
            navigate("/step3");
          }}
        >
          Sign Up
        </Button>
      </footer>
    </>
  );
}
