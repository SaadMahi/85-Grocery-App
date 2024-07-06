import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const OrderConfirmation = () => {
  return (
    <section className="my-20 flex justify-center">
      <div className="flex flex-col items-center justify-center gap-3 rounded-md border p-20 px-32 shadow-md">
        <CheckCircle2 className="h-24 w-24 text-primary" />
        <h2 className="text-3xl font-medium text-primary">Order Successfull</h2>
        <h2>Thank you so much for your order</h2>
        <Button className="mt-8">Track your order</Button>
      </div>
    </section>
  );
};

export default OrderConfirmation;
