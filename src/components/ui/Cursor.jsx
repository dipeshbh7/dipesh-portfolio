import React, { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

function Cursor() {
  const fine = useMemo(() => typeof window !== "undefined" && window.matchMedia("(pointer:fine)").matches && !window.matchMedia("(hover:none)").matches, []);
  const reduce = useReducedMotion();
  const [hov, setHov] = useState(false);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 260, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 260, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (!fine || reduce) return;
    const mm = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const ov = (e) => {
      setHov(!!(e.target.closest && e.target.closest("a,button,[data-hover]")));
    };
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseover", ov);
    return () => {
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseover", ov);
    };
  }, [fine, reduce, mx, my]);

  if (!fine || reduce) return null;

  return (
    <>
      <motion.div className={"cur-ring" + (hov ? " hov" : "")} style={{ x: sx, y: sy }} data-nocursor />
      <motion.div className="cur-dot" style={{ x: mx, y: my }} data-nocursor />
    </>
  );
}

export { Cursor };
export default Cursor;
