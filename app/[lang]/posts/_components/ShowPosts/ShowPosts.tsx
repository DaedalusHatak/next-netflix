"use client";

import {
  DocumentData,
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import IconInfo from "../IconInfo/IconInfo";
import { AnimatePresence, motion } from "framer-motion";

export default function ShowPosts({ user, styles }: any) {
  const firestore = getFirestore();
  const [initial, setInitial] = useState<{ opacity: number; x: number }>({
    opacity: 1,
    x: 0,
  });
  const [firestoreDatabase, setFirestoreDatabase] = useState<DocumentData[]>(
    []
  );
  const [showMoreInfo, setShowMoreInfo] = useState<DocumentData | null>(null);

  const menu = useRef<HTMLDivElement | null>(null);

  const variants = {
    initial: initial,
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const coll = query(collection(firestore, "avatar"), orderBy("createdAt"));
  useEffect(() => {
    const unsub = onSnapshot(coll, (doc) => {
      doc.docChanges().forEach(async (snapshot) => {
        let data = snapshot.doc.data();

        if (snapshot.type === "modified") {
          return;
        } else if (snapshot.type === "added") {
          data.id = snapshot.doc.id;
          setFirestoreDatabase((old) => [data, ...old]);
        }
      });
      setTimeout(() => {
        setInitial({ opacity: 0, x: -100 });
      }, 1);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showTime(time: Timestamp) {
    let data;
    if (time) {
      data = new Date(time.toDate());
    } else {
      data = new Date();
    }

    const currData = new Date();
    const formattedData =
      data.getDate().toString().padStart(2, "0") +
      "." +
      (data.getMonth() + 1).toString().padStart(2, "0") +
      "." +
      data.getFullYear() +
      " ";
    const formattedTime =
      data.getHours().toString().padStart(2, "0") +
      ":" +
      data.getMinutes().toString().padStart(2, "0");

    if (currData.getDate() - data.getDate() === 0) {
      return "Today " + formattedTime;
    } else if (currData.getDate() - data.getDate() === 1) {
      return "Yesterday " + formattedTime;
    } else {
      return formattedData + formattedTime;
    }
  }

  async function deleteDocuments(element: DocumentData, index: number) {
    const firestore = getFirestore();
    try {
      if (user.email === element.user) {
        const document = doc(firestore, "avatar", element.id);

        const deletedDoc = await deleteDoc(document);
        const newArr = [...firestoreDatabase];
        newArr.splice(index, 1);
        setFirestoreDatabase(newArr);
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (typeof document !== "undefined") {
    document.addEventListener("click", handleMenu, true);
  }

  function handleMenu(e: globalThis.MouseEvent) {
    if (showMoreInfo !== null && !menu.current?.contains(e.target as Node)) {
      setShowMoreInfo(null);
    }
  }

  return (
    <>
      <div className={styles["container"]}>
        {/* <button
          //   v-if="showNewElements"
          //   @click="showElements()"
          className={`${styles["new-posts"]}  ${styles["button"]}`}
        >
          Click me to show new Elements newPosts.length
        </button> */}
      </div>

      <section className={`${styles["section"]}`}>
        <ul>
          <AnimatePresence initial={false}>
            {firestoreDatabase.map((post, index) => (
              <motion.li
                key={post.id}
                initial={initial}
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.35 }}
                className={styles["posts"]}
              >
                <div className={styles["post"]}>
                  <div className={styles["user"]}>
                    {post.user}
                    <span className={styles["time"]}>
                      {" "}
                      {showTime(post.createdAt)}{" "}
                    </span>
                    {post.user === user.email && (
                      <>
                        <button
                          // v-if="userProfile.email === post.user"
                          // @click="showMoreInfo = post"
                          onClick={() => setShowMoreInfo(post)}
                          className={`${styles["show-more-button"]}`}
                        >
                          <IconInfo />
                        </button>
                        {showMoreInfo === post && (
                          <div
                            // v-if="showMoreInfo === post"
                            ref={menu}
                            className={styles["delete-menu"]}
                          >
                            <button
                              onClick={() => deleteDocuments(post, index)}
                              className={`${styles["delete-button"]}  ${styles["button"]}`}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {post.post}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </section>
    </>
  );
}
