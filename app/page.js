import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();

  return (
    <div className="md:p-15 p-5 px-16">
      <Slider sliderList={sliderList} />
    </div>
  );
}
