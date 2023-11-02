"use client"
import Image from "next/image";
import styles from "./SelectPicture.module.scss"
import { useState } from "react";
export default function SelectPicture({avatars}:any) {
    const [selectedImage, setSelectedImage] = useState("")
  

    return(
    <>
        <div className={styles["change-pictures"]}>
                    {avatars.map((picture:any, index:any) => (
           <Image
           key={index}
            //   :className="firestoreClient.avatar === picture ? 'selected' : ''"
            src={`/assets/profile/${picture}`}
            onClick={()=>setSelectedImage(picture)}
            //   @click="firestoreClient.avatar = picture"
            //   @keydown.space.exact.prevent="firestoreClient.avatar = picture"
            //   @keydown.enter.exact.prevent="firestoreClient.avatar = picture"
              className={`${styles["profile-pictures"]} ${selectedImage === picture ? styles["selected"] : ""}`}
              width={100}
              height={100}
              alt=""
              tabIndex={0}
            />
          ))}
  </div>
  {selectedImage}
  <div className={styles["change-pictures"]}>
    <button
    //   @click="updatePhoto(firestoreClient.avatar)"
      className={styles["profile-button"]}
    >
      Save changes
    </button>
  </div>
    </>
    )
}