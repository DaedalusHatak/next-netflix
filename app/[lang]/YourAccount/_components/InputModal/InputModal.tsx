"use client"
import { useState } from "react";
import styles from "@/app/[lang]/YourAccount/page.module.scss"
export default function InputModal({
    hideModal,
  }: {


    hideModal?: any;
  }) {
    const [newNumber,setNewNumber] = useState("")
    return (
  
  <>
  
  <div
        className={styles["modal-backdrop"]}
      >
        <div className={styles["modal"]}>
          <form
            // @submit.prevent="verifyNewNumber(phone.newNumber)"
            action=""
            className={styles["form"]}
          >
            <header className={styles["modal-header"]}>Change Phone Number</header>
    
            <div className={styles["modal-body"]}>
              Enter new phone number
    
              <input
                type="text"
                className={styles["verification"]}
                value={newNumber}
                onChange={(e) => setNewNumber(e.target.value)}
              />
            </div>
    
            <footer className={styles["modal-footer"]}>
              <button
                onClick={() => hideModal(newNumber)}
                type="button"
                className={styles["btn-input"]}
              >
                Confirm
              </button>
              <button
                onClick={() => hideModal()}
                type="button"
                className={styles["btn-input"]}
              >
                Cancel
              </button>
            </footer>
          </form>
        </div>
      </div>
  </>
    );
  }
  