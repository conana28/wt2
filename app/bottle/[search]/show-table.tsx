"use client";

import React, { createContext, useCallback, useState } from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { ShowCard } from "./show-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export type TBottle = {
  id: number;
  vintage: number;
  rack: string;
  shelf: string | null;
  cost: number | null;
  wine: { id: number; producer: string; wineName: string; country: string };
};

type Props = {
  btls: TBottle[];
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
};

type TFOContext = {
  show: string;
  setShow: (show: string) => void;
  bottle: TBottle;
  setBottle: (bottle: TBottle) => void;
};

export const BottleContext = createContext<TFOContext>({
  show: "",
  setShow: () => "",
  bottle: {
    id: 0,
    vintage: 1970,
    rack: "",
    shelf: null,
    cost: null,
    wine: {
      id: 0,
      producer: "",
      wineName: "",
      country: "",
    },
  },
  setBottle: () => {},
});

export default function ShowTable({ btls, setToggle, toggle }: Props) {
  // const showtable = ({ wines }: Props) => {
  // const [open, setOpen] = useState(false);

  // console.log("Show Table", btls);
  const [show, setShow] = useState("");
  const [bottle, setBottle] = useState<TBottle>({
    id: 0,
    vintage: 1970,
    rack: "",
    shelf: null,
    cost: null,
    wine: {
      id: 0,
      producer: "",
      wineName: "",
      country: "",
    },
  });

  const [selectedData, setSelectedData] = useState<TBottle[]>([]);

  const handleChange = useCallback((data: TBottle[]) => {
    setSelectedData(data);
  }, []);
  //  btls.length < 4 ? 80 : 220
  // className={`h-[${
  //   true ? 80 : 220
  // }px] rounded-md border border-red-400`}

  return (
    <BottleContext.Provider value={{ show, setShow, bottle, setBottle }}>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-1/2">
          <ScrollArea className="h-[280px] rounded-md border border-purple-100">
            <DataTable
              columns={columns}
              data={btls}
              onSelectedRowsChange={handleChange}
            />
          </ScrollArea>
        </div>
        {show === "E" && (
          <div className="w-full md:w-1/2">
            {selectedData.map((bottle) => `${bottle.id}  ${bottle.rack} , `)}
            <ShowCard
              formType={show}
              id={bottle.id}
              btlSelect={selectedData}
              setToggle={setToggle}
              toggle={toggle}
            />
          </div>
        )}
        {show === "A" && (
          <div className="w-1/2">
            <ShowCard
              formType={show}
              id={bottle.wine.id}
              btlSelect={selectedData}
              setToggle={setToggle}
              toggle={toggle}
            />
          </div>
        )}
        {show === "D" && (
          <div className="w-full md:w-1/2">
            <ShowCard
              formType={show}
              id={bottle.id}
              btlSelect={selectedData}
              setToggle={setToggle}
              toggle={toggle}
            />
          </div>
        )}
        {show === "C" && (
          <div className="w-full md:w-1/2 pt:6 md:mt-0">
            <ShowCard
              formType={show}
              id={bottle.id}
              btlSelect={selectedData}
              setToggle={setToggle}
              toggle={toggle}
            />
          </div>
        )}
      </div>
    </BottleContext.Provider>
  );
}
// export default showtable;
