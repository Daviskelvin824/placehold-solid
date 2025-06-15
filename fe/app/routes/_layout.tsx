// import { Header } from "./Header";
// import type { JSX } from "react";
import { Outlet } from "react-router";
import { Header } from "~/components/layouts/header";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main className="h-screen py-[10vh] px-4 sm:px-6 md:px-10 flex flex-col gap-10 items-center">
        <div className="container pb-32">
          <Outlet />
        </div>
      </main>
    </>
  );
}
