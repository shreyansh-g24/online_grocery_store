import React from "react";

const Address = ({ address, handleEdit }) => {
  return (
    <div>
      <div>{address.label}</div>
      <div>{address.full_address}</div>
      <div>{address.contact}</div>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default Address;
