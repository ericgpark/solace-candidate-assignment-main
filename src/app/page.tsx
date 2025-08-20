"use client";

import { useEffect, useState } from "react";
import { Advocate } from "./types";
import { debounce } from "./helpers/debounce";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    // To do: use dedicate API file and call once (currently called twice)
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const filterAdvocates = ({ searchTerm, advocates }: { searchTerm: string, advocates: Advocate[] }) => {
    console.log("filtering advocates...");
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
        advocate.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
        advocate.city.toLowerCase().includes(lowerCaseSearchTerm) ||
        advocate.degree.toLowerCase().includes(lowerCaseSearchTerm) ||
        advocate.yearsOfExperience.toString().includes(lowerCaseSearchTerm) ||
        advocate.phoneNumber.toString().includes(lowerCaseSearchTerm) ||
        advocate.specialties.find((specialty) => specialty.toLowerCase().includes(lowerCaseSearchTerm))
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  }

  const debouncedFilter = debounce(filterAdvocates);


  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    // Update search term display
    const searchTermElement = document.getElementById("search-term");
    if (searchTermElement) {
      searchTermElement.innerHTML = searchTerm;
    }
    
    if (!searchTerm) { // No search term means there is no need to filter
      setFilteredAdvocates(advocates);
      return;
    }

    // Debounce the filtering function to avoid excessive calls
    debouncedFilter({ searchTerm, advocates });
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="mx-auto my-24 max-w-[1264px] rounded-2xl p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Solace Advocates</h1>
      <div className="mb-8 flex flex-col gap-2 max-w-md">
      <label htmlFor="search" className="font-medium text-gray-700">Search</label>
      <div className="text-sm text-gray-600">
        Searching for: <span id="search-term" className="font-semibold text-blue-700"></span>
      </div>
      <input
        id="search"
        className="border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={handleSearchInput}
        placeholder="Type to search advocates..."
      />
      <button
        onClick={onClick}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Reset Search
      </button>
      </div>
      <div className="overflow-x-auto">
      <table className="table-fixed w-full block bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="sticky top-0 bg-blue-600 text-white">
        <tr>
          <th className="w-[150px] px-4 py-3 text-left">First Name</th>
          <th className="w-[150px] px-4 py-3 text-left">Last Name</th>
              <th className="w-[125px] px-4 py-3 text-left">City</th>
              <th className="w-[125px] px-4 py-3 text-left">Degree</th>
              <th className="w-[400px] px-4 py-3 text-left">Specialties</th>
              <th className="w-[125px] px-4 py-3 text-left">Years of Experience</th>
              <th className="w-[125px]7 px-4 py-3 text-left">Phone Number</th>
        </tr>
        </thead>
        <tbody>
        {filteredAdvocates.map((advocate, idx) => (
          <tr
            key={advocate.id}
            className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
          >
          <td className="px-4 py-2 border-b">{advocate.firstName}</td>
          <td className="px-4 py-2 border-b">{advocate.lastName}</td>
          <td className="px-4 py-2 border-b">{advocate.city}</td>
          <td className="px-4 py-2 border-b">{advocate.degree}</td>
          <td className="px-4 py-2 border-b">
            <ul className="list-disc pl-4">
              {advocate.specialties.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </td>
          <td className="px-4 py-2 border-b">{advocate.yearsOfExperience}</td>
          <td className="px-4 py-2 border-b">{advocate.phoneNumber}</td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
    </main>
  );
}
