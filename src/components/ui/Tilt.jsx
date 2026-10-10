import React, { useMemo, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

function Tilt({ children, className, max = 4 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const finePointer = useMemo(() => typeof window !== "undefined" && window.matchMedia("(pointer:fine) and (hover:hover)").matches, []);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });

  const move = (e) => {
    if (reduce || !finePointer || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max);
  };

  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  if (!finePointer || reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

export { Tilt };
export default Tilt;
