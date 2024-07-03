import { TrashIcon } from "lucide-react";
import Image from "next/image";

const CartItemList = ({ cartItemList, onDeleteItem }) => {
  console.log(cartItemList);

  return (
    <div>
      <div className="max-h-[calc(100vh-180px)] overflow-y-auto pb-10">
        {cartItemList?.map((cart, index) => (
          <div
            key={index}
            className="mb-5 flex items-center justify-between p-2"
          >
            <div className="flex items-center gap-6">
              <Image
                className="border p-2"
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.image}
                width={70}
                height={70}
                alt={cart.name}
              />

              <div>
                <h2 className="font-bold">{cart.name}</h2>
                <h2>Quantity{cart.quantity}</h2>
                <h2 className="text-lg font-bold">₹ {cart.amount}</h2>
              </div>
            </div>
            <TrashIcon
              onClick={() => onDeleteItem(cart.id)}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;
