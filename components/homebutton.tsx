'use client'
import { redirect } from "next/navigation"

export function HomeButton() {
    return<div className="flex flex-col items-center">
        <button className="bg-red-500 text-white text-xl font-semibold py-2 px-4 rounded w-sm max-w-screen m-2"
        onClick={()=>{redirect("/signup")}}>Get Started</button>
        <button className="bg-slate-400 text-white text-xl font-semibold py-2 px-4 rounded w-sm max-w-screen m-2"
        onClick={()=>{redirect("/signin")}}>I am an Existing User</button>
    </div>
}
