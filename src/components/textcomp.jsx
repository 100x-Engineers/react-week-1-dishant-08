import PropTypes from "prop-types"; // ES6

BoldText.propTypes = {
  children: PropTypes.node.isRequired,
};
DescriptionText.propTypes = {
  children: PropTypes.node.isRequired,
};

function BoldText({ children }) {
  return (
    <>
      <p className=" text-neutral-50 font-Inter text-[1.5rem] font-bold">
        {children}
      </p>
    </>
  );
}

function DescriptionText({ children, type }) {
  const typeText = {
    Bold: "text-secondary",
  };
  return (
    <>
      <p
        className={`${
          typeText[type] ?? "text-neutral-500"
        } font-Inter text-[0.875rem] font-normal`}
      >
        {children}{" "}
      </p>
    </>
  );
}

export { BoldText, DescriptionText };
