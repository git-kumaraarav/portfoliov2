import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import {cn} from "cn";

export default function GlowCursor({ className }: { className?: string }) {
  // 1. Create high-performance motion values to track coordinates
  const mouseX = useMotionValue(-500); // Start off-screen
  const mouseY = useMotionValue(-500);

  // 2. Wrap them in a spring for a smooth, trailing effect (optional)
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height (150px) to center the glow on the pointer
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      // Tailwind classes for a fixed, unclickable, blurred circle
      className={cn(`pointer-events-none fixed top-0 left-0 z-0 h-[300px] w-[300px] rounded-full bg-accent/30 blur-[100px]`, className)}
      style={{
        x: cursorX,
        y: cursorY,
      }}
    />
  );
}