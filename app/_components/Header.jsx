"use client";

import { Button } from "@/components/ui/button";
import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";

const Header = () => {
  const { updateCart } = useContext(UpdateCartContext);
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [categoryList, setCategoryList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      setCategoryList(res.data.data);
    });
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    getCartItems();
  }, [updateCart]);

  // user signed in or not ?
  const isLogin = sessionStorage.getItem("jwt") ? true : false;

  const router = useRouter();

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  // conditional rendering
  const params = usePathname();
  const showHeader =
    params === "/sign-in" || params === "/create-account" ? false : true;

  // get cart items
  const getCartItems = async () => {
    const cartItemList = await GlobalApi.getCartItems(user.user.id, jwt);
    console.log(cartItemList);
    setTotalCartItem(cartItemList?.length);
  };

  return (
    <>
      {showHeader && (
        <header className="flex justify-between p-5 shadow-sm">
          <div className="flex items-center gap-8">
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                width={50}
                height={70}
                alt="grocery-store-logo"
                priority
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-orange-500">
                  Grocery
                </span>
                <span className="text-xl font-bold text-primary">Store</span>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <h2 className="hidden gap-2 rounded-full border bg-slate-200 p-2 px-10 md:flex">
                  <LayoutGrid />
                  Category
                </h2>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {categoryList.map((category, index) => (
                  <Link
                    key={index}
                    href={"/product-category/" + category?.attributes?.name}
                  >
                    <DropdownMenuItem
                      key={index}
                      className="flex cursor-pointer gap-2"
                    >
                      <Image
                        unoptimized={true}
                        src={
                          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                          category.attributes.icon.data[0].attributes.url
                        }
                        alt="icon"
                        width={30}
                        height={30}
                      />
                      <h1 className="text-lg">{category.attributes.name}</h1>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="mx-5 hidden items-center gap-3 rounded-full border p-2 md:flex">
              <Search />
              <input
                className="outline-none"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <h2 className="flex gap-2 text-lg">
              <ShoppingBag />
              {totalCartItem}
            </h2>
            {!isLogin ? (
              <Link href="/sign-in">
                <Button>Login</Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <CircleUserRound
                    className="h-12 w-12 cursor-pointer rounded-full bg-green-100 text-primary"
                    height={30}
                    width={30}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>My Order</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSignOut()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
