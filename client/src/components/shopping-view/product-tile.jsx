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
    <Card key={product.id} className="w-full max-w-sm mx-auto">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="relative"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[300px] object-cover rounded-t-lg mb-2"
        />
        {product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-700">
            On Sale
          </Badge>
        ) : null}
      
      <CardContent>
        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            {categoryOptionsMap[product?.category]}
          </span>
          <span className="text-sm text-muted-foreground ">
            {brandOptionsMap[product?.brand]}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span
            className={`text-lg text-primary  ${
              product.salePrice > 0
                ? "line-through font-normal"
                : "font-semibold"
            }`}
          >
            ${product?.price}
          </span>
          {product.salePrice > 0 ? (
            <span className="text-lg text-primary font-semibold">
              ${product?.salePrice}
            </span>
          ) : null}
        </div>
      </CardContent>
      </div>
      <CardFooter>
        <Button
          onClick={() => handleAddtoCart(product?._id)}
          className="w-full"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
