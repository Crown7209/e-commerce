"use-client";

import { Card } from "@/components/ui/Card";
import { Carousel } from "@/components/ui/Carousel";

export default function Home() {
  return (
    <div className="w-full flex items-center flex-col">
      <div className="max-w-[1280px] py-8 flex justify-end gap-6 ">
        <button className="btn">Shop</button>
        <button className="btn">Create</button>
      </div>
      <div className="max-w-[1280px] flex flex-wrap justify-between gap-8">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
