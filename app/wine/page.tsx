import React from "react";
import { getWines } from "@/lib/wine";
import Container from "@/components/ui/container";

export default async function Wine() {
  const { wines } = await getWines();
  // console.log(wines);

  return (
    <>
      <Container>
        <div className="p-4 sm:p-6 lg:p-8 ">
          <h2 className="mt-2 border-b pb-2 text-xl font-semibold">Wines:</h2>
          <ul className="mt-4 flex flex-col gap-1">
            {wines?.map((wine) => (
              <li key={wine.id}>
                {wine.producer} {wine.wineName} {wine.bottle.length}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
