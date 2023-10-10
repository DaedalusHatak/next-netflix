"use client"
import BaseInput from "@/components/BaseInput/BaseInput";
import styles from "./login.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInFirebase } from "@/server/getFirebase";
export default function LoginForm(){
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

   return ( <>

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
        complete="current-password"
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
      </button>    </form>
          <button  onClick={()=>Sign("test@test.com","test1234")} className={styles["get-started-button"]}>
          <span>Test login</span>
          {/* <div className={styles["loader"]}>
            <span className={styles["loader-circle"]}></span>
          </div> */}
        </button>
   </>)
}