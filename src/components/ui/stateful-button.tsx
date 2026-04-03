import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

export const Button = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => Promise<unknown>;
  className?: string;
}) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleClick = async () => {
    setStatus("loading");
    try {
      await onClick();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("idle");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={status !== "idle"}
      className={cn(
        "relative h-11 px-10 rounded-lg bg-blue-600 text-white font-bold text-xs uppercase tracking-widest overflow-hidden transition-all duration-300 cursor-pointer disabled:cursor-not-allowed min-w-40",
        status === "success" && "bg-emerald-500",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center"
          >
            {children}
          </motion.span>
        )}

        {status === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-2"
          >
            {/* O SPINNER DE CARREGAMENTO */}
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            SENDING...
          </motion.span>
        )}

        {status === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex items-center justify-center gap-2"
          >
            {/* O CHECKMARK DE SUCESSO */}
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            SENT!
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};