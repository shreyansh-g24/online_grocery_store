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
import { toast } from "react-toastify";

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
    if (isCustomer) {
      fetchCart();
    }
  }, []);

  const fetchCart = useCallback(() => {
    createCustomerOrder()
      .then((response) => setCart(response))
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
    <div className="flex items-start justify-between w-full h-full">
      <div className="h-full w-full p-2">
        <div className="flex flex-col justify-start items-center mb-4">
          {isAdmin ? (
            <button className="btn-primary mb-2" onClick={handleAddGrocery}>
              Add grocery
            </button>
          ) : null}
          {showGroceryForm ? (
            <GroceryForm
              onCreate={handleGroceryCreate}
              grocery={editGrocery}
              onUpdate={handleGroceryUpdate}
            />
          ) : null}
        </div>
        <div className="w-full grid grid-flow-row grid-cols-3 gap-4 p-2">
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
        </div>
      </div>
      {isCustomer ? (
        <GroceriesCart
          order={cart.order}
          statuses={cart.statuses}
          addresses={cart.addresses}
        />
      ) : null}
    </div>
  );
};

export default GroceriesIndex;
