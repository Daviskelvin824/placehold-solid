import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { monadTestnet } from "viem/chains";
import "./assets/styles/index.css";
import "@rainbow-me/rainbowkit/styles.css";

/* ---------------------------------- pages --------------------------------- */
import { Landing } from "./pages/landing";
import { DefaultLayout } from "./components/layouts/DefaultLayout";
import AnotherPage from "./pages/another-pages";
import { Courses } from "./pages/courses";

/* -------------------------------------------------------------------------- */
/*                                   Config                                   */
/* -------------------------------------------------------------------------- */
const config = getDefaultConfig({
  appName: "Plachold",
  projectId: "702bd4efaeffd9a2a114b75acc3cc307",
  chains: [monadTestnet],
  ssr: false,
});

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            {/* <Header /> */}
            <DefaultLayout>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/hawo" element={<AnotherPage />} />
                <Route path="/courses" element={<Courses />} />
                {/* <Route path="/candidates" element={<Candidates />} /> */}
              </Routes>
            </DefaultLayout>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
