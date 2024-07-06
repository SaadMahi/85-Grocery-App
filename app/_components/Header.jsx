"use client";

import { Button } from "@/components/ui/button";
import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
import CartItemList from "./CartItemList";
import { toast } from "sonner";

const Header = () => {
  const { updateCart } = useContext(UpdateCartContext);
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const [categoryList, setCategoryList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);

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
    const cartItemList_ = await GlobalApi.getCartItems(
      user?.user?.id,
      jwt,
    ).catch((e) => console.log(e));
    setTotalCartItem(cartItemList_?.length || 0);
    setCartItemList(cartItemList_);
  };

  // delete items from cart
  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt).then((res) => {
      getCartItems();
      toast("Item removed !");
    });
  };

  // sub total in cart
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItemList?.forEach((element) => (total = total + element.amount));
    setSubtotal(total.toFixed(2));
  }, [cartItemList]);

  return (
    <>
      {showHeader && (
        <header className="flex justify-between p-5 shadow-sm">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
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
            </Link>

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
            <Sheet>
              <SheetTrigger>
                <h2 className="flex items-center gap-2 text-lg">
                  <ShoppingBag size={30} />

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border bg-primary text-white">
                    {totalCartItem}
                  </span>
                </h2>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="py-4">
                  <SheetTitle className="rounded-md bg-primary p-2 font-bold text-white">
                    My Cart
                  </SheetTitle>
                  <SheetDescription>
                    <CartItemList
                      cartItemList={cartItemList}
                      onDeleteItem={onDeleteItem}
                    />
                  </SheetDescription>
                </SheetHeader>
                <SheetClose asChild>
                  <div className="absolute bottom-5 flex w-[90%] flex-col">
                    <h2 className="flex justify-between text-lg font-bold">
                      Subtotal <span>₹{subtotal}</span>
                    </h2>
                    <Button
                      onClick={() => router.push(jwt ? "/checkout" : "sign-in")}
                    >
                      Checkout
                    </Button>
                  </div>
                </SheetClose>
              </SheetContent>
            </Sheet>

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

                  <Link href="/my-order">
                    <DropdownMenuItem>My Order</DropdownMenuItem>
                  </Link>

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
