"use client";

import { Loading } from "@/components/loading";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface Entry {
  id: string;
  prompt: string;
  content: string;
  color: string;
  createdAt: string;
}

export default function EntriesPage() {

  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [entryLoad, setEntryLoad] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const session = useSession();

  const router = useRouter();
  

  useEffect(() => {
    if (session.status === "unauthenticated" || !session) {
      router.push("/signin");
    }
  }, [session, router]);


  const lastEntryRef = useCallback(
    (node: null) => {
      if (entryLoad || !hasMore) return;
  
      if (observer.current) observer.current.disconnect();
  
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setEntryLoad(true); 
            setPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1.0 }
      );
  
      if (node) observer.current.observe(node);
    },
    [entryLoad, hasMore]
  );




  useEffect(() => {
    let isMounted = true;
  
    const fetchEntries = async () => {
      try {
        if(page == 1){
          setLoading(true);
        }
        setEntryLoad(true);
        const res = await fetch(`/api/entries?page=${page}`);
  
        if (!res.ok) throw new Error("Failed to fetch entries.");
  
        const data = await res.json();
  
        if (isMounted) {
          setEntries((prev) => [...prev, ...data.res]);
          setHasMore(data.res.length > 0);
        }
      } catch (e) {
        console.error("Error fetching entries:", e);
      } finally {
        if (isMounted) {
          setEntryLoad(false);
          setLoading(false);
        }
        
      }
    };
  
    fetchEntries();
  
    return () => {
      isMounted = false;
    };
  }, [page]);



  if (loading) return <Loading/>;
  return (<div className="bg-white min-h-screen">
    <div>
      <nav className="bg-amber-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            className="h-10 w-10"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap font-sans">
            Gratitude
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white rounded-sm md:bg-transparent md:text-amber-500 md:p-0 font-sans"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/create"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-amber-500 md:hover:bg-transparent md:border-0 md:hover:text-amber-500 md:p-0 font-sans"
              >
                Create
              </a>
            </li>
            <li>
              <a
                onClick={()=>{
                  signOut();
                }}
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-amber-500 md:hover:bg-transparent md:border-0 md:hover:text-amber-500 md:p-0 font-sans"
              >
                Logout
              </a>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
    </div>
    <div>

      {entries.length === 0 ? (
        <p>Write an entry.</p>
      ) : (
        <div>
    {entries.map((entry, index) => (
      <div
        key={entry.id}
        ref={index === entries.length - 1 ? lastEntryRef : null}
        onClick={() => router.push(`/entries/${entry.id}`)}
        className={"text-amber-50 overflow-y-auto rounded-[1.6vw] font-sans m-4 p-4 "+ entry.color}
      >
        <h2 className="font-semibold">{entry.prompt.slice(0, 60)+ "..."}</h2>
        <p className="break-words">{entry.content.slice(0, 120)+"..."}</p>
        <small>{new Date(entry.createdAt).toLocaleString()}</small>
      </div>
    ))}
    {entryLoad && <p>Loading more...</p>}
  </div>
      )}
    </div>
    </div>
  );
}
