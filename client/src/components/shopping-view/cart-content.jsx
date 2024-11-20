import { MinusIcon, PlusIcon, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems, updateCartItems } from "@/store/shop/cart-slice";
import { toast, useToast } from "@/hooks/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector(
    (state) => state.shopProducts
  );
  const dispatch = useDispatch();
  const {toast} = useToast()

  function handleUpdateQuantity(getCartItem, action) {
    
    
    if(action =='increase'){
      let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCartItem?.productId
      );

      const getCurrentProductIndex = productList.findIndex(product => product._id === getCartItem.productId)

      const getCurrentProductTotalStock = productList[getCurrentProductIndex].totalStock;
      
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getCurrentProductTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added to cart`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    }

    dispatch(
      updateCartItems({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          action === "increase"
            ? cartItem?.quantity + 1
            : cartItem?.quantity - 1,
      })
    );
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItems({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Product removed from cart",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-bold">{cartItem?.title}</h3>
        <div className="flex items-center mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "decrease")}
          >
            <MinusIcon className="w-4 h-4" />
            <span className="sr-only">Decrease Quantity</span>
          </Button>
          <span className="font-semibold mx-1">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "increase")}
          >
            <PlusIcon className="w-4 h-4" />
            <span className="sr-only">Increase Quantity</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(cartItem.salePrice ? cartItem.salePrice : cartItem.price) *
            cartItem?.quantity}
        </p>

        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer h-4 w-4 mt-1"
          color="red"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
