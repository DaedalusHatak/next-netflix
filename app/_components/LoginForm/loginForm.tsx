"use client";
import BaseInput from "@/app/_components/BaseInput/BaseInput";
import styles from "@/app/[lang]/login/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInFirebase } from "@/app/_firebase/getFirebase";
import BaseModal from "../BaseModal/BaseModal";
export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError]: any = useState("");
  const [loader, setLoader] = useState(false);
  const [isModal, setIsModal] = useState<string | false>(false);
  const router = useRouter();
  async function Sign(emailInput: string, passwordInput: string) {
    setLoader(true);
    const creds = await SignInFirebase(emailInput, passwordInput);
    if (!creds.accessToken) {
      setIsModal(creds);
      setLoader(false);
      return;
    }
    const id = await creds.getIdToken();
    await fetch("/api/setCookie", { method: "POST", body: JSON.stringify(id) });
    const isLoggedIn = await fetch("/api/getCookie", {
      method: "POST",
      body: JSON.stringify(id),
    });
    console.log(isLoggedIn);
    router.push("/browse");
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
        onSubmit={(e) => e.preventDefault()}
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
          onChange={(e: any) => setEmail(e.target.value)}
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
          onChange={(e: any) => setPassword(e.target.value)}
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
