import { Link } from "react-router-dom";
import cancel from "../assets/create-account-1-signup-x.svg";

import PropTypes from "prop-types"; // ES6

StepHeder.propTypes = {
  number: PropTypes.number.isRequired,
};

export default function StepHeder({ number }) {
  return (
    <>
      <header>
        <div className=" flex py-3 px-0 items-center gap-5 self-stretch">
          <Link to={"/"}>
            <img src={cancel} alt="cross-button" />
          </Link>
          <span className=" font-Inter text-tx font-bold text-neutral-50">
            Step {number} of 4
          </span>
        </div>
      </header>
    </>
  );
}
