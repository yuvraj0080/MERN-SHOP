import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView() {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="flex mt-6 items-center justify-between">
          <p className="font-medium">Order ID</p>
          <Label>123456</Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Order Date</p>
          <Label>123456</Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Price</p>
          <Label>123456</Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Status</p>
          <Label>123456</Label>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details </div>
            <ul className="grip gap-3">
              <li className=" flex items-center justify-between">
                <span>Product 1</span>
                <span>Price</span>
              </li>
            </ul>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Details </div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Name</span>
              <span>Address</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone</span>
              <span>Notes</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
