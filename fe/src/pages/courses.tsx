import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useEffect, useState } from "react";

type Course = {
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  image: string;
};

export function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    fetch("/data/courses.json")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Failed to load courses:", err));
  }, []);
  console.log("Courses:", courses);
  return (
    <div className="py-10">
      <h1 className="text-5xl text-center py-5">List Of Courses</h1>
      <BentoGrid className="max-w-4xl mx-auto">
        {courses.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-32 object-fit rounded-md"
              />
            }
            icon={item.icon}
            className={
              i === 3 || i === 6
                ? "md:col-span-2 cursor-pointer"
                : " cursor-pointer"
            }
          />
        ))}
      </BentoGrid>
    </div>
  );
}
