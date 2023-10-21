"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import { BottleSearchForm, BottleSearchValues } from "./bottle-search-form";
import ShowTable, { TBottle } from "./show-table";
import { searchBottles } from "@/app/actions_bottle";

export default function BottleSearchPage() {
  const [btls, setBtls] = useState<Array<TBottle>>([]); // Bottles to display in table
  const [toggle, setToggle] = useState(false); // Toggle to force rerender of table
  const [searchFields, setSearchFields] = useState<BottleSearchValues>({
    // Search fields for query
    search: "",
    vintage: 0,
    country: "",
    rack: "",
  });

  // console.log("searchFields", searchFields);

  useEffect(() => {
    const srchBtls = async () => {
      const btls1 = await searchBottles({
        search: searchFields.search,
        vintage: searchFields.vintage,
        country: searchFields.country,
        rack: searchFields.rack,
      });
      console.error("Bottles1", btls1);

      // const mappedBtls = btls1?.bottles?.map((bottle) => ({
      //   id: bottle.id,
      //   vintage: bottle.vintage,
      //   rack: bottle.rack,
      //   shelf: bottle.shelf,
      //   cost: bottle.cost,
      //   // consume: null,
      //   // occasion: null,
      //   // createdAt: new Date(),
      //   // updatedAt: new Date(),
      //   // wineId: bottle.wine.id,
      //   wine: {
      //     id: bottle.wine.id,
      //     wineName: bottle.wine.wineName,
      //     producer: bottle.wine.producer,
      //     country: bottle.wine.country,
      //   },
      // }));
      // setBtls(mappedBtls || []);
      setBtls(btls1?.bottles || []);
    };

    if (
      searchFields.search === "" &&
      searchFields.vintage === 0 &&
      searchFields.rack === "" &&
      searchFields.country === ""
    ) {
      console.log("No search fields");
    } else {
      srchBtls();
    }
  }, [searchFields, toggle]);

  return (
    <Container>
      <div className="p-4  sm:p-6 lg:p-8 ">
        <h1 className="text-xl font-bold">Bottle Search</h1>
        <div className="mt-4 ">
          {btls.length === 0 && (
            <BottleSearchForm
              setBtls={setBtls}
              setSearchFields={setSearchFields}
            />
          )}
          {btls.length > 0 && (
            <ShowTable btls={btls} setToggle={setToggle} toggle={toggle} />
          )}
        </div>
      </div>
    </Container>
  );
}
