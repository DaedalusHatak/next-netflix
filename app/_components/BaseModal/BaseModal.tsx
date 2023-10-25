import { useState } from "react";
import styles from "./modal.module.scss";
type Title = "Error" | "Success" | "Verification";
export default function BaseModal({
  message,
  title,
  hideModal,
}: {
  message: string;
  title: Title;
  hideModal?: any;
}) {
  const [verCode, setVerCode] = useState("");

  return (
    <>
      <div className={styles["modal-backdrop"]}>
        <div className={styles["modal"]}>
          <header className={styles["modal-header"]}>{title}</header>
          {title === "Error" && (
            <div className={styles["modal-body"]}>
              Sorry. Something went wrong
              <span className={styles["error"]}>Error: {message}</span>
            </div>
          )}
          {title === "Success" && (
            <div className={styles["modal-body"]}>{message}</div>
          )}
          {title === "Verification" && (
            <div className={styles["modal-body"]}>
              Enter verification code:{" "}
              <input
                className={styles["verification"]}
                value={verCode}
                onChange={(e) => setVerCode(e.target.value)}
              />
            </div>
          )}
          <footer className={styles["modal-footer"]}>
            <button
              type="button"
              className={styles["btn-input"]}
              onClick={() => hideModal(verCode)}
            >
              Confirm
            </button>
            {title === "Verification" && (
              <button
                type="button"
                className={styles["btn-input"]}
                onClick={() => hideModal()}
              >
                Cancel
              </button>
            )}
          </footer>
        </div>
      </div>
    </>
  );
}
