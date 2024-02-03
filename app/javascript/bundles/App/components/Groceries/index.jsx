import React, { useEffect, useState } from "react";
import { fetchGroceries } from "../../api/groceries";

const GroceriesIndex = () => {
  const [groceries, setGroceries] = useState([])

  useEffect(() => {
    fetchGroceries()
      .then((response) => setGroceries(response.groceries))
      .catch(() => undefined)
  }, [])

  return (
    <div>
      {JSON.stringify(groceries)}
    </div>
  )
}

export default GroceriesIndex;
