"use client"

import { signing } from "@/server/getFirebase";
import {useRouter} from "next/navigation";


export default function SignIn(){
    const router = useRouter();
    async function Sign(){

        const creds = await signing();
        const id = await creds.getIdToken();
        await fetch("/api/setCookie",{method:"POST",body:JSON.stringify(id)});
        const isLoggedIn = await fetch("/api/getCookie",{method:"POST",body:JSON.stringify(id)})
        console.log(isLoggedIn)
        router.push("/browse")
        }
   return  <button onClick={()=>Sign()}>Set reverse</button>
}