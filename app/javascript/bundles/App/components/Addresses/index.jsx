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
    <div>
      <button onClick={handleAddAddress}>Add address</button>
      {showAddressForm ? (
        <AddressForm
          onCreate={handleAddressCreate}
          address={editAddress}
          onUpdate={handleAddressUpdate}
        />
      ) : null}
      Addresses
      {addresses.map((address) => {
        return (
          <Address
            address={address}
            handleEdit={() => handleEditAddress(address)}
          />
        );
      })}
    </div>
  );
};

export default AddressesIndex;
