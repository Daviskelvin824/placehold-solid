import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "~/components/ui/button";

export default function NotFoundPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(".fade-in", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Infinite float + boom (scale) animation
      gsap.to(headingRef.current, {
        y: -10,
        scale: 1.1,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen flex items-center justify-center transition-colors duration-500"
    >
      <div className="text-center space-y-6">
        <h1 ref={headingRef} className="text-8xl font-bold text-gray-800 dark:text-white fade-in">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 fade-in">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a href="/">
          <Button>Go Home</Button>
        </a>
      </div>
    </div>
  );
}
