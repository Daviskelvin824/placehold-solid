import { Button } from "~/components/ui/button";
import type { Route } from "./+types/details";
import { redirect, useLoaderData } from "react-router";
import Courses from "../../../public/data/courses.json";

export async function loader({ params }: Route.LoaderArgs) {
  if (params && params.id) {
    const detail = Courses.find((v) => {
      return v.id == params.id;
    });

    return {
      detail,
    };
  } else {
    return redirect("/404");
  }
}

export default function Details() {
  const loaderData = useLoaderData();
  const { detail } = loaderData;

  return (
    <div className="flex flex-col gap-12 w-full">
      <div className="flex flex-col col-span-full gap-4">
        <p className="text-5xl">{detail.title}</p>
        <div className="flex flex-row gap-4 items-center">
          <div className="bg-white h-[1px] w-1/5"></div>
          <p className="text-xl">Lorem Ipsum</p>
        </div>
      </div>
      {/* <div className="flex flex-col gap-8"> */}
      <img
        src="https://placehold.co/120"
        alt=""
        className="aspect-[16/9] object-cover w-full rounded-lg"
      />
      {/* </div> */}
      <div className="flex flex-col gap-8 text-justify text-xl tracking-wide">
        {detail.description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
        minus consequuntur debitis aliquid pariatur rem iusto qui, itaque distinctio provident
        quisquam culpa, eaque dignissimos dolorem, quas fugiat saepe corrupti facilis!
      </div>

      <Button className="w-max" size="lg">
        Enroll
      </Button>
    </div>
  );
}
