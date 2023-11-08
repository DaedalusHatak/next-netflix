import { FormEvent, useState } from "react";
import BaseInput from "../BaseInput/BaseInput";
<<<<<<< HEAD
import { createUser } from "@/app/_firebase/getFirebase";
import { useRouter } from "next/navigation"; 
=======
import { createUser } from "@/app/_utils/firebase/getFirebase";
import { useRouter } from "next/navigation";
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb

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
<<<<<<< HEAD

=======
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb
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
        fullWidth={true}
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
        fullWidth={true}
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
