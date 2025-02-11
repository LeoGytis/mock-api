import { useState } from "react";
import "../styles/switch.css";

const ThemeSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prevIsOn) => !prevIsOn);
    document
      .querySelector("html")
      ?.setAttribute("data-theme", isOn ? "" : "light");
  };

  return (
    <div className="absolute -top-14 right-0">
      <input
        onChange={handleToggle}
        className="switch-checkbox"
        id="switch"
        type="checkbox"
      />
      <label className="switch-label" htmlFor={`switch`}>
        <span className="switch-button" />
      </label>
    </div>
  );
};

export default ThemeSwitch;
