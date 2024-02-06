import React, { useEffect, useMemo, useState } from "react";
import { fetchAddresses } from "../../api/addresses";
import AddressForm from "./Form";
import Address from "./Address";

const AddressesIndex = () => {
  const [addresses, setAddresses] = useState([]);
  const [showAddressFormForId, setShowAddressFormForId] = useState("");
  const showAddressForm = useMemo(
    () => !!showAddressFormForId,
    [showAddressFormForId]
  );
  const editAddress = useMemo(() => {
    if (showAddressFormForId !== "new") {
      return addresses.find((add) => add.id === showAddressFormForId);
    }

    return undefined;
  }, [showAddressFormForId]);

  useEffect(() => {
    fetchAddresses()
      .then((response) => setAddresses(response.addresses))
      .catch(() => 0);
  }, []);

  const handleAddAddress = () => {
    setShowAddressFormForId("new");
  };

  const handleEditAddress = (address) => {
    setShowAddressFormForId(address.id);
  };

  const handleAddressCreate = (address) => {
    setShowAddressFormForId("");
    setAddresses(addresses.concat([address]));
  };

  const handleAddressUpdate = (address) => {
    const updatedAddresses = addresses.map((add) =>
      add.id === address.id ? address : add
    );
    setShowAddressFormForId("");
    setAddresses(updatedAddresses);
  };

  return (
    <div className="w-screen p-4 flex flex-col justify-center items-center">
      <div className="mb-4">
        {showAddressForm ? (
          <AddressForm
            onCreate={handleAddressCreate}
            address={editAddress}
            onUpdate={handleAddressUpdate}
          />
        ) : (
          <button className="btn-primary" onClick={handleAddAddress}>
            Add address
          </button>
        )}
      </div>
      <div className="w-full grid grid-flow-row grid-cols-3 gap-4">
        {addresses.map((address) => {
          return (
            <Address
              key={address.id}
              address={address}
              handleEdit={() => handleEditAddress(address)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AddressesIndex;
