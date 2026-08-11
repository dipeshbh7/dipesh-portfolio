import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./ease";

const ROLES = ["AI Engineer", "Software Developer", "UI/UX Designer", "Problem Solver"];

function Rotator() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="rotator">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[i]}
          className="grad"
          initial={{ y: 26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -26, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export { Rotator, ROLES };
export default Rotator;
