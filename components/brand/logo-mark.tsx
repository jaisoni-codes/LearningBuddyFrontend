// Learning Buddy mark: three rising semester blocks (a plan that climbs). Faceted like an isometric block.
const BARS = [
  { x: 0, h: 70 },
  { x: 52, h: 110 },
  { x: 104, h: 150 },
];

export function LogoMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 10 160 172"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {BARS.map(({ x, h }) => {
        const top = 180 - h;
        return (
          <g key={x}>
            <polygon points={`${x},${top} ${x + 16},${top - 10} ${x + 56},${top - 10} ${x + 40},${top}`} fill="#f28b82" />
            <polygon points={`${x + 40},${top} ${x + 56},${top - 10} ${x + 56},170 ${x + 40},180`} fill="#a52222" />
            <rect x={x} y={top} width={40} height={h} fill="#d32f2f" />
          </g>
        );
      })}
    </svg>
  );
}

export function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-8 w-auto" />
      <span
        className={`text-lg font-extrabold leading-tight tracking-tight ${tone === "dark" ? "text-night-text" : "text-ink"}`}
      >
        Learning Buddy
      </span>
    </span>
  );
}
