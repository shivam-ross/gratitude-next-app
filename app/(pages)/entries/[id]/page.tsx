"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loading } from "@/components/loading";
import { useSession } from "next-auth/react";

export default function EntryDetailsPage() {

  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('');
  const [editMode, setEditmode] = useState(false);
  const [deleting, setDeleting] =useState(false);
  const router = useRouter();
  const { id } = useParams(); 
  const session = useSession();


  useEffect(() => {
    if (session.status === "unauthenticated" || !session) {
      router.push("/signin");
    }
  }, [session, router]);

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/entries", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        if (res.status === 403) throw new Error("You must be logged in.");
        throw new Error("Failed to delete entry.");
      }

      router.push("/home");
      
    } catch (err) {
      console.log("error while updating"+ err)
    }
  };



  const handleSave = async () => {
    try {
      const res = await fetch("/api/entries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, content, color, id}),
      });

      if (!res.ok) {
        if (res.status === 403) throw new Error("You must be logged in.");
        throw new Error("Failed to create entry.");
      }

      setTimeout(() => router.push("/home"), 1000);
    } catch (err) {
      console.log("error while updating"+ err)
    }
  };


  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await fetch(`/api/entries/${id}`);
        if (!res.ok) throw new Error("Failed to fetch entry.");
        const data = await res.json();
        setPrompt(data.prompt);
        setContent(data.content);
        setColor(data.color);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEntry();
  }, [id]);

  if (loading) return <Loading />;

  return (<div>
    <div className={color+  " h-screen w-full p-6 text-white relative"}>
          <div className="flex justify-between items-center mb-4">
            <button className="text-red-500 bg-white font-semibold border border-2 border-red-500 p-2 rounded"
            onClick={()=> {
              if(editMode){
                setEditmode(false);
              } else {
                setDeleting(true);
              }
            }}
            >{(editMode? "Cancel" : "Delete")}</button>
            <button className={"text-white font-semibold"}
            onClick={()=> {
              if(editMode){
                handleSave();
              } else {
                setEditmode(true);
              }
            }}
            >{(editMode? "Save" : "Edit")}</button>
          </div>
    
          <input
      className="w-full text-2xl font-bold bg-transparent outline-none border-none text-white placeholder-white font-sans"
      value={prompt}
      readOnly={!editMode}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder="Write your own prompt..."
    />
    
          <textarea
            className="w-full h-[85%] mt-4 bg-transparent outline-none border-none text-lg leading-relaxed resize-none placeholder-white font-sans overflow-y-scrool"
            placeholder="Start writing..."
            value={content}
            readOnly={!editMode}
            onChange={(e) => setContent(e.target.value)}
            
          />
        </div>

        {deleting && (
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg text-black w-96">
      <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
      <p className="text-gray-600">This action cannot be undone.</p>
      <div className="flex justify-between mt-6">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded" // Call delete function
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded"
          onClick={() => setDeleting(false)} // Close modal
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


      </div>
  );
}
