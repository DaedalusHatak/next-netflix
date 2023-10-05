"use client";
import BaseInput from "@/components/BaseInput/BaseInput";
import BaseModal from "@/components/BaseModal/BaseModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./login.module.scss";
import { SignInFirebase } from "@/server/getFirebase";
import { useRouter } from "next/navigation";

export default function AskedQuestions() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError]: any = useState("");

  const router = useRouter();
    async function Sign(emailInput:string,passwordInput:string){

        const creds = await SignInFirebase(emailInput,passwordInput);
        const id = await creds.getIdToken();
        await fetch("/api/setCookie",{method:"POST",body:JSON.stringify(id)});
        const isLoggedIn = await fetch("/api/getCookie",{method:"POST",body:JSON.stringify(id)})
        console.log(isLoggedIn)
        router.push("/browse")
        }
  return (
    <>
      <Image
        className={styles["hero-img"]}
        src="/assets/background.png"
        width={200}
        height={200}
        alt=""
      />
      <div className={styles["shadow-hero-image"]}></div>
      <div className={styles["hero-wrapper"]}>
        <nav className={styles["nav"]}>
          <span className={styles["logo-span"]}>
            <Image
              src="/assets/daedalus.png"
              width={200}
              height={200}
              alt=""
            />
          </span>
        </nav>
        <div className={styles["flex-hero"]}>
          <div className={styles["form-hero"]}>
            <div className={styles["login-form"]}>
              <h1 className={styles["h1"]}>Sign In</h1>
              <form
              onSubmit={(e)=>e.preventDefault()}
                className={styles["form"]}
                name="login"
              >
                <BaseInput
                  name="Email Address"
                  isBackground={true}
                  type="email"
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
                  complete="password"
                  value={password}
                  error={error}
                  onChange={(e: any) => setPassword(e.target.value)}
                  required
                />

                <button onClick={()=>Sign(email,password)} className={styles["get-started-button"]}>
                  <span>Sign In</span>
                  {/* <div className={styles["loader"]}>
                    <span className={styles["loader-circle"]}></span>
                  </div> */}
                </button>
              </form>
              <button  onClick={()=>Sign("test@test.com","test1234")} className={styles["get-started-button"]}>
                <span>Test login</span>
                {/* <div className={styles["loader"]}>
                  <span className={styles["loader-circle"]}></span>
                </div> */}
              </button>
            </div>
            <div className={styles["reg-link"]}>
              New to Daedalus?{" "}
              <Link
                className={styles["a"]}
                href="/"
              >
                Sign up now
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
