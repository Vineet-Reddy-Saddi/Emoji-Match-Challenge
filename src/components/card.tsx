
"use client";

import { cn } from "@/lib/utils";

type CardProps = {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  isDisabled: boolean;
};

export function Card({ emoji, isFlipped, isMatched, onClick, isDisabled }: CardProps) {
  return (
    <div
      className="perspective-1000 w-full h-full"
      onClick={isDisabled || isFlipped ? undefined : onClick}
      role="button"
      aria-label={`Card ${isFlipped ? 'showing ' + emoji : ''}`}
    >
      <div
        className={cn(
          "relative w-full h-full aspect-square transition-transform duration-500 [transform-style:preserve-3d]",
          { "cursor-pointer": !isDisabled && !isFlipped },
          { "[transform:rotateY(180deg)]": isFlipped },
          { "opacity-50": isMatched}
        )}
      >
        {/* Front of the card (emoji) */}
        <div className={cn(
            "absolute inset-0 w-full h-full flex items-center justify-center bg-white dark:bg-slate-800 rounded-lg shadow-md [transform:rotateY(180deg)] [backface-visibility:hidden]",
            { "bg-blue-200": isMatched }
          )}>
          <span className="text-4xl sm:text-5xl drop-shadow-md">{emoji}</span>
        </div>
        {/* Back of the card */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-primary rounded-lg shadow-md [backface-visibility:hidden]">
        </div>
      </div>
    </div>
  );
}
