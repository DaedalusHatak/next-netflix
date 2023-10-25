"use client";

import BaseModal from "@/app/_components/BaseModal/BaseModal";
import SecondStep from "@/app/_components/SecondStep/SecondStep";
import { useState } from "react";
import styles from "@/app/[lang]/confirm/page.module.scss";
import { useRouter } from "next/navigation";
export default function Steps({ showSecondStep }: any) {
  const router = useRouter();
  const [isModal, setIsModal] = useState<any>(false);
  const [isSecondStep, setIsSecondStep] = useState(showSecondStep);
  return (
    <>
      {isModal !== false && (
        <BaseModal
          message={isModal === true ? "You may now log in." : isModal}
          title={isModal === true ? "Success" : "Error"}
          hideModal={() =>
            isModal === true ? router.push("/login") : setIsModal(false)
          }
        ></BaseModal>
      )}
      <div className={styles.centered}>
        {isSecondStep && (
          <SecondStep
            styles={styles}
            data={showSecondStep}
            showModal={setIsModal}
          />
        )}
        <div className={styles["register-info"]}>
          {!isSecondStep && (
            <div>
              <h2 className={styles.h2}>Finish setting up your account</h2>
              <p className={styles.p}>Daedalus is personalized for you.</p>
              <p className={styles.p}>
                Create a password to start watching Daedalus.
              </p>
              <button
                className={styles.button}
                onClick={() => setIsSecondStep(true)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
