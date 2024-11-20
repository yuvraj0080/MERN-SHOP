import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getOrderDetailsAdmin, updateOrderStatus } from "@/store/admin/order-slice";
import { useToast } from "@/hooks/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({orderDetails}) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const {toast} =useToast()

  function handleUpdateStatus(event) {
    event.preventDefault();
    const {status} = formData
    dispatch(updateOrderStatus({id:orderDetails?._id , orderStatus: status})).then((data) => {
      if(data.payload.success){
        dispatch(getOrderDetailsAdmin(orderDetails?._id))
        dispatch(getAllOrders())
        setFormData(initialFormData)
        toast({
          title: data.payload.message
        })
      }      
    }).catch((err) => {
      console.log(err,"Error in updateOrderStatus");
      
    });
  }
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription className='sr-only'>Order Details
          </DialogDescription>
        </DialogHeader>
      <div className="grid gap-6">
        <div className="flex mt-6 items-center justify-between">
          <p className="font-medium">Order ID</p>
          <Label>{orderDetails?._id}</Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Order Date</p>
          <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Price</p>
          <Label>${orderDetails?.totalAmount}</Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Payment method</p>
          <Label>{orderDetails?.paymentMethod}</Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Payment Status</p>
          <Label>{orderDetails?.paymentStatus}</Label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Status</p>
          <Label>
            <Badge
              className={`py-1 px-3 ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-600"
                  : "bg-black"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </Label>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details </div>
            <ul className="grip gap-3">
              {orderDetails && orderDetails.cartItems
                ? orderDetails.cartItems.map((item) => (
                    <li className=" flex items-center justify-between">
                      <span>{item.title}</span>
                      <span>x{item.quantity}</span>
                      <span>${item.price}</span>
                    </li>
                  ))
                : "Error getting the details"}
            </ul>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Details </div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Name - {user.userName}</span>
              <span>Address :-</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "rejected", label: "Rejected" },
                  { id: "delivered", label: "Delivered" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update order status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
