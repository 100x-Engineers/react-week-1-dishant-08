import { Link } from "react-router-dom";
import cancel from "../assets/create-account-1-signup-x.svg";

import PropTypes from "prop-types"; // ES6
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

StepHeader.propTypes = {
  number: PropTypes.string,
};

export default function StepHeader({ number }) {
  const { SetModal } = useContext(AuthContext);
  return (
    <>
      <header>
        <div className=" flex py-3 px-0 items-center gap-5 self-stretch">
          <button onClick={() => SetModal(false)}>
            <img src={cancel} alt="cross-button" />
          </button>
          {/* <Link to={-1}>
            <img src={cancel} alt="cross-button" />
          </Link> */}
          <span className=" font-Inter text-tx font-bold text-neutral-50">
            Step {number} of 4
          </span>
        </div>
      </header>
    </>
  );
}
