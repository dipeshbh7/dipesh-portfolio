import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Icon from "./Icon";
import { EASE } from "./ease";

function Stat({ icon, value, suffix, label, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <motion.div
      className="stat"
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <span className="ic"><Icon n={icon} size={20} /></span>
      <b>{n}{suffix}</b>
      <span>{label}</span>
    </motion.div>
  );
}

export { Stat };
export default Stat;
