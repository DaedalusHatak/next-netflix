"use client"

import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";



export default function ShowPosts({ styles }: any) {
    const [firestoreDatabase,setFirestoreDatabase] = useState<any[]>([])
    

   
useEffect(()=>{
    const firestore = getFirestore();
    const coll = query(collection(firestore, "avatar"), orderBy("createdAt"));
    const pushArr :any = []
    const unsub = onSnapshot(coll, (doc) => {
        const arr: any = [];
      doc.docChanges().forEach(async (snapshot) => {
        let data = snapshot.doc.data();
       
        if (snapshot.type === "modified") {
           pushArr.push(data)     
           setFirestoreDatabase([...firestoreDatabase, pushArr])     
        } else if (snapshot.type === "added") {
           arr.push(data)
          setFirestoreDatabase(e => [...e,data])
        } 
      });
    
      
    });
})
    


  return (
   <>
<div className="container">
    <button
    //   v-if="showNewElements"
    //   @click="showElements()"
      className="new-posts"
    >
      Click me to show new Elements  newPosts.length 
    </button>
  </div>
  <section>

{firestoreDatabase.map((post,index) => (
          <div
          key={index}
          // v-for="post in firestoreDatabase"
          // :key="post.id"
          className="posts"
        >
          <div className="post">
            <div className="user">
               {post.user}
              <span className="time"> showTime(post.createdAt) </span>
            </div>
            {post.post}
            <button
              // v-if="userProfile.email === post.user"
              // @click="showMoreInfo = post"
              className="show-more-button"
            >
              {/* <IconInfo /> */}
            </button>
            <div
              // v-if="showMoreInfo === post"
              // ref="menu"
              className="delete-menu"
            >
              <button
              //   @click="deleteDocuments(post)"
                className="delete-button"
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
