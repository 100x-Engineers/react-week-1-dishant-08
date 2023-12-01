import PropTypes from "prop-types"; // ES6

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["large", "medium", "small", "default", "next"]),
  variant: PropTypes.oneOf(["default", "outline", "solidBlue"]),
  isDisabled: PropTypes.bool,
};

export default function Button({
  children,
  variant,
  type,
  isDisabled = false,
  ...rest
}) {
  const common = " gap-2.5  font-Inter text-fx font-bold";

  const variantType = {
    default:
      " bg-neutral-50 text-neutral-1000 rounded-4xl shadow-3xl backdrop-blur-fx ",
    outline:
      "border border-solid border-bcolr text-twitter-blue rounded-4xl shadow-3xl backdrop-blur-fx",
    solidBlue: "bg-twitter-blue text-Twitter-white-100 rounded-pox",
  };

  const btnType = {
    large: "w-full p-5 ",
    medium: " py-tx px-[5.8125rem]",
    small: " py-3 px-6",
    default: "py-2 px-6 w-full",
    next: " w-full py-3 px-6",
  };

  const disabledStyle = isDisabled ? "cursor-not-allowed opacity-50" : " ";

  const classes = `${common} ${variantType[variant]} ${btnType[type]} ${disabledStyle} `;
  // console.log(classes)
  return (
    <>
      <button type="submit" className={classes} {...rest}>
        {children}
      </button>
    </>
  );
}
