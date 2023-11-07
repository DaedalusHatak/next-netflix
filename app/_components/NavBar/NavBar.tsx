"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./NavBar.module.scss";
import { signOutUser } from "@/app/_utils/firebase/getFirebase";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function NavBar({ user }: any) {
  const [isHoveredMenu, setIsHoveredMenu] = useState(false);
  const [isHoveredProfile, setIsHoveredProfile] = useState(false);
  const [wasButton, setWasButton] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [width, setwidth] = useState(0);
  const [profileCounter, setProfileCounter] = useState(0);
  const router = useRouter();
  const avatar = useSelector((state: any) => state.avatar.value.photoURL);
  useEffect(() => {
    if (isHoveredMenu === true && wasButton) {
      const li = menuDropdown.current!.children[
        profileCounter
      ] as HTMLAnchorElement;
      li.focus();
    } else if (isHoveredProfile && wasButton && profileCounter <= 2) {
      const children = dropdown.current!.children[
        profileCounter
      ] as HTMLAnchorElement;
      children.focus();
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", updateNavOnScroll);
    }
  }, [profileCounter, isHoveredMenu, isHoveredProfile, wasButton]);

  async function signOut() {
    const answer = await signOutUser(user.uid);
    router.push("/login");
  }
  function updateNavOnScroll() {
    setScroll(window.scrollY);
    setIsHoveredMenu(false);
    setIsHoveredProfile(false);
  }
  let menuTimeout: NodeJS.Timeout;
  let profileTimeout: NodeJS.Timeout;
  function handleResize() {
    setwidth(window.innerWidth);
  }
  function handleHoverMenu() {
    clearTimeout(menuTimeout);
    setIsHoveredProfile(false);
    setIsHoveredMenu(true);
  }
  function handleUnhoverMenu() {
    setProfileCounter(0);
    menuTimeout = setTimeout(() => {
      setIsHoveredMenu(false);
    }, 200);
  }
  function handleHoverProfile() {
    clearTimeout(profileTimeout);
    setIsHoveredMenu(false);
    setIsHoveredProfile(true);
  }
  function handleUnhoverProfile() {
    setProfileCounter(0);
    profileTimeout = setTimeout(() => {
      setIsHoveredProfile(false);
    }, 200);
  }
  function PreviousArrowKey() {
    if (profileCounter > 0) {
      setProfileCounter(profileCounter - 1);
    }
  }
  function NextArrowKey() {
    if (isHoveredMenu && profileCounter >= 3) {
      return;
    }
    if (isHoveredProfile && profileCounter >= 3) {
      return;
    }
    setProfileCounter(profileCounter + 1);
  }

  function startArrowKeys() {
    setProfileCounter(0);
    if (isHoveredMenu === true) {
      mainPage.current!.focus();
    } else if (isHoveredProfile === true) {
      account.current!.focus();
    }
  }
  function handleKeys(event: any) {
    setWasButton(true);

    if (event.altKey && event.ctrlKey) {
      return;
    }
    if (
      event.key !== "ArrowUp" &&
      event.key !== "ArrowDown" &&
      event.key !== "Enter" &&
      event.key !== " " &&
      event.key !== "Tab" &&
      event.shiftKey &&
      event.key !== "Tab"
    ) {
      return;
    }
    const isOpenKey = event.key === " " || event.key === "Enter" ? true : false;
    if (isOpenKey) {
      event.preventDefault();
    }
    if (event.target.id === "menu" && !isHoveredMenu && isOpenKey) {
      setProfileCounter(0);
      setIsHoveredProfile(false);
      setIsHoveredMenu(true);
      return;
    }
    if (event.target.id === "profile" && !isHoveredProfile && isOpenKey) {
      setProfileCounter(0);
      setIsHoveredMenu(false);
      setIsHoveredProfile(true);

      return;
    }

    if (
      ((event.target.id === "menu" && isHoveredMenu) ||
        (event.target.id === "profile" && isHoveredProfile)) &&
      event.key === "Tab" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      startArrowKeys();
      return;
    }

    if (
      event.key === "ArrowDown" ||
      (event.key === "Tab" &&
        !event.shiftKey &&
        (isHoveredMenu || isHoveredProfile))
    ) {
      if (
        (isHoveredProfile && profileCounter !== 2) ||
        (isHoveredMenu && profileCounter !== 3)
      ) {
        event.preventDefault();
      }
      NextArrowKey();
      return;
    }
    if (event.key === "ArrowUp" || (event.key === "Tab" && event.shiftKey)) {
      if (profileCounter !== 0) {
        event.preventDefault();
      }
      PreviousArrowKey();
      return;
    }
  }

  function resetKeys() {
    console.log(profileCounter);
    if (
      isHoveredMenu ||
      (profileCounter === 3 && isHoveredProfile) ||
      profileCounter === 0
    ) {
      setIsHoveredMenu(false);
      setIsHoveredProfile(false);
      setProfileCounter(0);
    }
  }

  const account = useRef<HTMLAnchorElement | null>(null);
  const mainPage = useRef<HTMLAnchorElement | null>(null);
  const dropdown = useRef<HTMLUListElement | null>(null);
  const menuDropdown = useRef<HTMLUListElement>(null);
  return (
    <nav className={`${styles.nav}  ${scroll > 0 ? styles["background"] : ""}`}>
      <div className={styles.navbar}>
        <Image
          src="/assets/daedalus.png"
          height={64}
          width={185}
          className="logo"
          alt="Daedalus logo"
        />

        <ul className={`${styles.ul} ${styles["desktop-list"]} `}>
          <Link
            className={styles.a}
            href="/browse"
            scroll={false}
          >
            Main Page
          </Link>
          <Link
            className={styles.a}
            href="/browse/tv"
            scroll={false}
          >
            Series
          </Link>
          <Link
            className={styles.a}
            href="/browse/movie"
            scroll={false}
          >
            Movies
          </Link>
          <Link
            className={styles.a}
            href="/browse/popular"
            scroll={false}
          >
            New and popular
          </Link>
        </ul>
        <button
          id="menu"
          onMouseOver={() => handleHoverMenu()}
          onMouseLeave={() => handleUnhoverMenu()}
          onKeyDown={handleKeys}
          onFocus={() => resetKeys()}
          className={styles.button}
        >
          Browse <span>▼</span>
        </button>
        {isHoveredMenu && width < 880 && (
          <div
            onMouseOver={() => handleHoverMenu()}
            onMouseLeave={() => handleUnhoverMenu()}
            className={styles["mobile-list"]}
          >
            <ul
              ref={menuDropdown}
              className={`${styles.list} ${styles.ul}`}
            >
              <Link
                onKeyDown={handleKeys}
                className={styles.a}
                ref={mainPage}
                href="/browse"
                scroll={false}
              >
                Main Page
              </Link>
              <Link
                onKeyDown={handleKeys}
                className={styles.a}
                href="/browse/tv"
                scroll={false}
              >
                Series
              </Link>
              <Link
                onKeyDown={handleKeys}
                className={styles.a}
                href="/browse/movie"
                scroll={false}
              >
                Movies
              </Link>
              <Link
                onKeyDown={handleKeys}
                className={styles.a}
                href="/browse/popular"
                scroll={false}
              >
                New and popular
              </Link>
            </ul>
          </div>
        )}
        <div
          id="profile"
          tabIndex={0}
          onMouseOver={() => handleHoverProfile()}
          onMouseLeave={() => handleUnhoverProfile()}
          onKeyDown={handleKeys}
          onFocus={() => resetKeys()}
          className={styles.profile}
          aria-haspopup="true"
          aria-controls="menu"
        >
          <Image
            src={`/assets/profile/${avatar ? avatar : user.photoURL}`}
            height={40}
            width={40}
            alt="Profile Photo"
          />
        </div>

        {isHoveredProfile && (
          <div
            onMouseOver={() => handleHoverProfile()}
            onMouseLeave={() => handleUnhoverProfile()}
            className={styles["mobile-list"]}
          >
            <ul
              ref={dropdown}
              className={`${styles.account} ${styles.ul}`}
            >
              <Link
                onKeyDown={handleKeys}
                className={styles.a}
                ref={account}
                href="/YourAccount"
                scroll={false}
              >
                Account
              </Link>
              <Link
                onKeyDown={handleKeys}
                className={styles.a}
                href="/posts"
                scroll={false}
              >
                Posts
              </Link>
              <Link
                id="lastProfile"
                onKeyDown={handleKeys}
                onBlur={() => resetKeys()}
                className={styles.a}
                href="/"
                scroll={false}
                onClick={() => signOut()}
              >
                Logout
              </Link>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
