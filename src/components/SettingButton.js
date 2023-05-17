import React from "react";

const SettingButton = (props) => {
  const handleButton = () => {
    props.setOpen(!props.open);
  };
  return (
    <div className="px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <button
        style={{
          background: "blue",
          padding: "10px 20px",
        }}
        onClick={() => handleButton()}
        className="text-sm font-medium leading-6 text-white"
      >
        {props.title}
      </button>
    </div>
  );
};

export default SettingButton;
