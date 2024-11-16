import Address from "@/components/shopping-view/address";
import accountImg from "../../assets/account.jpg";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-content";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);

  const totalCartAmount =
    cartItems && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
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
        <Address />
        <div className="flex flex-col gap-5">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((cartItem) => (
                <UserCartItemsContent cartItem={cartItem} />
              ))
            : "Cart is empty"}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
              <Button className="w-full">Continue with Payment</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
