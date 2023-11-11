"use client";
import BaseInput from "@/app/_components/BaseInput/BaseInput";
import styles from "@/app/[lang]/login/login.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SignInFirebase } from "@/app/_utils/firebase/getFirebase";
import BaseModal from "../../../../_components/BaseModal/BaseModal";
import { updateProfile } from "firebase/auth";

export default function LoginForm() {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<string | false>(false);
  const router = useRouter();
  async function Sign(emailInput: string, passwordInput: string) {
    setLoader(true);
    const creds = await SignInFirebase(emailInput, passwordInput);
    if (!creds.photoURL) {
      await updateProfile(creds, { photoURL: "Raiden.webp" });
    }
    if (!creds.accessToken) {
      setIsModal(creds);
      setLoader(false);
      return;
    }
    const id: string = await creds.getIdToken(true);
    const setCookie = await fetch("/api/setCookie", {
      next: { revalidate: 0 },
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(id),
    });
    if (setCookie) {
      // router.push("/YourAccount", {});
      window.location.href = "/YourAccount";
    }
  }

  return (
    <>
      {isModal && (
        <BaseModal
          title="Error"
          message={isModal}
          hideModal={() => setIsModal(false)}
        ></BaseModal>
      )}
      <form
        onSubmit={(e: FormEvent) => e.preventDefault()}
        className={styles["form"]}
        name="login"
      >
        <BaseInput
          name="Email Address"
          isBackground={true}
          type="email"
          fullWidth={true}
          complete="email"
          value={email}
          error={error}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
        <BaseInput
          name="Password"
          isBackground={true}
          type="password"
          fullWidth={true}
          complete="current-password"
          value={password}
          error={error}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />
        <button
          onClick={() => Sign(email, password)}
          className={styles["get-started-button"]}
        >
          {!loader === true ? (
            <span>Sign In</span>
          ) : (
            <div className={styles["loader"]}>
              <span className={styles["loader-circle"]}></span>
            </div>
          )}
        </button>{" "}
      </form>
      <button
        onClick={() => Sign("test@test.com", "test1234")}
        className={styles["get-started-button"]}
      >
        {!loader ? (
          <span>Test login</span>
        ) : (
          <div className={styles["loader"]}>
            <span className={styles["loader-circle"]}></span>
          </div>
        )}
      </button>
    </>
  );
}
