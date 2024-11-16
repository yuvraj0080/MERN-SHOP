import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accountImg from "../../assets/account.jpg";
import ShoppingOrders from "@/components/shopping-view/orders";
import Address from "@/components/shopping-view/address";

function ShoppingAccount() {
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

      {/* Account Tabs Section */}
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col  rounded-lg bg-gray-50 p-6 shadow-md border border-gray-200">
          <Tabs defaultValue="orders">
            <TabsList className="flex justify-start mb-4 border-b border-gray-300">
              <TabsTrigger
                value="orders"
                className="py-2 px-4 text-sm font-semibold text-gray-700 hover:text-primary transition"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="py-2 px-4 text-sm font-semibold text-gray-700 hover:text-primary transition"
              >
                Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="py-4">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address" className="py-4">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
