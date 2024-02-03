import React, { useEffect, useMemo, useState } from "react";
import { fetchGroceries } from "../../api/groceries";
import GroceryForm from "./Form";
import Grocery from "./Grocery";

const GroceriesIndex = () => {
  const [groceries, setGroceries] = useState([]);
  const [showGroceryFormForId, setShowGroceryFormForId] = useState("");
  const showGroceryForm = useMemo(
    () => !!showGroceryFormForId,
    [showGroceryFormForId]
  );
  const editGrocery = useMemo(() => {
    if (showGroceryFormForId !== "new") {
      return groceries.find((gro) => gro.id === showGroceryFormForId);
    }

    return undefined;
  }, [showGroceryFormForId]);

  useEffect(() => {
    fetchGroceries()
      .then((response) => setGroceries(response.groceries))
      .catch(() => undefined);
  }, []);

  const handleAddGrocery = () => {
    setShowGroceryFormForId("new");
  };

  const handleEditGrocery = (grocery) => {
    setShowGroceryFormForId(grocery.id);
  };

  const handleGroceryCreate = (grocery) => {
    setShowGroceryFormForId("");
    setGroceries(groceries.concat([grocery]));
  };

  const handleGroceryUpdate = (grocery) => {
    const updatedGroceries = groceries.map((gro) =>
      gro.id === grocery.id ? grocery : gro
    );
    setShowGroceryFormForId("");
    setGroceries(updatedGroceries);
  };

  return (
    <div>
      <button onClick={handleAddGrocery}>Add grocery</button>
      {showGroceryForm ? (
        <GroceryForm
          onCreate={handleGroceryCreate}
          grocery={editGrocery}
          onUpdate={handleGroceryUpdate}
        />
      ) : null}
      Groceries
      {groceries.map((grocery) => {
        return (
          <Grocery
            key={grocery.id}
            grocery={grocery}
            handleEdit={() => handleEditGrocery(grocery)}
          />
        );
      })}
    </div>
  );
};

export default GroceriesIndex;
