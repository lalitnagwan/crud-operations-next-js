"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPage({ params }) {
  const [formData, setFormData] = useState({ name: "", detail: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/interpritation/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        const data = await response.json();
        // console.log(data);
        setFormData({
          name: data.interpritation.name,
          detail: data.interpritation.detail,
        });
      } catch (error) {
        setError("Failed to load a particular document");
      }
    };
    fetchData();
  }, []);

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
      const response = await fetch(`/api/interpritation/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update the document");
      }

      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Error in updating a document");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-bold my-8 py-2 px-4 text-2xl">Update Bill</h3>
      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <input
          placeholder="Company Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          className="py-2 px-4 border rounded-md"
        />
        <textarea
          name="name"
          rows={4}
          value={formData.detail}
          onChange={handleInputChange}
          placeholder="Enter details here"
          className="py-2 px-4 border rounded-md"
        ></textarea>
        <button className="bg-black py-2 px-4 my-4 text-white cursor-pointer">
          {isLoading ? "Updating Document..." : "Update Document"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
