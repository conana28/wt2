// "use client";

import { ColumnDef } from "@tanstack/react-table";

import { Bottle } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WineData = {
  id: number;
  producer: string;
  wineName: string;
  country: string;
  region: string;
  subRegion: string | null;
  type: string | null;
  bottle: Array<Bottle | undefined>;
  // bottle: Array<Bottle>;
};

export const columns: ColumnDef<WineData>[] = [
  {
    accessorKey: "producer",
    header: "Producer",
  },
  {
    accessorKey: "wineName",
    header: "Wine Name",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "bottle.length",
    header: "Bottles",
  },
  // {
  //   accessorKey: "bottle[0]",
  //   header: "Id",
  // },
];
