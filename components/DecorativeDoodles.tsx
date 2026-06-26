import { Heart, Rocket, Sparkle, Star } from "lucide-react";

type DecorativeDoodlesProps = {
  variant?: "hero" | "cards" | "footer";
};

export function DecorativeDoodles({ variant = "hero" }: DecorativeDoodlesProps) {
  if (variant === "footer") {
    return (
      <Heart
        aria-hidden="true"
        className="absolute left-8 top-10 h-9 w-9 rotate-[-18deg] text-white"
        strokeWidth={2.3}
      />
    );
  }

  if (variant === "cards") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Rocket className="absolute right-[-10px] top-6 h-28 w-28 rotate-[-22deg] text-aip-yellow opacity-30" strokeWidth={1.5} />
        <Star className="absolute right-16 top-4 h-5 w-5 text-aip-yellow opacity-50" fill="currentColor" />
        <Sparkle className="absolute right-6 top-32 h-6 w-6 text-aip-green opacity-40" />
        <Sparkle className="absolute left-[40%] bottom-6 h-4 w-4 text-aip-greenDark opacity-30" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute left-2 top-28 h-20 w-28 text-aip-green"
        viewBox="0 0 130 80"
        fill="none"
      >
        <path d="M8 58C38 36 56 20 82 20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M18 72C50 47 72 35 108 38" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M50 58C72 42 90 34 121 33" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <svg
        className="doodle-dash absolute left-[-22px] top-56 h-32 w-32 text-aip-yellow"
        viewBox="0 0 120 120"
        fill="none"
      >
        <path
          d="M3 10C40 10 38 47 24 61C2 83 35 117 79 103"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="absolute left-[29%] top-20 h-16 w-24 rotate-[-18deg] text-aip-greenDark"
        viewBox="0 0 120 80"
        fill="none"
      >
        <path d="M5 54C33 22 62 13 105 7" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <path d="M18 67C42 40 61 33 88 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="71" cy="50" r="5" fill="currentColor" />
      </svg>

      <svg
        className="doodle-dash absolute right-[49%] top-64 hidden h-24 w-32 text-aip-green md:block"
        viewBox="0 0 150 105"
        fill="none"
      >
        <path
          d="M8 81C42 44 86 111 70 80C48 38 125 66 132 14"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path d="M105 43L118 30M118 43L105 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <Rocket className="absolute left-[49%] top-24 h-12 w-12 rotate-45 text-aip-yellow" strokeWidth={2.4} />
      <Star className="absolute left-[58%] top-16 h-5 w-5 text-aip-yellow" fill="currentColor" />
      <Sparkle className="absolute right-[15%] top-28 h-6 w-6 text-aip-greenDark" />
      <Sparkle className="absolute right-[3%] top-44 h-5 w-5 text-aip-green" />
    </div>
  );
}
