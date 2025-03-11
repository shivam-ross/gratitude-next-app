'use client'

import { signIn } from "next-auth/react";
import Image from "next/image"
import Link from "next/link";
import { useState } from "react"


export default function SignIn () {
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');

        const handleSubmit = async () => {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false, // Prevents automatic redirect
        });
    
        if (result?.error) {
          console.error('Sign-in error:', result.error);
          // Handle error (e.g., display error message)
        } else {
          console.log("Sign-in Success")
          //handle success
        }
      };

    return(
        <div className="lg:grid lg:grid-cols-2 bg-amber-50">
            <div className="hidden lg:block h-screen">
                <div className="flex flex-col items-center justify-center h-full">
                    <Image src={"/scene.png"}
                        height={700}
                        width={700}
                        alt="scene"
                        className="w-[dvw] h-md"/>
                </div>
            </div>
            <div className="h-screen">
                <div className="flex flex-col items-center justify-center h-full">
                    <div>
                        <h1 className="text-4xl font-bold font-sans text-center">SignIn</h1>
                        <form className="mt-4">
                            <label className="flex flex-col font-sans font-md mb-2 text-md font-md">
                                Email:
                                <input type="text" placeholder="  abc@mail.com" className="border border-1 border-slate-900 rounded p-2 bg-amber-50"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}/>
                            </label>
                            <label className="flex flex-col font-sans font-md mb-2 text-md font-md">
                                Password:
                                <input type="text" placeholder="  ******" className="border border-1 border-slate-900 rounded p-2 bg-amber-50"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}/>
                            </label>
                            <button className="bg-red-500 py-2 px-4 mt-2 text-white rounded-lg text-center font-semibold w-full text-md"
                            onClick={handleSubmit}
                            >Sign In</button>
                        </form>
                        <h3 className="text-2xl font-sans font-semibold text-center m-2">Or</h3>
                        <button className="text-red-500 py-2 px-4 mt-2 rounded-lg text-center font-semibold w-full text-md border border-2 border-red-500"
                        onClick={() => {
                            signIn("google");
                        }}
                        >Sign in with Google</button>
                        <p className="text-slate-500 mt-2">don&apos;t have an account? <Link className="underline" href={"/signup"}>Signup</Link></p>
                    </div>
                </div>
                
            <div/>
        </div>
    </div>
    )
}
