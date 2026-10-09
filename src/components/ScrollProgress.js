import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * Reading-progress bar pinned to the top of the viewport.
 *
 * Sits above the navbar (z-60) and is pointer-events-none so it never steals a
 * click. The spring is dropped under `prefers-reduced-motion`: the bar still
 * tracks scroll position, it just stops trailing behind it.
 */
const ScrollProgress = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left
      bg-gradient-to-r from-primary via-primaryDark to-primary
      shadow-[0_0_10px_1px_rgba(182,62,150,0.45)]"
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothed }}
    />
  );
};

export default ScrollProgress;
