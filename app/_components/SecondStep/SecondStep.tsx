import { FormEvent, useState } from "react";
import BaseInput from "../BaseInput/BaseInput";
import { createUser } from "@/app/_firebase/getFirebase";
import { useRouter } from "next/navigation";
export default function SecondStep({ data, styles, showModal }: any) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(data || "");
  const [error, setError]: any = useState("");
  const router = useRouter();
  async function createUserForm(e: FormEvent) {
    e.preventDefault();
    const status = await createUser(email, password);
    if (status === true) {
      showModal(status);
    } else {
      console.log(status);
      showModal(status);
    }
  }

  return (
    <form
      onSubmit={(e: FormEvent) => createUserForm(e)}
      className={styles["form"]}
    >
      <div className={styles["title"]}>
        <h2 className={styles["h2"]}>
          Create a password to start your membership
        </h2>
        <p className={styles["p"]}>Just a few more steps and you are done!</p>
        <p className={styles["p"]}>We hate paperwork, too.</p>
      </div>
      <p></p>
      <BaseInput
        name="Email Address"
        isBackground={true}
        type="email"
        value={email}
        error={error}
        complete={email}
        onChange={(e: any) => setEmail(e.target.value)}
        required
      />

      <BaseInput
        name="Password"
        isBackground={true}
        type="password"
        complete="new-password"
        value={password}
        error={error}
        onChange={(e: any) => setPassword(e.target.value)}
        required
      />
      <button className={styles["button"]}>
        <span>Create</span>
      </button>
    </form>
  );
}
