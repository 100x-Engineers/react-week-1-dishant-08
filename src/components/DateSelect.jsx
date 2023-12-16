export default function DateSelector({ type, errors, touched, ...rest }) {
  if (type === "month") {
    return (
      <>
        <div className="flex flex-col">
          <fieldset className="flex group py-4 px-3 justify-between items-center self-stretch border border-neutral-500 rounded focus-within:border-twitter-blue">
            <legend className="text-neutral-500 font-Inter text-0.75 font-medium px-1 group-focus-within:text-twitter-blue">
              Month
            </legend>
            <select
              {...rest}
              className="bg-neutral-1000 focus:outline-none text-neutral-50 font-Inter text-[1.25rem] font-normal"
            >
              <option value className="hidden" />
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </fieldset>
          {errors && touched && <div className="text-red-600">{errors}</div>}
        </div>
      </>
    );
  } else if (type === "day") {
    return (
      <>
        <div className="flex flex-col">
          <fieldset className="flex group py-4 px-3 justify-between items-center self-stretch border border-neutral-500 rounded focus-within:border-twitter-blue">
            <legend className="text-neutral-500 font-Inter text-0.75 font-medium px-1 group-focus-within:text-twitter-blue">
              Day
            </legend>
            <select
              {...rest}
              className="bg-neutral-1000 focus:outline-none text-neutral-50 font-Inter text-[1.25rem] font-normal"
            >
              <option value className="hidden" />
              {Array.from({ length: 31 }, (_, index) => (
                <option key={index + 1}>{index + 1}</option>
              ))}
            </select>
          </fieldset>
          {errors && touched && <div className="text-red-600">{errors}</div>}
        </div>
      </>
    );
  } else if (type === "year") {
    return (
      <>
        <div className="flex flex-col">
          <fieldset className="flex group py-4 px-3 justify-between items-center self-stretch border border-neutral-500 rounded focus-within:border-twitter-blue">
            <legend className="text-neutral-500 font-Inter text-0.75 font-medium px-1 group-focus-within:text-twitter-blue">
              Year
            </legend>
            <select
              {...rest}
              className="focus:outline-none text-neutral-50 bg-neutral-1000 font-Inter text-[1.25rem] font-normal"
            >
              <option value className="hidden" />
              {Array.from({ length: 53 }, (_, index) => (
                <option key={2023 - index}>{2023 - index}</option>
              ))}
            </select>
          </fieldset>
          {errors && touched && <div className="text-red-600">{errors}</div>}
        </div>
      </>
    );
  } else {
    return null; // Return null or handle the case where type is neither "month", "day", nor "year"
  }
}
