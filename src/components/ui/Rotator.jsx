import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "./ease";

const ROLES = ["CSIT Student", "Software Developer", "UI/UX Designer", "Robotics Tinkerer"];

function Rotator() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % ROLES.length), 3200);
    return () => clearInterval(id);
  }, [reduce]);

  if (reduce) return <span className="rotator"><span className="grad">{ROLES[0]}</span></span>;

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
