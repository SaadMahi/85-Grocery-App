"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";

const ProductItemDetail = ({ product }) => {
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [productTotalPrice, setProductTotalPrice] = useState(
    product?.attributes?.sellingPrice
      ? product?.attributes?.sellingPrice
      : product?.attributes?.mrp,
  );

  const [quantity, setQuantity] = useState(1);

  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const addToCart = () => {
    setLoading(true);
    if (!jwt) {
      setLoading(false);
      router.push("/sign-in");
      return;
    } else {
      const data = {
        data: {
          quantity: quantity,
          amount: (quantity * productTotalPrice).toFixed(2),
          products: product.id,
          users_permissions_user: user.user.id,
          userId: user.user.id,
        },
      };
      GlobalApi.addToCart(data, jwt).then(
        (res) => {
          console.log(res.data.data);
          toast("Added to Cart");
          setUpdateCart(!updateCart);
          setLoading(false);
        },
        (e) => {
          setLoading(false);
          toast("Error while adding into cart");
        },
      );
    }
  };

  return (
    <div className="grid grid-cols-1 bg-white p-7 text-black md:grid-cols-2">
      <Image
        className="h-[320px] w-[300px] rounded-lg bg-slate-100 object-contain p-5"
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.formats?.small?.url
        }
        width={300}
        height={300}
        alt={product?.attributes?.name}
      />

      <div className="space-y-3">
        <h2 className="text-2xl font-bold">{product?.attributes?.name}</h2>
        <p className="text-sm text-gray-500">
          {product?.attributes?.description}
        </p>

        <div className="flex gap-3">
          {product.attributes.sellingPrice && (
            <h2 className="text-2xl font-bold">
              ₹{product.attributes.sellingPrice}
            </h2>
          )}
          <h2
            className={`text-2xl font-bold ${product.attributes.sellingPrice && "text-gray-500 line-through"}`}
          >
            ₹{product.attributes.mrp}
          </h2>
        </div>

        <h2 className="text-lg font-medium">
          Quantity ({product?.attributes?.itemQuantityType})
        </h2>

        <div className="flex flex-col items-baseline gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-10 border p-2 px-5">
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <p>{quantity}</p>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <p className="text-2xl font-bold">
              = ₹{(quantity * productTotalPrice).toFixed(2)}
            </p>
          </div>
          <Button
            disabled={loading}
            onClick={() => addToCart()}
            className="flex gap-3"
          >
            <ShoppingBasket />
            {loading ? <Loader2Icon className="animate-spin" /> : "Add to cart"}
          </Button>
        </div>
        <h2>
          <span className="font-bold">Category: </span>
          {product?.attributes?.categories?.data[0]?.attributes?.name}
        </h2>
      </div>
    </div>
  );
};

export default ProductItemDetail;
