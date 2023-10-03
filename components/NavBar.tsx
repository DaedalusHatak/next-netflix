"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';



export default  function NavBar({user}:any) {
	const account = useRef<HTMLAnchorElement | null>(null);
	const mainPage = useRef<HTMLAnchorElement | null>(null);
	const dropdown = useRef<HTMLUListElement | null>(null);
	const menuDropdown = useRef(null);
	return (
		<nav>
			<div className="navbar">
				<Image
					src="/assets/daedalus.png"
					height={64}
					width={185}
					className="logo"
					alt="Daedalus logo"
				/>

				<ul className="desktop-list">
					<Link href="/browse">Main Page</Link>
					<Link href="/browse/tv">Series</Link>
					<Link href="/browse/movie">Movies</Link>
					<Link href="/browse/popular">New and popular</Link>
				</ul>
				<button>
					Browse <span>▼</span>
				</button>
				<div className="mobile-list">
					<ul ref={menuDropdown} className="list">
						<Link ref={mainPage} href="/browse">
							Main Page
						</Link>
						<Link href="/browse/tv">Series</Link>
						<Link href="/browse/movie">Movies</Link>
						<Link href="/browse/popular">New and popular</Link>
					</ul>
				</div>
				<div
					className="profile"
					tabIndex={0}
					aria-haspopup="true"
					aria-controls="menu"
				>
					<Image src={`/assets/profile/`+ user} height={40} width={40} alt="Profile Photo" />
				</div>
			</div>
			<div className="mobile-list">
				<ul ref={dropdown} className="account">
					<Link ref={account} href="/YourAccount">
						Account
					</Link>
					<Link href="/posts">Posts</Link>
					<Link href="/">Logout</Link>
				</ul>
			</div>
		</nav>
	);
}
