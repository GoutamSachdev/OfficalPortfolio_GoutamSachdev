import React from "react";
import { motion } from "framer-motion";

// Modern animated social icon button: a circle that inverts its colors,
// lifts, scales, and glows on hover. Replaces every plain/static GitHub &
// LinkedIn link so the social icons read as deliberate, not boring.
// The visible circle stays the size the design calls for; an invisible
// pseudo-element expands the *hit* area to at least 44px, which is the
// smallest target a thumb can reliably land on.
const SIZES = {
  sm: { box: "w-8 h-8", icon: "w-4 h-4" },
  md: { box: "w-10 h-10", icon: "w-5 h-5" },
};

const SocialButton = ({ href, label, children, size = "md", className = "" }) => {
  const s = SIZES[size] || SIZES.md;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -2, scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className={`relative inline-flex items-center justify-center rounded-full border border-solid border-line text-dark shadow-soft transition-colors duration-300 hover:bg-dark hover:text-light hover:border-dark hover:shadow-glow dark:text-light dark:border-lineDark dark:hover:bg-light dark:hover:text-dark dark:hover:border-light after:absolute after:-inset-1.5 after:rounded-full after:content-[''] ${s.box} ${className}`}
    >
      <span className={`block ${s.icon}`}>{children}</span>
    </motion.a>
  );
};

export default SocialButton;