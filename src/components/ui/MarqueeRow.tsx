import React, { useRef } from "react";

interface MarqueeRowProps {
  children: React.ReactNode[];
  direction?: "left" | "right";
  speed?: number;
  gap?: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  children,
  direction = "left",
  speed = 40,
  gap = 0,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const handleMouseLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  const animName = direction === "left" ? "mq-left" : "mq-right";
  const reps = 10;

  const buildHalf = (prefix: string) => (
    <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
      {Array.from({ length: reps }, (_, rep) =>
        children.map((child, i) => (
          <div key={`${prefix}-${rep}-${i}`} className="shrink-0">{child}</div>
        ))
      ).flat()}
    </div>
  );

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={trackRef}
        className="flex"
        style={{
          gap: `${gap}px`,
          width: "max-content",
          animation: `${animName} ${speed}s linear infinite`,
        }}
      >
        {buildHalf("a")}
        {buildHalf("b")}
      </div>

      <style>{`
        @keyframes mq-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes mq-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default MarqueeRow;
