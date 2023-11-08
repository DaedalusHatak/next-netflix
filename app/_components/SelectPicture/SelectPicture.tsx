"use client";
import Image from "next/image";
import styles from "./SelectPicture.module.scss";
import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
<<<<<<< HEAD
import firebase_app from "@/app/_firebase/firebase-client";
=======
import firebase_app from "@/app/_utils/firebase/firebase-client";
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from "@/app/_store/avatar";
export default function SelectPicture({ avatars, profile }: any) {
  const [selectedImage, setSelectedImage] = useState(profile);
  const dispatch = useDispatch();
  const avatar = useSelector((state: any) => state.avatar.value.photoURL);
  function selectWithSpace(e: any, selectedPicture: string) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setSelectedImage(selectedPicture);
    }
  }
  async function changeProfilePicture() {
    const auth = await getAuth(firebase_app);
    profile = selectedImage;
    updateProfile(auth.currentUser!, { photoURL: selectedImage });
    dispatch(setAvatar(selectedImage));
  }
  return (
    <>
      <div className={styles["change-pictures"]}>
        {avatars.map((picture: any, index: any) => (
          <Image
            key={index}
            //   :className="firestoreClient.avatar === picture ? 'selected' : ''"
            src={`/assets/profile/${picture}`}
            onClick={() => setSelectedImage(picture)}
            onKeyDown={(e: any) => selectWithSpace(e, picture)}
            //   @click="firestoreClient.avatar = picture"
            //   @keydown.space.exact.prevent="firestoreClient.avatar = picture"
            //   @keydown.enter.exact.prevent="firestoreClient.avatar = picture"
            className={`${styles["profile-pictures"]} ${
              selectedImage === picture ? styles["selected"] : ""
            }`}
            width={100}
            height={100}
            alt=""
            tabIndex={0}
          />
        ))}
      </div>
      <div className={`${styles["change-pictures"]} ${styles["single-grid"]}`}>
        <button
          //   @click="updatePhoto(firestoreClient.avatar)"
          onClick={() => changeProfilePicture()}
          className={styles["profile-button"]}
        >
          Save changes
        </button>
      </div>
    </>
  );
}
