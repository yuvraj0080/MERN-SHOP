import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card
      key={product.id}
      className="w-full max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300"
    >
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="relative cursor-pointer"
      >
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[300px] object-cover rounded-t-lg mb-2"
        />
        {/* Badges */}
        {product?.totalStock === 0 || product?.totalStock < 0 ? (
          <Badge className="absolute top-2 left-2 bg-gray-500 hover:bg-gray-600">
            Out Of Stock
          </Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {`Only ${product?.totalStock} left`}
          </Badge>
        ) : product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Sale
          </Badge>
        ) : null}

        <CardContent className="p-4">
          {/* Title */}
          <h2 className="text-xl font-bold mb-2 text-gray-800 hover:text-primary transition-colors">
            {product?.title}
          </h2>
          {/* Category and Brand */}
          <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
            <span>{categoryOptionsMap[product?.category]}</span>
            <span>{brandOptionsMap[product?.brand]}</span>
          </div>
          {/* Prices */}
          <div className="flex justify-between items-center">
            <span
              className={`text-lg ${
                product.salePrice > 0
                  ? "text-gray-400 line-through"
                  : "text-primary font-semibold"
              }`}
            >
              ${product?.price}
            </span>
            {product.salePrice > 0 && (
              <span className="text-lg text-primary font-semibold">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>
      {/* Footer - Add to Cart Button */}
      <CardFooter className="p-4">
        {product?.totalStock === 0 || product?.totalStock < 0 ? (
          <Button disabled={true} className="w-full bg-gray-200 text-gray-500">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold transition-all duration-300"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
