import { Section } from "@/types";
import { JSXElementConstructor } from "react";

export default function BaseCard({ header, desc, comp }: Section) {
  return (
    <div className="tv content-section">
      <div className="screen text">
        <h2>{header}</h2>
        <p>{desc}</p>
      </div>
      <div className="screen">{comp}</div>
    </div>
  );
}
