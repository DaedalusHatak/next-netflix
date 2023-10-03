"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import styles from "./NavBar.module.scss";

export default function NavBar({ user }: any) {
  const [width, setwidth] = useState(window.innerWidth);
  window.addEventListener("resize", handleResize);
  function handleResize() {
    setwidth(window.innerWidth);
  }
  const [isHoveredMenu, setIsHoveredMenu] = useState(true);
  const account = useRef<HTMLAnchorElement | null>(null);
  const mainPage = useRef<HTMLAnchorElement | null>(null);
  const dropdown = useRef<HTMLUListElement | null>(null);
  const menuDropdown = useRef(null);
  return (
    <nav>
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
          >
            Main Page
          </Link>
          <Link
            className={styles.a}
            href="/browse/tv"
          >
            Series
          </Link>
          <Link
            className={styles.a}
            href="/browse/movie"
          >
            Movies
          </Link>
          <Link
            className={styles.a}
            href="/browse/popular"
          >
            New and popular
          </Link>
        </ul>
        <button className={styles.button}>
          Browse <span>▼</span>
        </button>
        {isHoveredMenu && width < 880 && (
          <div className={styles["mobile-list"]}>
            <ul
              ref={menuDropdown}
              className={`${styles.list} ${styles.ul}`}
            >
              <Link
                className={styles.a}
                ref={mainPage}
                href="/browse"
              >
                Main Page
              </Link>
              <Link
                className={styles.a}
                href="/browse/tv"
              >
                Series
              </Link>
              <Link
                className={styles.a}
                href="/browse/movie"
              >
                Movies
              </Link>
              <Link
                className={styles.a}
                href="/browse/popular"
              >
                New and popular
              </Link>
            </ul>
          </div>
        )}
        <div
          className={styles.profile}
          tabIndex={0}
          aria-haspopup="true"
          aria-controls="menu"
        >
          <Image
            src={`/assets/profile/` + user}
            height={40}
            width={40}
            alt="Profile Photo"
          />
        </div>
      </div>
      <div className={styles["mobile-list"]}>
        <ul
          ref={dropdown}
          className={`${styles.account} ${styles.ul}`}
        >
          <Link
            className={styles.a}
            ref={account}
            href="/YourAccount"
          >
            Account
          </Link>
          <Link
            className={styles.a}
            href="/posts"
          >
            Posts
          </Link>
          <Link
            className={styles.a}
            href="/"
          >
            Logout
          </Link>
        </ul>
      </div>
    </nav>
  );
}
