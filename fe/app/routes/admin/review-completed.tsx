import { Star, Users } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useReadContract } from "wagmi";
import { BentoGrid, BentoGridItem } from "~/components/ui/bento-grid";
import { Skeleton } from "~/components/ui/skeleton";
import { ABI } from "~/constant/ABI";
import { CONTRACT_ADDRESS } from "~/constant/CA";

type Course = {
  title: string;
  description: string;
  uri: string;
  stakeAmount: number;
  id: number;
};

export default function ReviewCompleted() {
  const { data: dataAllCourse, isLoading: isLoadingGetAllCourse } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getAllCourses",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(dataAllCourse);
  }, [dataAllCourse]);

  return (
    <div className="container flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold">Review Completed</p>
        <p>Mark student course as completed</p>
      </div>
      <BentoGrid className="mx-auto">
        {isLoadingGetAllCourse &&
          new Array(3).fill("").map((val, idx) => (
            <div key={idx} className="flex flex-col space-y-5">
              <Skeleton className="h-[300px] w-full rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}

        {!isLoadingGetAllCourse &&
          (dataAllCourse as Array<Course>).map((item, idx) => (
            <BentoGridItem
              key={item.id}
              id={String(item.id)}
              title={item.title}
              description={<div>{item.description}</div>}
              header={
                <div className="relative group overflow-hidden rounded-lg">
                  <img
                    src={item.uri || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              }
              className={`cursor-pointer group hover:scale-[1.02] transition-all duration-300 bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30`}
              to={`/review-completed/${item.id}`}
              textBtn="See Students"
            />
          ))}
      </BentoGrid>
    </div>
  );
}
