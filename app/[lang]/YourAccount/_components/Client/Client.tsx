"use client"

import BaseModal from "@/app/_components/BaseModal/BaseModal";
import InputModal from "../InputModal/InputModal";
import { useState } from "react";

export default function AccountDetails() {
    const [isModal, setIsModal] = useState(false)
    const [isNumberModal, setIsNumberModal] = useState(false)
function newNumber(e:any){
    setIsNumberModal(false)
    console.log(e)
}

    return (
  <>
   {isNumberModal &&   <InputModal hideModal={(e:any)=>newNumber(e)}  />}
{isModal &&   <BaseModal
     message="Any"
     title="Verification"  
     ></BaseModal>}
  
  </>
  
    );
  }
  