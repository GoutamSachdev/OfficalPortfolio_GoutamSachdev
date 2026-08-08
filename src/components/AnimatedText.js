import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const quote = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const indWord = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

// Static (no-motion) variants for users who prefer reduced motion.
const noMotion = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};

const AnimatedText = ({ text, className = "", as = "h1" }) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.h1;
  const parent = reduce ? noMotion : quote;
  const child = reduce ? noMotion : indWord;

  return (
    <div
      className="w-full mx-auto py-2 flex items-center justify-center text-center
      overflow-hidden sm:py-0"
    >
      <MotionTag
        className={`inline-block w-full text-dark font-bold capitalize text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${className} dark:text-light`}
        variants={parent}
        initial="initial"
        animate="animate"
      >
        {text.split(" ").map((word, index) => (
          <motion.span
            key={word + "-" + index}
            className="inline-block"
            variants={child}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </MotionTag>
    </div>
  );
};

export default AnimatedText;