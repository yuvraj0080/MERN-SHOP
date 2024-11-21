import StarRatingComponent from "@/components/common/star-rating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { addProductReview, getProductReviews } from "@/store/shop/review-slice";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }

  function handleAddReview() {
    dispatch(
      addProductReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getProductReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddtoCart(getCurrentProductId, getCurrentProductTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );

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
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Added to Cart",
        });
      }
    });
  }
  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getProductReviews(productDetails?._id));
    }
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 max-h-[80%] overflow-auto scrollbar-hide sm:grid-cols-2 gap-8 sm:p-10 p-6 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-background rounded-lg shadow-xl">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg bg-muted-foreground/10 shadow-lg h-[70%] mx-auto">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          {/* Title & Description */}
          <div>
            <DialogTitle className="text-3xl font-extrabold font-serif text-primary">
              {productDetails?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              {productDetails?.description}
            </DialogDescription>
            {averageReview > 0 && (
              <div className="flex items-center gap-1 mt-4">
                <StarRatingComponent rating={averageReview} />
                <span className="text-primary text-sm">
                  {averageReview.toFixed(2)} / 5
                </span>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between">
            <p
              className={`font-semibold ${
                productDetails?.salePrice > 0
                  ? "text-lg line-through text-muted-foreground"
                  : "font-bold text-xl text-primary"
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-xl font-bold text-primary">
                ${productDetails?.salePrice}
              </p>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="mt-3">
            {productDetails?.totalStock === 0 ||
            productDetails?.totalStock < 0 ? (
              <Button
                disabled
                className="w-full bg-muted text-muted-foreground cursor-not-allowed"
              >
                Out Of Stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddtoCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Add to Cart
              </Button>
            )}
          </div>

          <Separator />

          {/* Reviews Section */}
          <div className="flex flex-col gap-4 max-h-[300px] overflow-auto">
            <h2 className="text-lg font-bold text-muted-foreground mb-4">
              Reviews
            </h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div key={reviewItem.id} className="flex items-start gap-4">
                    <Avatar className="w-10 h-10 border bg-muted-foreground/20">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <h3 className="font-bold text-sm text-primary">
                        {reviewItem?.userName}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-sm text-muted-foreground p-0.5">
                        {reviewItem?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No reviews available.</p>
              )}
            </div>

            {/* Add Review Section */}
            <div className="mt-6 flex flex-col gap-3">
              <Label className="text-muted-foreground font-semibold">
                Write a review
              </Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
                className="border-muted-foreground/20"
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
                className={`bg-primary hover:bg-primary/90 text-white mt-2 ${
                  reviewMsg.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
