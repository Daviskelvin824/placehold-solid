import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { monadTestnet } from "viem/chains";

export const WAGMI_CONFIG = getDefaultConfig({
  appName: "Plachold",
  projectId: "702bd4efaeffd9a2a114b75acc3cc307",
  chains: [monadTestnet],
  ssr: true,
});
