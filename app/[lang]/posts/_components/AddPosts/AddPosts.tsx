"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { User } from "@/types";

export default function AddPosts({
  user,
  styles,
}: {
  user: User;
  styles: any;
}) {
  const [post, setPost] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const textarea = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {}, [post]);

  function autoResize(event: FormEvent) {
    textarea.current!.style.height = "auto";
    textarea.current!.style.height = textarea.current!.scrollHeight + "px";
    setPost((event.target as HTMLTextAreaElement).value);
  }

  async function addData(e: React.MouseEvent, postValue: string) {
    e.preventDefault();
    const firestore = getFirestore();
    const timestamp = serverTimestamp();
    const newData = {
      post: postValue,
      user: user!.email,
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
            onFocus={() => setActive(true)}
            onBlur={() => (post === "" ? setActive(false) : "")}

            // @focusout="focusOut"
            // @change="post === '' ? (isActive = false) : (isActive = true)"
            // @focusin="focusIn"
            // @input="autoResize"
          />
          <label
            // :className="isActive ? 'label-active' : 'label'"
            // for="post-area"
            className={`${styles["label"]}  ${
              active ? styles["label-active"] : ""
            }`}
          >
            Add a new post
          </label>
        </div>
        <button
          onClick={(e: React.MouseEvent) => addData(e, post)}
          className={styles["button"]}
        >
          Add a new post
        </button>
      </div>
    </>
  );
}
