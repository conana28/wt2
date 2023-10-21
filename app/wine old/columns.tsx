// "use client";

import { ColumnDef } from "@tanstack/react-table";

import { Bottle } from "@prisma/client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

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
  bottle: Array<Bottle | []>;
  // bottle: Array<Bottle>;
};

export const columns: ColumnDef<WineData>[] = [
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
    accessorFn: (row) => `${row.producer} ${row.wineName}`,
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "bottle.length",
    header: "Bottles",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    // cell: ({ row }) => {
    cell: function Cell({ row }) {
      // console.log("Id: ", row);
      // const wine = row.original;
      const [open, setOpen] = useState(false);
      const [openEditModal, setOpenEditModal] = useState(false);
      const [openAddModal, setOpenAddModal] = useState(false);
      const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
                <DropdownMenuItem onClick={() => setOpenEditModal(true)}>
                  Edit
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setOpenAddModal(true)}>
                  Add
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setOpenDeleteModal(true)}>
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
              {/* <DialogTrigger asChild>
                <DropdownMenuItem onClick={() => setWhichDialog("view")}>
                  View wine details
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  // onClick={() => navigator.clipboard.writeText(payment.id)}
                  onClick={() => setWhichDialog("")}
                >
                  Clip
                </DropdownMenuItem>
              </DialogTrigger> */}
              {/* <DropdownMenuSeparator /> */}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* {open && openEditModal && (
            <EditWineModal
              isOpen={openEditModal}
              onClose={() => setOpenEditModal(false)}
              wine={row.original}
            />
          )} */}

          {/* {open && openAddModal && (
            <AddWineModal
              isOpen={openAddModal}
              onClose={() => setOpenAddModal(false)}
              wine={row.original}
            />
          )} */}

          {/* {open && openDeleteModal && (
            <DeleteWineModal
              isOpen={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              wine={row.original}
            />
          )} */}
        </Dialog>
      );
    },
  },

  // {
  //   accessorKey: "bottle[0].cost",
  //   header: "Id",
  // },
];