import React from "react";

const Address = ({ address, handleEdit }) => {
  return (
    <div>
      <div>{address.label}</div>
      <div>{address.full_address}</div>
      <div>{address.contact}</div>
      {handleEdit ? <button onClick={handleEdit}>Edit</button> : null}
    </div>
  );
};

export default Address;
