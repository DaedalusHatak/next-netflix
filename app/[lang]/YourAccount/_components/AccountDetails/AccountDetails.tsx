import MembershipDetails from "../MembershipDetails/MembershipDetails";
import PhoneDelete from "../PhoneDelete/PhoneDelete";
import styles from "@/app/[lang]/YourAccount/page.module.scss"
import SelectPicture from "@/app/[lang]/YourAccount/_components/SelectPicture/SelectPicture";
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
