import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  file,
  setFile,
  uploadImageUrl,
  setuploadImageUrl,
  imageLoadingFile,
  setimageLoadingFile,
  isEditing
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  }

  function handleOnDragOver(event) {
    event.preventDefault();
  }
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  }
  function handleremoveImage() {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImagToCLoudinary() {
    setimageLoadingFile(true);
    const data = new FormData();
    data.append("my_file", file);

    const response = await axios.post(
      "http://127.0.0.1:5000/api/admin/products/upload-image",
      data
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setuploadImageUrl(response.data.result.url);
      setimageLoadingFile(false);
    }
  }

  useEffect(() => {
    if (file !== null) uploadImagToCLoudinary();
  }, [file]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-base mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleOnDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-2"
      >
        <Input
          className="hidden"
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditing}
        />
        {!file ? (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center h-32 cursor-pointer ${ isEditing? 'cursor-not-allowed':''}`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="">Drag or Click to upload</span>
          </Label>
        ) : (
          imageLoadingFile ? 
          <Skeleton className="h-10 bg-gray-200" /> :
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-7 text-primary mr-2 h-8" />
              <p className="text-sm font-medium">{file.name}</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleremoveImage}
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Remove FIle</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
