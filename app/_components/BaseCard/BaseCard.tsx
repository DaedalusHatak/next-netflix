import { Section } from "@/types";
import { JSXElementConstructor } from "react";
import styles from "./card.module.scss";
export default function BaseCard({ header, desc, comp }: Section) {
  return (
    <div className={styles["tv"]}>
      <div className={styles.screen + " " + styles.text}>
        <h2>{header}</h2>
        <p>{desc}</p>
      </div>
      <div className="screen">{comp}</div>
    </div>
  );
}
