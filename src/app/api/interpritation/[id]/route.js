import { NextResponse } from "next/server";
import client from "../../../../../lib/appwrite_client";
import { Databases } from "appwrite";

const database = new Databases(client);

// Fetch a specific document
async function fetchInterpritations(id) {
  try {
    const interpritation = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      "66a39a760011767e4fc4",
      id
    );
    return interpritation;
  } catch (error) {
    console.log(error, "Error in fetching document");
  }
}

// Delete a specific document
async function deleteDocument(id) {
  try {
    const response = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      "66a39a760011767e4fc4",
      id
    );
    return response;
  } catch (error) {
    console.log(error, "Error in Deleting a document");
  }
}

// Update a specific Document
async function updateDocument(id, data) {
  try {
    const response = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      "66a39a760011767e4fc4",
      id,
      data
    );
    return response;
  } catch (error) {
    console.log(error, "Error in Updating the Document");
  }
}

// Update the Document
export async function GET(req, { params }) {
  try {
    const id = params.id;
    const interpritation = await fetchInterpritations(id);
    return NextResponse.json({ interpritation });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch the document" },
      { status: 500 }
    );
  }
}

export async function DELETE(id, { params }) {
  try {
    const id = params.id;
    await deleteDocument(id);
    return NextResponse.json({ message: "Document deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Not Deleted" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const id = params.id;
    const interpritation = await req.json();
    await updateDocument(id, interpritation);
    return NextResponse.json({ message: "Document Updated" });
  } catch (error) {
    return NextResponse.json({ error: "Updation Failed" }, { status: 500 });
  }
}
