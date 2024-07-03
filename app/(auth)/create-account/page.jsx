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

const CreateAccount = () => {
  const [username, setUsername] = useState();
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

  const onCreateAccount = () => {
    setLoader(true);
    GlobalApi.registerUser(username, email, password).then(
      (res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        sessionStorage.setItem("jwt", res.data.jwt);

        setLoader(false);

        router.push("/");

        toast("Account Created Successfully");
      },
      (e) => {
        setLoader(false);
        toast("Error while Creating Account | ", e.message);
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
        <h2 className="text-3xl font-bold">Create Account</h2>
        <h3 className="text-gray-500">
          Enter your email and password to create an account
        </h3>

        <div className="mt-7 flex w-full flex-col gap-5">
          <Input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <Button
            onClick={() => onCreateAccount()}
            disabled={!(username || email || password)}
          >
            {loader ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              "Create an Account"
            )}
          </Button>
          <p>
            Already have an account ?{" "}
            <Link href="/sign-in" className="text-blue-500">
              Click here to Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CreateAccount;
