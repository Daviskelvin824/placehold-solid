import { cn } from "~/lib/utils";
import { Button } from "./button";

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

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  id,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  id?: string;
}) => (
  <div
    className={cn(
      // full‑height flex column → lets the content grow and the button stay put
      "group/bento row-span-1 flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-4 shadow-input transition duration-200 hover:shadow-lg dark:border-white/[0.2] dark:bg-black dark:shadow-none",
      className
    )}
    onClick={() => window.open("/" + id, "_blank")}
  >
    {/* ── top section (header / image) ─────────────────────────────── */}
    {header}

    {/* ── middle section grows to fill space ──────────────────────── */}
    <div className="flex flex-col gap-2 transition duration-200 group-hover/bento:translate-x-2 flex-1">
      {icon}
      <h3 className="mt-1 font-sans text-lg font-bold text-neutral-700 dark:text-neutral-200">
        {title}
      </h3>
      <p className="font-sans text-sm text-neutral-600 dark:text-neutral-300">{description}</p>
    </div>

    {/* ── bottom‑anchored button ───────────────────────────────────── */}
    <Button
      className="mt-4 self-end cursor-pointer"
      onClick={() => window.open("/" + id, "_blank")}
    >
      Enroll Course
    </Button>
  </div>
);
