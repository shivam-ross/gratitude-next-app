"use client";

import { useEffect, useState } from "react";
import { generatePrompt } from "@/app/actions/gereratePrompt";
import { Loading } from "@/components/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const colors = [
  "bg-amber-500",
  "bg-lime-500",
  "bg-sky-500",
  "bg-rose-500",
  "bg-pink-500",
  "bg-cyan-500",
  "bg-teal-500",
  "bg-emerald-500",
  "bg-fuchsia-500",
  "bg-violet-500",
];

export default function EntryPage() {
  const [color, setColor] = useState("");
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated" || !session) {
      router.push("/signin");
    }
  }, [session, router]);
  

  const handleSave = async () => {

    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, content, color}),
      });

      if (!res.ok) {
        if (res.status === 403) throw new Error("You must be logged in.");
        throw new Error("Failed to create entry.");
      }

      setTimeout(() => router.push("/home"), 1000);
    } catch (err) {
      console.log("error while creating"+ err)
    }
  };



  useEffect(() => {

    setColor(colors[Math.floor(Math.random() * colors.length)]);

    generatePrompt()
      .then((data) => setPrompt(data))
      .finally(() => setLoading(false));
  }, []);


  if (loading) return <Loading />;

  return (
    <div className={color + " h-screen w-full p-6 text-white relative"}>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm opacity-80">Today • {new Date().toLocaleDateString()}</p>
        <button className="text-white font-semibold"
        onClick={handleSave}>Save</button>
      </div>

      <input
  className="w-full text-2xl font-bold bg-transparent outline-none border-none text-white placeholder-white font-sans"
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  placeholder="Write your own prompt..."
/>

      <textarea
        className="w-full h-[85%] mt-4 bg-transparent outline-none border-none text-lg leading-relaxed resize-none placeholder-white font-sans overflow-y-scrool"
        placeholder="Start writing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
