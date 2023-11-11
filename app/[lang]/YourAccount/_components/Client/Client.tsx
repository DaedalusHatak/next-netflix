"use client";

import BaseModal from "@/app/_components/BaseModal/BaseModal";
import InputModal from "../InputModal/InputModal";
import { useState } from "react";

export default function AccountDetails() {
  const [isModal, setIsModal] = useState(false);
  const [isNumberModal, setIsNumberModal] = useState(false);
  function newNumber(e: string) {
    setIsNumberModal(false);
  }

  return (
    <>
      {isNumberModal && <InputModal hideModal={(e: string) => newNumber(e)} />}
      {isModal && (
        <BaseModal
          message="Any"
          title="Verification"
        ></BaseModal>
      )}
    </>
  );
}
