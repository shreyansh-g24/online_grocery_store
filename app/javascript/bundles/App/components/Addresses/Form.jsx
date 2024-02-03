import React, { useRef } from "react";
import { createAddress, updateAddress } from "../../api/addresses";

const AddressForm = ({ onCreate, onUpdate, address }) => {
  const formRef = useRef();

  const getFormData = () => {
    const formData = new FormData(formRef.current);
    return Object.fromEntries(formData.entries());
  }

  const handleCreate = () => {
    const data = getFormData()
    createAddress({ address: data })
      .then((response) => {
        onCreate(response.address)
      })
      .catch(() => 0);
  };

  const handleUpdate = () => {
    const data = getFormData()
    updateAddress({ address: data }, address.id)
      .then(response => {
        onUpdate(response.address)
      })
      .catch(() => 0)
  }

  return (
    <div>
      <form ref={formRef}>
        <label>
          Label
          <input name="label" type="text" defaultValue={address?.label || ""} />
        </label>
        <label>
          Full Address
          <input name="full_address" type="text" defaultValue={address?.full_address || ""} />
        </label>
        <label>
          Contact
          <input name="contact" type="text" defaultValue={address?.contact || ""} />
        </label>

        <button onClick={address ? handleUpdate : handleCreate} type="button">
          {address ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
