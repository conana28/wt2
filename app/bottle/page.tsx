"use client";
import { useState } from "react";

import Container from "@/components/ui/container";
import { BottleSearchForm } from "./bottle-search-form";
import ShowTable from "./[search]/show-table";

export default function BottleSearchPage() {
  const [btls, setBtls] = useState([]); //
  return (
    <Container>
      <div className="p-4  sm:p-6 lg:p-8 ">
        <h1 className="text-xl font-bold">Bottle Search</h1>
        <div className="mt-4 ">
          {btls.length === 0 && <BottleSearchForm setBtls={setBtls} />}
          {btls.length > 0 && <ShowTable btls={btls} />}
        </div>
      </div>
    </Container>
  );
}
