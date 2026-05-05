import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  withText?: boolean;
  variant?: "default" | "white";
}

// Logo concept: 5 dots forming a circle (warga coming together around a common center)
// Minimalist, works at any size, strong community metaphor
export function Logo({
  className,
  size = "md",
  withText = true,
  variant = "default",
}: LogoProps) {
  const sizes = {
    sm: { mark: "h-6 w-6", text: "text-base" },
    md: { mark: "h-8 w-8", text: "text-xl" },
    lg: { mark: "h-10 w-10", text: "text-2xl" },
    xl: { mark: "h-14 w-14", text: "text-3xl" },
  };

  const textColor = variant === "white" ? "text-white" : "text-earth-900";
  const dotColor = variant === "white" ? "#ffffff" : "#16a34a";
  const centerColor = variant === "white" ? "rgba(255,255,255,0.4)" : "#f59e0b";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className={cn("relative", sizes[size].mark)}>
        <svg viewBox="0 0 40 40" fill="none" className="h-full w-full">
          {/* 5 warga dots arranged in a pentagon */}
          {[0, 1, 2, 3, 4].map((i) => {
            const angle = (i * 72 - 90) * (Math.PI / 180);
            const cx = 20 + 13 * Math.cos(angle);
            const cy = 20 + 13 * Math.sin(angle);
            return <circle key={i} cx={cx} cy={cy} r="4" fill={dotColor} />;
          })}
          {/* center dot — the "guyub" meeting point */}
          <circle cx="20" cy="20" r="3" fill={centerColor} />
        </svg>
      </div>
      {withText && (
        <span
          className={cn(
            "font-semibold tracking-tight lowercase",
            textColor,
            sizes[size].text
          )}
        >
          guyub
        </span>
      )}
    </div>
  );
}
