import Image from "next/image";
import Link from "next/link";
import GetStartedForm from "../GetStartedForm/GetStartedForm";

export default function HeroNetflix() {
  return (
    <>
      <Image
        className="hero-img"
        src="/assets/background.png"
        width="250"
        height="250"
        alt=""
      />

      <div className="shadow-hero-image"></div>
      <div className="hero-wrapper">
        <nav>
          <span className="logo-span">
            <Image
              src="/assets/daedalus.png"
              width="250"
              height="250"
              alt=""
            />
          </span>
          <Link
            href="/login"
            className="sign-in-button"
          >
            Sign In
          </Link>
        </nav>
        <div className="flex-hero">
          <div className="header-hero">
            <h1>Unlimited movies, TV shows, and more</h1>

            <p className="subtitle-hero">Watch anywhere. Cancel anytime.</p>
            <GetStartedForm />
          </div>
        </div>
      </div>
    </>
  );
}
