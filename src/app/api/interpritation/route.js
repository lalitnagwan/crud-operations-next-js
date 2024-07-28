import { Databases, ID, Query } from "appwrite";
import client from "../../../../lib/appwrite_client";
import { NextResponse } from "next/server";

const database = new Databases(client);

// Create Interpritations
async function createInterpritations(data) {
  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      "66a39a760011767e4fc4",
      ID.unique(),
      data
    );

    return response;
  } catch (error) {
    console.log("Error creating Interpritation", error);
    // throw new Error("Creation Failed");
  }
}

// Fetch Interpritations
async function fetchInterpritations() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      "66a39a760011767e4fc4",
      [Query.orderDesc("$createdAt")]
    );

    return response.documents;
  } catch (error) {
    console.error("Error fetching Interpritation", error);
    throw new Error("Fetching Failed");
  }
}

// Create document to the Collection
export async function POST(req) {
  try {
    const { name, detail } = await req.json();
    const data = { name, detail };
    const response = createInterpritations(data);
    return NextResponse.json({ message: "Interpritation Created" });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// Get data from Collection
export async function GET() {
  try {
    const interpritation = await fetchInterpritations();
    return NextResponse.json(interpritation);
  } catch (error) {
    return NextResponse.json({ error: "Failed fetching" }, { status: 500 });
  }
}
