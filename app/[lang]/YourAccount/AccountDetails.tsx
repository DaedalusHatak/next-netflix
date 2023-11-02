import BaseModal from "@/app/_components/BaseModal/BaseModal";
import MembershipDetails from "./MembershipDetails";
import PhoneDelete from "./PhoneDelete";
import styles from "./page.module.scss";
import SelectPicture from "@/app/_components/SelectPicture/SelectPicture";
import fs from "fs";
import path from "path";

export default function AccountDetails({ user }: { user: any }) {
  const imageDir = path.join(process.cwd(), "public/assets/profile");

  const AllImages = fs.readdirSync(imageDir);
  const avatars = AllImages.filter(
    (avatar) => path.extname(avatar).toLowerCase() === ".webp"
  );

  return (
    <>
      <h2 className={styles["header-2"]}>Account</h2>
      <MembershipDetails user={user} />
      <PhoneDelete />
      <h2 className={styles["header-2"]}>Change profile picture</h2>
      <SelectPicture
        avatars={avatars}
        profile={user.photoURL}
      />
    </>
  );
}
