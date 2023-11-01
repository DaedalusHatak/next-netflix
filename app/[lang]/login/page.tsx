import Image from "next/image";
import Link from "next/link";
import styles from "./login.module.scss";
import LoginForm from "@/app/_components/LoginForm/loginForm";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default function AskedQuestions() {
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
              <LoginForm />
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
