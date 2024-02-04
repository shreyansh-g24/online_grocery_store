import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchGroceries } from "../../api/groceries";
import GroceryForm from "./Form";
import Grocery from "./Grocery";
import { AuthContext } from "../../hooks/useAuth";
import { USER_TYPES } from "../../constants";
import GroceriesCart from "./Cart";
import { createCustomerOrder } from "../../api/customerOrders";

const GroceriesIndex = () => {
  const context = useContext(AuthContext);
  const isAdmin = context.loggedInUserType === USER_TYPES.admin;
  const isCustomer = context.loggedInUserType === USER_TYPES.customer;

  const [cart, setCart] = useState({});
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

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = useCallback(() => {
    createCustomerOrder()
      .then((response) => setCart(response.order))
      .catch(() =>
        toast.error("Something went wrong. Please contact support.")
      );
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
      {isAdmin ? <button onClick={handleAddGrocery}>Add grocery</button> : null}
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
            onAddToCart={fetchCart}
          />
        );
      })}
      {isCustomer ? <GroceriesCart order={cart} /> : null}
    </div>
  );
};

export default GroceriesIndex;
