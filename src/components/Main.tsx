"use client";
import dynamic from "next/dynamic";

// Dynamically import the Stake and DexHunterSwap components
const Stake = dynamic(() => import("./Delegate"), { ssr: false });
const DexHunterSwap = dynamic(() => import("./DexHunterSwap"), { ssr: false });

export default function Main() {
  return (
    <div className="absolute top-18 right-20">
      <div className="flex flex-col gap-4">
        <Stake />
        <DexHunterSwap />
      </div>
    </div>
  );
}
