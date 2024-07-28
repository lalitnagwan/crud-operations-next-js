"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [document, setDocument] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/interpritation");
        if (!response.ok) {
          throw new Error("Failed to fetch the document");
        }
        const data = await response.json();
        setDocument(data);
      } catch (error) {
        console.log(error, "Error in fetchDocument in page.js");
        setError("Failed to load document");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocument();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/interpritation/${id}`, { method: "DELETE" });
      setDocument((prevDocument) => prevDocument.filter((i) => i.$id !== id));
    } catch (error) {
      setError("Failed to Delete the Document. Error in handleDelete");
    }
  };
  return (
    <div>
      {error && <p className="py-4 text-red-500">{error}</p>}
      {isLoading ? (
        <p>Loading Documents...</p>
      ) : (
        <>
          {document.map((doc) => (
            <div key={doc.$id} className="p-4 my-2 border-b leading-8">
              <div className="font-bold">{doc.name}</div>
              <div>{doc.detail}</div>
              <div className="flex gap-4 justify-end ">
                <Link
                  className="bg-slate-400 py-2 px-4 rounded-full font-bold shadow-md uppercase tracking-widest"
                  href={`/edit/${doc.$id}`}
                >
                  Edit
                </Link>
                <Link
                  onClick={() => handleDelete(doc.$id)}
                  className="bg-red-500 py-2 px-4 rounded-full font-bold shadow-md uppercase tracking-widest"
                  href={"/"}
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// className="flex min-h-screen flex-col items-center justify-between p-24"
