import Image from "next/image";

const MyOrderItem = ({ orderItem }) => {
  console.log(
    orderItem.products.data.attributes.images.data[0].attributes.name.replace(
      ".png",
      "",
    ),
  );

  return (
    <div className="mt-3 grid w-[78%] grid-cols-3 items-center">
      <div className="flex items-center gap-1">
        <Image
          className="rounded-md border bg-gray-100 object-contain p-6"
          src={
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            orderItem.products.data.attributes.images.data[0].attributes.url
          }
          width={80}
          height={80}
          alt={orderItem.products.data.attributes.images.data[0].attributes.name.replace(
            ".png",
            "",
          )}
        />

        <div>
          <p>{orderItem.products.data.attributes.name}</p>
        </div>
      </div>

      <div>
        <p>Item Price: ₹{orderItem.products.data.attributes.mrp}</p>
      </div>

      <div>
        <p>Quantity: {orderItem.quantity}</p>
        <p>Price: ₹{orderItem.amount}</p>
      </div>
    </div>
  );
};

export default MyOrderItem;
