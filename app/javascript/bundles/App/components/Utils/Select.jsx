import React from "react";

const Select = ({ defaultValue, options, onChange }) => {
  return (
    <select defaultValue={defaultValue} onChange={onChange}>
      {options.map((opt) => {
        return (
          <option key={opt.id} value={opt.id} {...opt.options}>
            {opt.value}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
