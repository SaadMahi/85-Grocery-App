"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Checkout = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const router = useRouter();

  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);

  // form handling
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();

  // get cart items
  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    }
    getCartItems();
  }, []);

  const getCartItems = async () => {
    const cartItemList_ = await GlobalApi.getCartItems(
      user?.user?.id,
      jwt,
    ).catch((e) => console.log(e));
    setTotalCartItem(cartItemList_?.length || 0);
    setCartItemList(cartItemList_);
  };

  // sub total in cart
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItemList?.forEach((element) => (total = total + element.amount));
    setSubtotal(total.toFixed(2));
  }, [cartItemList]);

  // final total value
  const calcTotalAmount = () => {
    const cartValue = Number(subtotal);
    const gst = cartValue * 0.09;
    const totalAmount = (cartValue + gst + (cartValue < 300 ? 120 : 0)).toFixed(
      2,
    );
    return totalAmount;
  };

  return (
    <section>
      <h2 className="mx-5 rounded-md bg-primary p-3 text-center text-xl font-bold text-white">
        Checkout
      </h2>

      <div className="grid grid-cols-1 gap-5 p-5 px-5 py-8 md:grid-cols-3 md:px-10">
        <div className="mx-20 md:col-span-2">
          <h2 className="text-3xl font-bold">Billing Details</h2>
          <div className="mt-3 grid grid-cols-2 gap-10">
            <Input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Name"
            />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-10">
            <Input
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            <Input onChange={(e) => setZip(e.target.value)} placeholder="Zip" />
          </div>
          <div className="mt-3">
            <Input
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>
        </div>

        <div className="mx-10 border">
          <h2 className="bg-gray-200 p-3 text-center font-bold">
            Total Cart ({totalCartItem})
          </h2>
          <div className="flex flex-col gap-4 p-4">
            <h2 className="flex justify-between font-bold">
              Subtotal : <span>₹{subtotal}</span>
            </h2>
            <hr></hr>

            <h2 className="flex justify-between">
              Delivery : <span>{subtotal < 300 ? "₹120/-" : "Free"}</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%) : <span>₹{subtotal * 0.09}</span>
            </h2>

            <hr></hr>

            <h2 className="flex justify-between font-bold">
              Total : <span>₹{calcTotalAmount()}</span>
            </h2>

            <Button>
              Payment <ArrowBigRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
