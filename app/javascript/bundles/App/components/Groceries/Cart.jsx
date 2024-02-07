import React from "react";
import OrdersShow from "../Orders/show";

const GroceriesCart = ({ order, statuses, addresses }) => {
  return (
    <div className="cart-container">
      <div className="cart-container cart-fixed">
        <OrdersShow
          orderProps={order}
          statusesProps={statuses}
          addressesProps={addresses}
        />
      </div>
    </div>
  );
};

export default GroceriesCart;
