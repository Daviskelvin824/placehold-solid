import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = "No items found",
  description = "Looks like there’s nothing here yet.",
  actionLabel = "Add Item",
  onActionClick,
  icon,
}: EmptyStateProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-in", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full items-center justify-center text-center py-16 px-4 text-gray-600 dark:text-gray-300 fade-in"
    >
      {icon ? (
        <div className="mb-4 text-5xl text-gray-400 dark:text-gray-500 fade-in">{icon}</div>
      ) : (
        <div className="mb-4 fade-in">
          <svg
            className="w-16 h-16 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75h4.5M9.75 14.25h2.25m9-2.25a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2 fade-in">{title}</h2>
      <p className="text-sm mb-4 fade-in">{description}</p>

      {onActionClick && (
        <button
          onClick={onActionClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors fade-in"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
