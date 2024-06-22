import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from "./ProductItemDetail";

const ProductItem = ({ product }) => {
  return (
    <div className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border p-2 transition-all ease-in-out hover:scale-110 hover:shadow-lg md:p-6">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.formats?.large?.url
        }
        alt={product.attributes.name}
        width={500}
        height={200}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="text-lg font-bold">{product.attributes.name}</h2>
      <div className="flex gap-3">
        {product.attributes.sellingPrice && (
          <h2 className="text-lg font-bold">
            ₹{product.attributes.sellingPrice}
          </h2>
        )}
        <h2
          className={`text-lg font-bold ${product.attributes.sellingPrice && "text-gray-500 line-through"}`}
        >
          ₹{product.attributes.mrp}
        </h2>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary hover:bg-primary hover:text-white"
          >
            Add to cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <ProductItemDetail product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductItem;
