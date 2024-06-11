import { Button } from "@/components/ui/button";
import { LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="flex justify-between p-5 shadow-sm">
      <div className="flex items-center gap-8">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            width={50}
            height={70}
            alt="grocery-store-logo"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-orange-500">Grocery</span>
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="mx-5 hidden items-center gap-3 rounded-full border p-2 md:flex">
          <Search />
          <input className="outline-none" type="text" placeholder="Search" />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <h2 className="flex gap-2 text-lg">
          <ShoppingBag />0
        </h2>
        <Button>Login</Button>
      </div>
    </header>
  );
};

export default Header;
