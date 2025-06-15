import type { JSX } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { cn } from "~/lib/utils";
import { LogoStaticAnimated } from "../logo-static";
import { Link } from "react-router";

export function Header({ className }: JSX.IntrinsicElements["div"]) {
  return (
    <div
      className={cn(
        "absolute lg:fixed left-0 w-full py-6 px-4 sm:px-6 md:px-10 z-20 backdrop-blur-md flex justify-center",
        className
      )}
    >
      <div className="container flex flex-nowrap items-center justify-between w-full gap-4 overflow-x-auto max-h-[7vh]">
        <a href="/" className="h-full w-full">
          <LogoStaticAnimated className="h-full" />
        </a>
        <div className="flex-shrink-0">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
