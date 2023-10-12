"use client";

import { DataTable } from "@/components/ui/data-table";
import React, { createContext, useCallback, useState } from "react";
import { columns } from "./columns";
import { ShowCard } from "./show-card";
// import { DataTable } from "./data-table";
// import { WineData, columns } from "./columns";
// import { ShowCard } from "./show-card";
// import DeleteCard from "./delete-card";

export type TBottle = {
  id: number;
  vintage: number;
  rack: string;
  shelf: string | null;
  cost: number | null;
  wine: { id: number; producer: string; wineName: string };
};

type Props = {
  btls: TBottle[];
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
    },
  },
  setBottle: () => {},
});

export default function ShowTable({ btls }: Props) {
  // const showtable = ({ wines }: Props) => {
  // const [open, setOpen] = useState(false);
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
    },
  });

  // const [selectedData, setSelectedData] = useState<TBottle[]>([]);
  //
  // const handleChange = useCallback((data: TBottle[]) => {
  //   setSelectedData(data);
  // }, []);

  return (
    <BottleContext.Provider value={{ show, setShow, bottle, setBottle }}>
      <div className="flex flex-row gap-2">
        <div className="w-1/2">
          <DataTable columns={columns} data={btls} />
        </div>
        {show === "E" && (
          <div className="w-1/2">
            <ShowCard formType={show} id={bottle.id} />
          </div>
        )}
        {show === "A" && (
          <div className="w-1/2">
            <ShowCard formType={show} id={bottle.wine.id} />
          </div>
        )}
      </div>
    </BottleContext.Provider>
  );
}
// export default showtable;
