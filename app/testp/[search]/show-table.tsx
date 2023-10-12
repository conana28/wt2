"use client";

import React, { createContext, useState } from "react";
import { DataTable } from "../../../components/ui/data-table";
import { WineData, columns } from "./columns";
import { ShowCard } from "./show-card";
import DeleteCard from "./delete-card";

type Props = {
  wines: WineData[];
};

type TFOContext = {
  show: string;
  setShow: (show: string) => void;
  wine: WineData;
  setWine: (wine: WineData) => void;
};

export const Context = createContext<TFOContext>({
  show: "",
  setShow: () => "",
  wine: {
    id: 0,
    producer: "",
    wineName: "",
    country: "",
    region: "",
    subRegion: "",
    type: "",
    bottle: [],
  },
  setWine: () => {},
});

export default function ShowTable({ wines }: Props) {
  // const showtable = ({ wines }: Props) => {
  // const [open, setOpen] = useState(false);
  const [show, setShow] = useState("");
  const [wine, setWine] = useState<WineData>({
    id: 0,
    producer: "",
    wineName: "",
    country: "",
    region: "",
    subRegion: "",
    type: "",
    bottle: [],
  });

  return (
    <Context.Provider value={{ show, setShow, wine, setWine }}>
      <div className="flex flex-row gap-2">
        <div className="w-1/2">
          <DataTable columns={columns} data={wines} />
        </div>
        {show !== "" && (
          <div className="w-1/2">
            <ShowCard formType={show} id={wine.id} />
          </div>
        )}

        {/* {show === "D" && (
          <div className="w-1/2">
            <ShowCard formType="D" id={wine.id} />
          </div>
        )} */}
      </div>
    </Context.Provider>
  );
}
// export default showtable;
