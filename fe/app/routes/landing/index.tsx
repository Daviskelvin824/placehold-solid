import { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "~/components/ui/bento-grid";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

type Course = {
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  image: string;
};

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("/data/courses.json")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Failed to load courses:", err));
  }, []);

  return (
    <BentoGrid className="w-full mx-auto">
      {courses.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-32 aspect-video object-cover rounded-md"
            />
          }
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2 cursor-pointer" : " cursor-pointer"}
        />
      ))}
    </BentoGrid>
  );
}
