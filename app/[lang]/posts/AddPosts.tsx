"use client";
import {
  FormEvent,
  FormEventHandler,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
<<<<<<< HEAD
import { createUser } from "@/app/_firebase/getFirebase";
=======
import { createUser } from "@/app/_utils/firebase/getFirebase";
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

export default function AddPosts({ user, styles }: any) {
  const [post, setPost] = useState("");
  const [active, setActive] = useState(false);
  const textarea = useRef<HTMLTextAreaElement | null>(null);

<<<<<<< HEAD
useEffect(()=>{

},[post])
=======
  useEffect(() => {}, [post]);
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb

  function autoResize(event: any) {
    textarea.current!.style.height = "auto";
    textarea.current!.style.height = textarea.current!.scrollHeight + "px";
    setPost(event.target.value);
<<<<<<< HEAD

=======
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb
  }

  async function addData(e: any, bruh: string) {
    e.preventDefault();
    const firestore = getFirestore();
    const timestamp = serverTimestamp();
    const newData = {
      post: bruh,
      user: user.email,
      createdAt: timestamp,
    };
    addDoc(collection(firestore, "avatar"), newData);
    setPost("");
    textarea.current!.style.height = "auto";
  }
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["new-post-textarea"]}>
          <textarea
            className={`${styles["textarea"]}`}
            id="post-area"
            ref={textarea}
            value={post}
            onInput={autoResize}
<<<<<<< HEAD
            onFocus={()=>setActive(true)}
            onBlur={()=> post === "" ? setActive(false) : ''}
          
=======
            onFocus={() => setActive(true)}
            onBlur={() => (post === "" ? setActive(false) : "")}

>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb
            // @focusout="focusOut"
            // @change="post === '' ? (isActive = false) : (isActive = true)"
            // @focusin="focusIn"
            // @input="autoResize"
          />
          <label
            // :className="isActive ? 'label-active' : 'label'"
            // for="post-area"
<<<<<<< HEAD
            className={`${styles["label"]}  ${active ? styles["label-active"] : ''}`}
=======
            className={`${styles["label"]}  ${
              active ? styles["label-active"] : ""
            }`}
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb
          >
            Add a new post
          </label>
        </div>
        <button
          onClick={(e) => addData(e, post)}
          className={styles["button"]}
        >
          Add a new post
        </button>
      </div>
    </>
  );
}
