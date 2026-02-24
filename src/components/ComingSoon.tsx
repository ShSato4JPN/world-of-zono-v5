"use client";

import { motion } from "framer-motion";

type Props = {
  label: string;
};

export default function ComingSoon({ label }: Props) {
  return (
    <motion.div
      animate={{ rotate: [-8, 8, -8] }}
      transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
    >
      {label}
    </motion.div>
  );
}
