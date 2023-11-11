import { Question } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

export default function Answer({
  question,
  styles,
  note,
}: {
  question: Question;
  styles: any;
  note: string;
}) {
  return (
    <AnimatePresence>
      {question.isActive && (
        <motion.div
          initial={{
            maxHeight: "0%",
            scaleY: 0,
            transformOrigin: "top",
          }}
          animate={{
            maxHeight: "100%",
            scaleY: 1,
            transformOrigin: "top",
          }}
          exit={{
            maxHeight: "0%",
            scaleY: 0,
            transformOrigin: "top",
          }}
          transition={{ duration: 0.25, damping: 10, stiffness: 100 }}
          className={styles.answer}
        >
          {question.answer}
          <br />
          <br />
          <b className={styles.b}>{note}</b>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
