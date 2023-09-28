'use client'
import { useRouter } from "next/navigation";

export default function Square({value, navigateTo}:any){
    const router = useRouter();
    return (
  <button className="p-2 bg-blue-700" onClick={() => router.push(navigateTo)}>{value}</button>
    )
  }