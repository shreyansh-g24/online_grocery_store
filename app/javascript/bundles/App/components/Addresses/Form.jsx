import React, { useRef } from "react";
import { createAddress, updateAddress } from "../../api/addresses";

const AddressForm = ({ onCreate, onUpdate, address }) => {
  const formRef = useRef();

  const getFormData = () => {
    const formData = new FormData(formRef.current);
    return Object.fromEntries(formData.entries());
  };

  const handleCreate = () => {
    const data = getFormData();
    createAddress({ address: data })
      .then((response) => {
        onCreate(response.address);
      })
      .catch(() => 0);
  };

  const handleUpdate = () => {
    const data = getFormData();
    updateAddress({ address: data }, address.id)
      .then((response) => {
        onUpdate(response.address);
      })
      .catch(() => 0);
  };

  return (
    <div>
      <form
        ref={formRef}
        className="flex flex-col items-center justify-center border-2 p-4 border-black"
      >
        <label className="mb-2">
          Label{": "}
          <input
            className="text-input"
            name="label"
            type="text"
            defaultValue={address?.label || ""}
          />
        </label>
        <label className="mb-2">
          Full Address{": "}
          <input
            className="text-input"
            name="full_address"
            type="text"
            defaultValue={address?.full_address || ""}
          />
        </label>
        <label className="mb-2">
          Contact{": "}
          <input
            className="text-input"
            name="contact"
            type="text"
            defaultValue={address?.contact || ""}
          />
        </label>

        <button className="btn-primary" onClick={address ? handleUpdate : handleCreate} type="button">
          {address ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
