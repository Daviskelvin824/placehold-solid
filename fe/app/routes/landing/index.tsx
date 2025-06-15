import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import EmptyState from "~/components/empty-state";
import { BentoGrid, BentoGridItem } from "~/components/ui/bento-grid";
import { Skeleton } from "~/components/ui/skeleton";
import { ABI } from "~/constant/ABI";
import { CONTRACT_ADDRESS } from "~/constant/CA";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

type Course = {
  title: string;
  description: string;
  uri: string;
  stakeAmount: number;
  id: number;
};

export default function Home() {
  const { data: dataAllCourse, isLoading: isLoadingGetAllCourse } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getAllCourses",
  });

  return (
    <>
      <BentoGrid className="w-full mx-auto">
        {isLoadingGetAllCourse &&
          new Array(3).fill("").map(() => (
            <div className="flex flex-col space-y-5">
              <Skeleton className="h-[300px] w-full rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}

        {!isLoadingGetAllCourse &&
          (dataAllCourse as Course[]).map((item, idx) => (
            <BentoGridItem
              key={item.id}
              title={item.title}
              description={item.description}
              header={
                <img
                  src={item.uri}
                  alt={item.title}
                  className="w-full h-32 aspect-video object-cover rounded-md"
                />
              }
              className={
                idx === 3 || idx === 6 ? "md:col-span-2 cursor-pointer" : " cursor-pointer"
              }
              id={String(item.id)}
            />
          ))}
      </BentoGrid>

      {!isLoadingGetAllCourse && (dataAllCourse as Array<{}>).length == 0 && <EmptyState />}
    </>
  );
}
