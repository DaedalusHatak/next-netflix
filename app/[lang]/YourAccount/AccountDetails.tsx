import BaseModal from "@/app/_components/BaseModal/BaseModal";
import MembershipDetails from "./MembershipDetails";
import PhoneDelete from "./PhoneDelete";
import { DecodedIdToken, UserRecord } from "firebase-admin/auth";
import styles from "./page.module.scss"
export default function AccountDetails({user}:{user:UserRecord}) {
  return (
<>
<h2 className={styles["header-2"]}>Account</h2>
  <MembershipDetails user={user.toJSON()}/>
  <PhoneDelete />
  <h2 className={styles["header-2"]}>Change profile picture</h2>

</>

  );
}
