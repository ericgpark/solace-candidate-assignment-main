import db from "../../../db";
import { advocates } from "../../../db/schema";
import type { Advocate } from "../../types/index";


export async function GET() {
  try {
    // Fetch advocates from the database
    const dbData = await db.select().from(advocates);

    if (!dbData || dbData.length === 0) {
      return Response.json({ error: "No advocates found" }, { status: 404 });
    }

    // Map the database data to the Advocate type
    const data: Advocate[] = dbData.map((advocate) => ({
      ...advocate,
      specialties: Array.isArray(advocate.specialties) ? advocate.specialties as string[] : [],
      createdAt: advocate.createdAt ? advocate.createdAt.toISOString() : undefined,
    }));

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
