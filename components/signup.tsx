'use client'

import Image from "next/image"
import Link from "next/link";
import { useState } from "react"

export default function SignUp () {
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [msg, setMsg] = useState('');
    const [showMsg, setShowMsg] = useState(false);

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
                        <h1 className="text-4xl font-bold font-sans text-center">SignUp</h1>
                        {(showMsg)?<p className="font-bold text-sm p-4 text-red-600">{msg}</p>:<p></p>}
                        <label className="flex flex-col font-sans font-md mb-2 text-md font-md">
                                Name:
                                <input type="text" placeholder="  jhon Doe" className="border border-1 border-slate-900 rounded p-2 bg-amber-50"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}/>
                            </label>
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
                            onClick={async () => {
                                const res = await fetch('/api/signup', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      name: name,
                                      email: email,
                                      password: password,
                                    }),
                                  });
                              
                                  const data = await res.json();

                                setMsg(data.message);
                                setShowMsg(true);
                                setTimeout(()=>{
                                    setShowMsg(false);
                                },1500);
                            }}
                            >Sign Up</button>
                        <p className="text-slate-500 mt-2">already have an account? <Link className="underline" href={"/signin"}>Signin</Link></p>
                    </div>
                </div>
                
            <div/>
        </div>
    </div>
    )
}