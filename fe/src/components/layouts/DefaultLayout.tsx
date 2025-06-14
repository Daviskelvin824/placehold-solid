import { Header } from "./Header";
import type { JSX } from "react";

export function DefaultLayout({ children }: JSX.IntrinsicElements["div"]) {
  return (
    <>
      <Header />
      <main className="container h-screen py-[10vh] px-4 sm:px-6 md:px-10 flex flex-col gap-10">
        {children}
      </main>
    </>
  );
}
