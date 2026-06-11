import { useNavigate } from "react-router-dom";
import cancel from "../assets/create-account-1-signup-x.svg";

import PropTypes from "prop-types"; // ES6

StepHeader.propTypes = {
  number: PropTypes.string,
};

export default function StepHeader({ number }) {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <div className=" flex py-3 px-0 items-center gap-5 self-stretch">
          <button onClick={() => navigate("/")}>
            <img src={cancel} alt="cross-button" />
          </button>
          <span className=" font-Inter text-tx font-bold text-neutral-50">
            Step {number} of 4
          </span>
        </div>
      </header>
    </>
  );
}
