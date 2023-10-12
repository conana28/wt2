"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    // Perform search with searchTerm
    // console.log(`Searching for "${searchTerm}"...`);
    router.push(`/testp/${searchTerm}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <span className="flex">
      <Input
        type="search"
        placeholder="Wine search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button variant="outline" size="icon" onClick={handleSearch}>
        <SearchIcon />
      </Button>
    </span>
  );
};

export default Search;
