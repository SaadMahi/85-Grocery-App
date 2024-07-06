"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import moment from "moment";
import MyOrderItem from "./_components/MyOrderItem";

const MyOrder = () => {
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [orderList, setOrderList] = useState([]);

  const router = useRouter();
  useEffect(() => {
    if (!jwt) {
      router.replace("/");
    }

    getMyOrder();
  }, []);

  const getMyOrder = async () => {
    const orderList = await GlobalApi.getMyOrder(user.user.id, jwt);
    console.log(orderList);
    setOrderList(orderList);
  };

  return (
    <section>
      <h1 className="mx-5 rounded-md bg-primary p-3 text-center text-xl font-bold text-white">
        My Order
      </h1>

      <div className="mx-7 py-8 md:mx-20">
        <h2 className="mb-10 text-3xl font-bold text-primary">Order History</h2>

        <div>
          {orderList.map((item, index) => (
            <div key={index}>
              <div className="flex w-fit gap-24 border bg-slate-100 p-2">
                <p>
                  {" "}
                  <span className="mr-1 font-bold">Order Date:</span>{" "}
                  {moment(item.createdAt).format("DD/MM/YY")}
                </p>
                <p>
                  <span className="mr-1 font-bold">Total Amount:</span>$
                  {item?.totalOrderAmount}
                </p>
                <p>
                  <span className="mr-1 font-bold">Status:</span>
                  {item?.status}
                </p>
              </div>

              <div>
                {item.orderItemList.map((order, index) => (
                  <MyOrderItem orderItem={order} key={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyOrder;
