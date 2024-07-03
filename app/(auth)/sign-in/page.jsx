"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }
  }, []);

  const onSignIn = () => {
    setLoader(true);
    GlobalApi.signIn(email, password).then(
      (res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        sessionStorage.setItem("jwt", res.data.jwt);

        router.push("/");
        setLoader(false);
        toast("Login Successfull");
      },
      (e) => {
        setLoader(false);
        toast(e?.response?.data?.error?.message);
      },
    );
  };

  return (
    <section className="my-20 flex justify-center">
      <div className="flex flex-col items-center border border-gray-200 bg-slate-100 p-10">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            width={50}
            height={70}
            alt="grocery-store-logo"
            priority
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-orange-500">Grocery</span>
            <span className="text-xl font-bold text-primary">Store</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold">Sign in to Account</h2>
        <h3 className="text-gray-500">
          Enter your email and password to Sign In
        </h3>

        <div className="mt-7 flex w-full flex-col gap-5">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <Button onClick={() => onSignIn()} disabled={!(email || password)}>
            {loader ? <LoaderIcon className="animate-spin" /> : "Sign In"}
          </Button>
          <p>
            Don't have an account ?{" "}
            <Link href="/create-account" className="text-blue-500">
              Click here to Create New Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
