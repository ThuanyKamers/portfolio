import React, { useRef, useEffect, useState } from "react";

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
  const setRef = useRef<HTMLDivElement>(null);
  const [reps, setReps] = useState(6);

  useEffect(() => {
    const measure = () => {
      if (!setRef.current) return;
      const singleWidth = setRef.current.scrollWidth;
      const screenWidth = window.innerWidth;
      // Each set must be at least 2x the screen width to avoid gaps
      const needed = Math.max(2, Math.ceil((screenWidth * 2) / singleWidth));
      setReps(needed);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [children.length]);

  const handleMouseEnter = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const handleMouseLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  const animName = direction === "left" ? "mq-left" : "mq-right";

  const renderItems = (prefix: string, count: number) =>
    Array.from({ length: count }, (_, r) =>
      children.map((child, i) => (
        <div key={`${prefix}-${r}-${i}`} className="shrink-0" style={{ marginRight: `${gap}px` }}>{child}</div>
      ))
    ).flat();

  return (
    <div
      className="w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hidden measurer for a single set of children */}
      <div ref={setRef} className="flex" style={{ position: "absolute", visibility: "hidden", pointerEvents: "none" }}>
        {children.map((child, i) => (
          <div key={`m-${i}`} className="shrink-0" style={{ marginRight: `${gap}px` }}>{child}</div>
        ))}
      </div>

      <div
        ref={trackRef}
        className="flex"
        style={{
          width: "max-content",
          animation: `${animName} ${speed}s linear infinite`,
        }}
      >
        {renderItems("a", reps)}
        {renderItems("b", reps)}
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
