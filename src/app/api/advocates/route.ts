import type { NextApiResponse } from "next";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import type { Advocate } from "../../types/index";


export async function GET(
  res: NextApiResponse<Advocate[] | { error: string }>
) {
  // Fetch advocates from the database
  const dbData = await db.select().from(advocates);

  if (!dbData || dbData.length === 0) {
    return res.status(404).json({ error: "No advocates found" });
  }

  // Map the database data to the Advocate type
  const data: Advocate[] = dbData.map((advocate) => ({
    ...advocate,
    specialties: Array.isArray(advocate.specialties) ? advocate.specialties as string[] : [],
    createdAt: advocate.createdAt ? advocate.createdAt.toISOString() : undefined,
  }));

  return res.status(200).json(data);
}
