import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProducts, fetchAllProducts } from "@/store/admin/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProducts, setOpenCreateProducts] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setuploadImageUrl] = useState("");
  const [imageLoadingFile, setimageLoadingFile] = useState(false);
  const { productList } = useSelector((state) => state.adminProducts);
  const [currentEditID, setcurrentEditID] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(
      addNewProducts({
        ...formData,
        image: uploadImageUrl,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenCreateProducts(false);
        setImageFile(null);
        setuploadImageUrl("");
        setFormData(initialFormData);
        toast({
          title: "Product Added successfully",
          className:
            "bg-green-700 text-white border border-green-400 rounded-md p-4",
          duration: 3000,
        });
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-end w-full mb-5">
        <Button onClick={() => setOpenCreateProducts(true)}>
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                setFormData={setFormData}
                setOpenCreateProducts={setOpenCreateProducts}
                setcurrentEditID={setcurrentEditID}
                product={productItem}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openCreateProducts}
        onOpenChange={() => {
          setOpenCreateProducts(false)
          setcurrentEditID(null)
          setFormData(initialFormData)
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader className="mb-5 border-b">
            <SheetTitle className="font-bold text-2xl">
              Add New Products
            </SheetTitle>
          </SheetHeader>{currentEditID == null &&
          <ProductImageUpload
            file={imageFile}
            setFile={setImageFile}
            uploadImageUrl={uploadImageUrl}
            setuploadImageUrl={setuploadImageUrl}
            imageLoadingFile={imageLoadingFile}
            setimageLoadingFile={setimageLoadingFile}
            isEditing={currentEditID !== null}
          />}
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText="Add Listing"
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProducts;
