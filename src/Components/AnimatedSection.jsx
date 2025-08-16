import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false, 
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeIn" },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="py-6"
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
