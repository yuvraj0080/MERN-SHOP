import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  index,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
}) {
  return (
    <Card
      onClick={() =>
        setCurrentSelectedAddress
          ? setCurrentSelectedAddress(addressInfo)
          : null
      }
      className="rounded-lg shadow-md"
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold mb-2">
          Address {index + 1}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 text-sm">
        <Label className="font-medium">
          Address: <span className="font-normal">{addressInfo?.address}</span>
        </Label>
        <Label className="font-medium">
          City: <span className="font-normal">{addressInfo?.city}</span>
        </Label>
        <Label className="font-medium">
          Pincode: <span className="font-normal">{addressInfo?.pincode}</span>
        </Label>
        <Label className="font-medium">
          Phone: <span className="font-normal">{addressInfo?.phone}</span>
        </Label>
        <Label className="font-medium">
          Notes: <span className="font-normal">{addressInfo?.notes}</span>
        </Label>
      </CardContent>
      <CardFooter className="flex justify-around pt-2">
        <Button
          variant="secondary"
          onClick={() => handleEditAddress(addressInfo)}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
