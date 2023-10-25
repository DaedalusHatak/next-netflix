"use client"

import BaseModal from "@/app/_components/BaseModal/BaseModal";
import SecondStep from "@/app/_components/SecondStep/SecondStep";
import { useState } from "react"
import styles from "@/app/[lang]/confirm/page.module.scss"

export default function Steps({showSecondStep}:any){
    const [isModal, setIsModal] = useState(false);
    const [isSecondStep, setIsSecondStep] = useState(showSecondStep);
    return (
       <>
       {isModal}
        {isModal && <BaseModal title="Verification" message="You may now log in." hideModal={(e:any)=> setIsModal(false)}></BaseModal>}
        <div className={styles.centered}>
          {isSecondStep && <SecondStep
          styles={styles}
            data={showSecondStep}
            showModal={setIsModal}/>}
             <div
      className={styles["register-info"]}
    >
     
     {!isSecondStep && (
        <div>
             <h2 className={styles.h2}>Finish setting up your account</h2>
      <p className={styles.p}>Daedalus is personalized for you.</p>
      <p className={styles.p}>Create a password to start watching Daedalus.</p>
      <button className={styles.button} onClick={()=>setIsSecondStep(true)}>Next</button>
        </div>
     )}
    </div>
        </div>
          
       </>
    )
          }