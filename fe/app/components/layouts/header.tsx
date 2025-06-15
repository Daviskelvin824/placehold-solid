import type { JSX } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { cn } from "~/lib/utils";
import { LogoStaticAnimated } from "../logo-static";

export function Header({ className }: JSX.IntrinsicElements["div"]) {
  return (
    <div
      className={cn(
        "absolute lg:fixed left-0 w-full py-6 px-4 sm:px-6 md:px-10 z-20 backdrop-blur-md flex justify-center",
        className
      )}
    >
      <div className="container flex flex-nowrap items-center justify-between w-full gap-4 overflow-x-auto">
        <LogoStaticAnimated />
        <div className="flex-shrink-0">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
