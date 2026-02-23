import { AnimatePresence, motion } from "framer-motion";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

import { Button } from "./ui/button";

type Props = {
  isOpen: boolean;
  setIsOpen: () => void;
};

export default function Hamburger({ isOpen, setIsOpen }: Props) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setIsOpen()}
      className="relative overflow-hidden z-50"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <RxCross1 />
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <RxHamburgerMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
