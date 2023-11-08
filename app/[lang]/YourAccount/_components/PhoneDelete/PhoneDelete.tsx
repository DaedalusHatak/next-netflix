import styles from "@/app/[lang]/YourAccount/page.module.scss"
export default async function PhoneDelete() {
    return (
  
    <>
    <div className={styles["delete"]}>
    <button
    //   @click="deletePhone()"
      id="recaptcha-container"
      className={styles["change-button"]}
    >
      <span>Delete phone number</span>
    </button>
  </div>
    </>
    );
  }
  