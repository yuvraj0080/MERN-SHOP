import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";



function AddressCard({ addressInfo, index, handleDeleteAddress, handleEditAddress }) {
  return (
    <Card className="border border-gray-200 shadow-md rounded-lg hover:shadow-lg transition-shadow">
      <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Address {index + 1}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 p-4 text-gray-600">
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
      <CardFooter className="flex justify-around bg-gray-50 p-4 rounded-b-lg border-t border-gray-200">
        <Button 
          variant="outline" 
          onClick={() => handleEditAddress(addressInfo)} 
          className="text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors"
        >
          Edit
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleDeleteAddress(addressInfo)} 
          className="text-red-600 border-red-600 hover:bg-red-50 transition-colors"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}


export default AddressCard;