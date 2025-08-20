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
    <main>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={handleSearchInput} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, i) => (
                    <div key={i}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
