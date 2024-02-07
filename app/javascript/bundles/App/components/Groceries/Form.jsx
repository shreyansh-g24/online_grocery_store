import React, { useRef } from "react";
import { createGrocery, updateGrocery } from "../../api/groceries";

const GroceryForm = ({ onCreate, onUpdate, grocery }) => {
  const formRef = useRef();

  const getFormData = () => {
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    if (data.is_out_of_stock) {
      data.is_out_of_stock = true;
    } else {
      data.is_out_of_stock = false;
    }

    return data;
  };

  const handleCreate = () => {
    const data = getFormData();
    createGrocery({ grocery: data })
      .then((response) => {
        onCreate(response.grocery);
      })
      .catch(() => 0);
  };

  const handleUpdate = () => {
    const data = getFormData();
    updateGrocery({ grocery: data }, grocery.id)
      .then((response) => {
        onUpdate(response.grocery);
      })
      .catch(() => 0);
  };

  return (
    <div>
      <form ref={formRef} className="rounded flex flex-col justify-center items-center p-2 border-2 border-black">
        <label className="mb-2">
          Name{" "}
          <input className="text-input" name="name" type="text" defaultValue={grocery?.name || ""} />
        </label>
        <label className="mb-2">
          Price per unit{" "}
          <input
            className="text-input"
            name="price_per_unit"
            type="number"
            defaultValue={grocery?.price_per_unit || 0}
          />
        </label>
        <label className="mb-2">
          Unit{" "}
          <input className="text-input" name="unit" type="text" defaultValue={grocery?.unit || ""} />
        </label>
        <label className="mb-2">
          Is out of stock{" "}
          <input
            name="is_out_of_stock"
            type="checkbox"
            defaultChecked={grocery?.is_out_of_stock || false}
          />
        </label>

        <button className="btn-primary" onClick={grocery ? handleUpdate : handleCreate} type="button">
          {grocery ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default GroceryForm;
