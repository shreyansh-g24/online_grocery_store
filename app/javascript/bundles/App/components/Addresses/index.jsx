import React, { useEffect, useState } from "react";
import { fetchAddresses } from "../../api/addresses";

const AddressesIndex = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetchAddresses()
      .then(response => setAddresses(response.addresses))
      .catch(() => 0)
  }, [])

  return (
    <div>
      Addresses
      {JSON.stringify(addresses)}
    </div>
  )
}

export default AddressesIndex;
