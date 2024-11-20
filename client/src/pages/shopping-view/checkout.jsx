import Address from "@/components/shopping-view/address";
import accountImg from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/hooks/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitiatePaypal() {
    if (cartItems.items.length === 0) {
      toast({
        title: "Cart is empty",
        variant: "destructive",
      });
    }

    if (!currentSelectedAddress) {
      toast({
        title: "Select Address to proceed",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData))
      .then((data) => {
        console.log("Data received:", data);
        if (data.payload.success) {
          setIsPaymentStart(true);
        } else {
          setIsPaymentStart(false);
        }
      })
      .catch((error) => console.error("Error creating PayPal order", error));
  }

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      {/* Header Image */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          className="object-center h-full w-full object-cover"
          src={accountImg}
          alt="Account Background"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-5">
          {cartItems && cartItems.items && cartItems.items.length > 0 ? (
            <>
              {cartItems.items.map((cartItem) => (
                <UserCartItemsContent cartItem={cartItem} />
              ))}

              {/* Total and Button */}
              <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${totalCartAmount}</span>
                </div>
              </div>
              <div className="mt-4 w-full">
                <Button onClick={handleInitiatePaypal} className="w-full">
                  Continue with Payment
                </Button>
              </div>
            </>
          ) : (
            "Cart is empty"
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
