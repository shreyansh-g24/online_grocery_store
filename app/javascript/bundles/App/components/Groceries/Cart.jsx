import React, { useEffect, useState } from "react"
import { createCustomerOrder } from "../../api/customerOrders"
import { toast } from "react-toastify"

const GroceriesCart = ({ order }) => {
  

  return (
    <div>
      {JSON.stringify(order)}
    </div>
  )
}

export default GroceriesCart;
