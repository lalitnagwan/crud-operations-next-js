"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePage() {
  const [formData, setFormData] = useState({ name: "", detail: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.detail) {
      setError("Please fill the field");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/interpritation", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create the document");
      }

      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Error in creating a document");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-bold my-8 py-2 px-4 text-2xl">Create Bill</h3>
      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <input
          placeholder="Company Name"
          name="name"
          value={formData.name}
          type="text"
          className="py-2 px-4 border rounded-md"
          onChange={handleInputChange}
        />
        <textarea
          name="detail"
          value={formData.detail}
          rows={4}
          placeholder="Enter details here"
          className="py-2 px-4 border rounded-md"
          onChange={handleInputChange}
        ></textarea>
        <button
          className="bg-black py-2 px-4 my-4 text-white"
          type="Submit"
          disabled={isLoading}
        >
          {isLoading ? "Adding Document..." : "Add Document"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
