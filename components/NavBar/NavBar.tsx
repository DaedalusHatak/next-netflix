'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import styles from './NavBar.module.scss';

export default function NavBar({ user }: any) {
	const [isHoveredMenu, setIsHoveredMenu] = useState(false);
	const [isHoveredProfile, setIsHoveredProfile] = useState(false);
  const [scroll, setScroll] = useState(0);
	const [width, setwidth] = useState(0);
  const [profileCounter, setProfileCounter] = useState(0);
	if (typeof window !== 'undefined') {
		window.addEventListener('resize', handleResize);
		window.addEventListener('scroll', updateNavOnScroll);
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

		setIsHoveredMenu(true);
	}
	function handleUnhoverMenu() {
    setProfileCounter(0)
		menuTimeout = setTimeout(() => {
			setIsHoveredMenu(false);
		}, 200);
	}
	function handleHoverProfile() {
		clearTimeout(profileTimeout);

		setIsHoveredProfile(true);
	}
	function handleUnhoverProfile() {
    setProfileCounter(0)
		profileTimeout = setTimeout(() => {
			setIsHoveredProfile(false);
		}, 200);
	}
  function PreviousArrowKey() {

    if (profileCounter > 0) {
      console.log("if bigger")
      setProfileCounter(profileCounter - 1);
    }
    console.log(profileCounter)
    if (isHoveredMenu === true) {
      const li = menuDropdown.current!.children[profileCounter] as HTMLAnchorElement
      li.focus()
      console.log(li)
    } else if (isHoveredProfile === true) {
      const children = dropdown.current!.children[
        profileCounter
    ] as HTMLAnchorElement; 
      children.focus();
    }
  }
  function NextArrowKey() {
    console.log(profileCounter)
    if (isHoveredMenu && profileCounter < 3 ) {
      setProfileCounter(profileCounter + 1);
    }
    else if(isHoveredProfile && profileCounter < 2 ){
      setProfileCounter(profileCounter + 1);
    }
    if (isHoveredMenu === true) {
      const li = menuDropdown.current!.children[profileCounter] as HTMLAnchorElement
      li.focus();
    } else if (isHoveredProfile === true) {
      const children = dropdown.current!.children[profileCounter] as HTMLAnchorElement;
      children.focus();
    }
  }

  function startArrowKeys() {
    if (isHoveredMenu === true) {
      mainPage.current!.focus();
    } else if (isHoveredProfile === true) {
      account.current!.focus();
    }
  }
  async function handleKeys(event:any){

    if(event.altKey && event.ctrlKey) {
      return
    }
    const isOpenKey = event.key === " " || event.key === "Enter" ? true : false;

    if(event.target.id === "menu" && !isHoveredMenu && isOpenKey){
      setIsHoveredMenu(true)
       return
      }
    if(event.target.id === "profile" && !isHoveredProfile && isOpenKey){
      setIsHoveredProfile(true)
       return
      }
      if(event.key !== "ArrowUp" && event.key !== "ArrowDown" && event.key !== "Enter" && event.key !== " " ) {
        console.log(event.key)
        return
      }
    if(event.key !== "Tab"){startArrowKeys()}
    if(event.key === "ArrowDown"){
      console.log("next",event.key)
      await NextArrowKey()
    }
    if(event.key === "ArrowUp"){
      console.log("previous",event.key)
      await PreviousArrowKey()
    }
   
  }

	const account = useRef<HTMLAnchorElement | null>(null);
	const mainPage = useRef<HTMLAnchorElement | null>(null);
	const dropdown = useRef<HTMLUListElement | null>(null);
	const menuDropdown = useRef<HTMLUListElement>(null);
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

				<ul className={`${styles.ul} ${styles['desktop-list']} `}>
					<Link  className={styles.a} href="/browse">
						Main Page
					</Link>
					<Link className={styles.a} href="/browse/tv">
						Series
					</Link>
					<Link className={styles.a} href="/browse/movie">
						Movies
					</Link>
					<Link className={styles.a} href="/browse/popular">
						New and popular
					</Link>
				</ul>
				<button
        id="menu"
					onMouseOver={() => handleHoverMenu()}
					onMouseLeave={() => handleUnhoverMenu()}
          onKeyDown={handleKeys}
					className={styles.button}
				>
					Browse <span>▼</span>
				</button>
				{isHoveredMenu && width < 880 && (
					<div
						onMouseOver={() => handleHoverMenu()}
						onMouseLeave={() => handleUnhoverMenu()}
						className={styles['mobile-list']}
					>
						<ul ref={menuDropdown} className={`${styles.list} ${styles.ul}`}>
							<Link onKeyDown={handleKeys} className={styles.a} ref={mainPage} href="/browse">
								Main Page
							</Link>
							<Link onKeyDown={handleKeys} className={styles.a} href="/browse/tv">
								Series
							</Link>
							<Link onKeyDown={handleKeys} className={styles.a} href="/browse/movie">
								Movies
							</Link>
							<Link onKeyDown={handleKeys} className={styles.a} href="/browse/popular">
								New and popular
							</Link>
						</ul>
					</div>
				)}
				<div
        id='profile'
         tabIndex={0}
         onMouseOver={() => handleHoverProfile()}
         onMouseLeave={() => handleUnhoverProfile()}
         onKeyDown={handleKeys}
					className={styles.profile}
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
			{isHoveredProfile && (
				<div
					onMouseOver={() => handleHoverProfile()}
					onMouseLeave={() => handleUnhoverProfile()}
					className={styles['mobile-list']}
				>
					<ul ref={dropdown} className={`${styles.account} ${styles.ul}`}>
						<Link   onKeyDown={handleKeys} className={styles.a} ref={account} href="/YourAccount">
							Account
						</Link>
						<Link   onKeyDown={handleKeys} className={styles.a} href="/posts">
							Posts
						</Link>
						<Link id="lastProfile"  onKeyDown={handleKeys} className={styles.a} href="/">
							Logout
						</Link>
					</ul>
				</div>
			)}
		</nav>
	);
}
