import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";

function Address({setCurrentSelectedAddress}) {
  const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditAddressId, setCurrentEditAddressId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditAddressId == null) {
      setFormData(initialAddressFormData);
      toast({
        title: "Only 3 Address can be added",
        variant: "destructive",
      });

      return;
    }

    currentEditAddressId !== null
      ? dispatch(
          editAddress({
            formData,
            userId: user?.id,
            addressId: currentEditAddressId,
          })
        ).then((data) => {
          if (data?.payload.success) {
            dispatch(fetchAllAddress(user?.id));
            setCurrentEditAddressId(null);
            setFormData(initialAddressFormData);
            toast({
              title: "Address Edited",
            });
          }
        })
      : dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllAddress(user?.id));
              setFormData(initialAddressFormData);
              toast({
                title: "Address Added",
              });
            }
          }
        );
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
    ).then((data) => {
      if (data?.payload.success) {
        dispatch(fetchAllAddress(user?.id));
        toast({
          title: "Address Deleted",
          variant: "destructive",
        });
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditAddressId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);

  return (
    <Card className="border border-gray-200 shadow-md rounded-lg p-6 bg-gray-50">
      <div className="mb-6 grid gap-6 grid-cols-1 xl:grid-cols-3 md:grid-cols-2">
        {addressList && addressList.length > 0 ? (
          addressList.map((singleAddress, index) => (
            <AddressCard
              handleEditAddress={handleEditAddress}
              handleDeleteAddress={handleDeleteAddress}
              key={index}
              index={index}
              addressInfo={singleAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No addresses found.</p>
        )}
      </div>

      <CardHeader className="pb-4 border-b border-gray-300">
        <CardTitle className="text-xl font-semibold text-gray-800">
          {currentEditAddressId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={
            currentEditAddressId !== null ? "Save Changes" : "Add Address"
          }
          onSubmit={handleManageAddress}
          isButtonDisabled={!isFormValid()}
          className="w-full max-w-md mx-auto"
        />
      </CardContent>
    </Card>
  );
}

export default Address;
