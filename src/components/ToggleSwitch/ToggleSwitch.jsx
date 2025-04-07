import React, { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
        className="toggle-switch__checkbox"
      />
      <span className="toggle-switch__slider"></span>
      <span className="toggle-switch__label toggle-switch__label--left">F</span>
      <span className="toggle-switch__label toggle-switch__label--right">
        C
      </span>
    </label>
  );
};

export default ToggleSwitch;