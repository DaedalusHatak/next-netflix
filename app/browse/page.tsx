'use client'
import Link from "next/link"
import HeroNetflix from "@/components/HeroNetflix"
import BaseCard from "@/components/BaseCard"


function Board({ xIsNext, squares, onPlay}: any){
  const sections = [
    {
      header: "Enjoy on your TV",
      desc: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
     
    },
    {
      header: "Download your shows to watch offline",
      desc: "Save your favorites easily and always have something to watch.",
     
      reverse: true,
    },
    {
      header: "Watch everywhere",
      desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
      
    },
    {
      header: "Create profiles for kids",
      desc: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
      
      reverse: true,
    },
  ];
return(
  <>
    <section
  >
{sections.map((section,index) => (
      <BaseCard
      key={index}
      desc={section.desc}
      header={section.header}
      reverse={section.reverse}
      className="content-section"
      ></BaseCard>
))}
  </section>
  </>
)
}

export default function Page() {
  
    return (
   
        <div>
       <section className="hero-image">
    <HeroNetflix />
  </section>
<Board></Board>

  <section>

  </section>
       </div>

    )
  }
