import { cn } from "~/lib/utils";
import { Button } from "./button";
import { useNavigate, type NavigateFunction } from "react-router";

/* ──────────────────────────────── GRID ─────────────────────────────── */

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => (
  <div
    className={cn(
      /* equal‑height rows (18 rem) on ≥ md screens */
      "mx-auto grid grid-cols-1 gap-6 md:auto-rows-[18rem] md:grid-cols-3",
      className
    )}
  >
    {children}
  </div>
);

/* ────────────────────────────── GRID ITEM ──────────────────────────── */

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  id,
  to,
  textBtn,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  id?: string;
  to?: string;
  textBtn?: string;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        // full‑height flex column → lets the content grow and the button stay put
        "group/bento flex flex-col h-full rounded-xl border border-neutral-200 p-4 shadow-input transition duration-200 hover:shadow-lg dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className
      )}
      onClick={() => navigate(to ?? "/" + id)}
    >
      {/* ── top section (header / image) ─────────────────────────────── */}
      {header}

      {/* ── middle section grows to fill space ──────────────────────── */}
      <div className="flex flex-col gap-2 transition duration-200 group-hover/bento:translate-x-2 flex-1">
        {icon}
        <h3 className="mt-1 font-sans text-lg font-bold text-neutral-700 dark:text-neutral-200">
          {title}
        </h3>
        <div className="font-sans text-sm text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>

      {/* ── bottom‑anchored button ───────────────────────────────────── */}
      <Button className="mt-4 self-end cursor-pointer" onClick={() => navigate(to ?? "/" + id)}>
        {textBtn ?? "Enroll Course"}
      </Button>
    </div>
  );
}
