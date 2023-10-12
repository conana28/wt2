"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { Bottle } from "@prisma/client";
import { useContext, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { BottleContext, TBottle } from "./show-table";

// import { Context } from "./show-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type WineData = {
//   id: number;
//   producer: string;
//   wineName: string;
//   country: string;
//   region: string;
//   subRegion: string | null;
//   type: string | null;
//   bottle: Array<Bottle | []>;
//   // bottle: Array<Bottle>;
// };

export const columns: ColumnDef<TBottle>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "producer",
  //   header: "Producer",
  // },
  // {
  //   accessorKey: "wineName",
  //   header: "Wine Name",
  // },
  {
    id: "name",
    header: "Wine",
    accessorFn: (row) =>
      `${row.vintage} ${row.wine.producer} ${row.wine.wineName}`,
  },
  // {
  //   accessorKey: "vintage",
  //   header: "Vintage",
  // },
  {
    accessorKey: "rack",
    header: "Rack",
  },
  {
    accessorKey: "shelf",
    header: "Shelf",
  },

  {
    id: "costzzz",
    header: "Cost",
    accessorFn: (row) => `${row.cost ? (row.cost / 100).toFixed(2) : ""}`,
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    // cell: ({ row }) => {
    cell: function Cell({ row }) {
      // console.log("Id: ", row);
      // const wine = row.original;
      const [open, setOpen] = useState(false);
      const { show, setShow, setBottle } = useContext(BottleContext);

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="float-right mr-2 h-8 w-8 p-0">
                {/* <span className="sr-only">Open menu</span> */}
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    // table.getFiteredSelectedRows().rows.length
                    setShow("E");
                    setBottle(row.original);
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                {/* <DropdownMenuItem onClick={() => setOpenAddModal(true)}> */}
                <DropdownMenuItem
                  onClick={() => {
                    setShow("A");
                    setBottle(row.original);
                  }}
                >
                  Add
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setShow("D");
                    setBottle(row.original);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>

              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setShow("C");
                    setBottle(row.original);
                  }}
                >
                  Consume
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={() => {
                    setShow("M");
                    setBottle(row.original);
                  }}
                >
                  Move
                </DropdownMenuItem>
              </DialogTrigger>

              {/* <DropdownMenuSeparator /> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
      );
    },
  },
];
