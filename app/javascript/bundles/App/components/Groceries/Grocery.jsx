import React from "react";

const Grocery = ({ grocery, handleEdit }) => {
  return (
    <div>
      <div>{grocery.name}</div>
      <div>
        Price: Rs. {grocery.price_per_unit} per {grocery.unit || "unit"}
      </div>
      {grocery.is_out_of_stock ? <div>Out of stock</div> : null}
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default Grocery;
