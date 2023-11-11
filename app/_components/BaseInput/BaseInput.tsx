import { Input } from "@/types";
import styles from "./input.module.scss";
import { useState } from "react";
export default function BaseInput({
  name,
  type,
  isBackground,
  complete,
  required,
  fullWidth,
  border,
  error,
  value,
  onChange,
}: Input) {
  const { label, input, background } = styles;

  const [isFocused, setIsFocused] = useState<boolean>(value ? true : false);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    if (value === "") {
      setIsFocused(false);
    }
  };
  const labelStyle = isFocused ? styles["label-active"] : label;
  const bg = isBackground ? `${input} ${background} ` : input;
  return (
    <div
      className={styles["base-input"]}
      style={fullWidth ? { width: "100%" } : { width: "unset" }}
    >
      <input
        className={bg}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        type={type}
        required={required}
        autoComplete={complete}
        minLength={5}
        maxLength={50}
      />
      <label className={labelStyle}>{name}</label>
      <p className={`${styles.error} ${styles.para}`}>
        <span>{error}</span>
      </p>
    </div>
  );
}
