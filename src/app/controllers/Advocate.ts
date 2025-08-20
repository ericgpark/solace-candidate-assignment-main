import { Advocate } from "../types";

export const getAdvocates = async (): Promise<Advocate[]> => {
  const response = await fetch("/api/advocates");
  if (!response.ok) {
    throw new Error("Network response error");
  }
  const jsonResponse = await response.json();
  return jsonResponse.data;
};
