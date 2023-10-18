import { setPosition, setSlide } from '@/app/_store/feature';
import { AnimatePresence, motion } from 'framer-motion';
import Imagee from 'next/image';
import { useDispatch } from 'react-redux';
import styles from "./movieCard.module.scss"
import { useEffect, useState } from 'react';
import Head from "next/head";
export default function MovieCard({ position, slide }: any) {

  const [isHovered, setIsHovered] = useState(false);
  const [scroll,setScroll] = useState(position.y + window.scrollY)

useEffect(() => {

  const calculateTopPosition = () => {
    if (position.y && position.height) {
      const center = position.y + position.height / 2;
      setScroll(center - 48 + window.scrollY);
    }
  };

  // Calculate the initial top position
  calculateTopPosition();

  // Recalculate the top position when the window is resized
  window.addEventListener('resize', calculateTopPosition);

  return () => {
    window.removeEventListener('resize', calculateTopPosition);
  };
}, [position.y, position.height]);
	const dispatch = useDispatch();
	function resetSlide() {
		setTimeout(() => {
			dispatch(setSlide(null));
			dispatch(setPosition(null));
		}, 150);
	}

  const releaseDate = () => {
    if (slide.release_date) {
      return slide.release_date.split("-").reverse().join("-");
    } else {
      return slide.first_air_date
        .split("-")
        .reverse()
        .join("-");
    }
  };
  const positionX = () =>{
    if(position.x > window.innerWidth - position.width - 96 - 48)
    return position.right - position.width ;
  if(position.width + 48 > position.x)
  return position.x 
return position.x
  }
  const originX = () =>{
    if(position.x > window.innerWidth - position.width - 96 - 48)
   { return "right";}
  if(position.width + 48 > position.x)
  {return "left"}
return "center"
  }



	return (
		<>
    <Head>
      <link rel="preload" href={`https://image.tmdb.org/t/p/w500${slide.backdrop_path}`} as="image">
      </link>
    </Head>
    <AnimatePresence>
			{position.width && slide && <motion.div
      key={position}
      initial={{ scale: 1.00, left: position.x,top: scroll }} // Set the initial scale to 1.00
      animate={{ scale: isHovered ? 1.00 : 1.5, left: positionX(),top: scroll, translateY:"-25%"}} // Use state to control the scale
				whileHover={{ scale: 1.5 }}
        onHoverStart={() => {
          setIsHovered(false); // Set the hover state to true
        }}
        onHoverEnd={() => {
          setIsHovered(true); // Set the hover state to false
        }}
				transition={{ duration: 0.15, damping: 10, stiffness: 100 }}
				style={{
          transformOrigin: originX(),
					position: 'absolute',
					width: position.width,
					zIndex: 3,
				}}
        onMouseLeave={() => resetSlide()}
			>
				
					{position && slide && (
						<div key={slide} >
							<Imagee
              priority={true}
                className={styles["img-card"]}
								key={`https://image.tmdb.org/t/p/w500${slide.backdrop_path}`}
								src={`https://image.tmdb.org/t/p/w500${slide.backdrop_path}`}
                height={120}
                width={220}
								alt=""
							/>
              
						</div>
					)}

				{position && slide &&
              <div
              className={styles.info}
            >
              <h3 className={styles.header}>
                <span className={styles.name}>Title: </span>
                { slide.title || slide.name }
              </h3>
              <p className={styles.para}><span className={styles.name}>Release date: </span> { releaseDate() }</p>
              <p className={styles.para}>
                <span className={styles.name}>Rating: </span> { slide.vote_average }
                <span className={`${styles.name} ${styles.gap}`} >Votes: </span> { slide.vote_count }
              </p>
              <p className={`${styles.overview} ${styles.para}`}>
                <span className={styles.name}>Overview: </span> {slide.overview }
              </p>
            </div>}
		
			</motion.div>}
      </AnimatePresence>
		</>
	);
}
