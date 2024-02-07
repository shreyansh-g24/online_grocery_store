import React from "react";

const Address = ({ address, handleEdit }) => {
  return (
    <div className="p-4 rounded border-2 border-black">
      <div>{address.label}</div>
      <div>{address.full_address}</div>
      <div>{address.contact}</div>
      {handleEdit ? <button className="btn-primary" onClick={handleEdit}>Edit</button> : null}
    </div>
  );
};

export default Address;
