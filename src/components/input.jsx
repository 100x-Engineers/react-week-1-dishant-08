// import cancel from "../assets/create-account-1-signup-x.svg";
import greenTick from "../assets/icon.svg";

import PropTypes from "prop-types"; // ES6

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default function Input({ name, placeholder, children, show, ...rest }) {
  return (
    <>
      <fieldset className="flex  group w-full self-stretch py-4 px-3 items-center  rounded border  focus-within:border-twitter-blue justify-between grow">
        <legend
          className={`group-focus-within:text-twitter-blue text-neutral-500 font-Inter text-[0.75rem]  
           ${
             show ? "block" : " hidden group-focus-within:block"
           } font-medium px-1 `}
        >
          {name}
        </legend>
        <input
          type="text"
          name="name"
          placeholder={placeholder}
          className="bg-transparent  text-neutral-50 font-Inter text-xl leading-[1.2] font-normal focus:outline-none  w-full   group-focus-within:placeholder-shown:scale-y-75 group-focus-within:placeholder-transparent    "
          {...rest}
        />
        <img src={greenTick} alt="green-status" className="ml-5 hidden" />
        {children}
      </fieldset>
    </>
  );
}
