"use client";

import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import IconInfo from "./IconInfo";

export default function ShowPosts({ user, styles }: any) {
  const [firestoreDatabase, setFirestoreDatabase] = useState<any[]>([]);
  const arr: any = [];
  const firestore = getFirestore();
  const coll = query(collection(firestore, "avatar"), orderBy("createdAt"));
  useEffect(() => {
    const pushArr: any = [];
    const unsub = onSnapshot(coll, (doc) => {
      doc.docChanges().forEach(async (snapshot) => {
        let data = snapshot.doc.data();

        if (snapshot.type === "modified") {
          // setFirestoreDatabase((old) => [data, ...old]);
          return;
        } else if (snapshot.type === "added") {
          data.id = snapshot.doc.id;
          console.log("chage");
          arr.push(data);
          setFirestoreDatabase((old) => [data, ...old]);
        } else {
          // newArr.splice(indexToDelete, 1);
          // setFirestoreDatabase(newArr);
        }
      });
    });
    console.log(firestoreDatabase);
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

  async function deleteDocuments(element: any, index: any) {
    console.log(element);
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

  return (
    <>
      <div className={styles["container"]}>
        <button
          //   v-if="showNewElements"
          //   @click="showElements()"
          className={`${styles["new-posts"]}  ${styles["button"]}`}
        >
          Click me to show new Elements newPosts.length
        </button>
      </div>
      <section className={`${styles["section"]}`}>
        {firestoreDatabase.map((post, index) => (
          <div
            key={index}
            // v-for="post in firestoreDatabase"
            // :key="post.id"
            className={styles["posts"]}
          >
            <div className={styles["post"]}>
              <div className={styles["user"]}>
                {post.user}
                <span className={styles["time"]}>
                  {" "}
                  {showTime(post.createdAt)}{" "}
                </span>
              </div>
              {post.post}
              <button
                // v-if="userProfile.email === post.user"
                // @click="showMoreInfo = post"
                className={`${styles["show-more-button"]}`}
              >
                <IconInfo />
              </button>
              <div
                // v-if="showMoreInfo === post"
                // ref="menu"
                className={styles["delete-menu"]}
              >
                <button
                  onClick={() => deleteDocuments(post, index)}
                  className={`${styles["delete-button"]}  ${styles["button"]}`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
