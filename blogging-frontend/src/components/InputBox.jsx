import { useState } from "react";

const InputBox = ({ name, id, placeholder, value, type, icon }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        type={
          type === "password"
            ? passwordVisibility
              ? "text"
              : "password"
            : type
        }
        id={id}
        className="input-box"
      />
      <i className={"fi " + icon + " input-icon"}></i>
      {type === "password" ? (
        <i
          className={
            "fi " +
            (passwordVisibility ? "fi-rr-eye" : "fi-rr-eye-crossed") +
            " input-icon left-[auto] right-4 cursor-pointer"
          }
          onClick={() =>
            setPasswordVisibility((currentVal) => !currentVal)
          }></i>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputBox;
