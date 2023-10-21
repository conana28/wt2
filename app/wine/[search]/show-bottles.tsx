"use client";

import React, { useContext, useState } from "react";

import { Context } from "./show-table";
import { Button } from "@/components/ui/button";
import { Bottle } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WineData } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { BottleMaintainForm } from "./bottle-maintain-form";

type Props = {
  wine: WineData;
};

const ShowBottles = ({ wine }: Props) => {
  const { setShow } = useContext(Context);
  console.log("Wine passed ", wine);

  if (wine.bottle.length < 1) {
    return (
      <div>
        <div className="text-primary ">There are no bottles of this wine</div>
        <div className="flex justify-end">
          <Button variant="secondary" size="xs" onClick={() => setShow("")}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
  const [openDialog, setOpenDialog] = useState(false);
  const [bottle, setBottle] = useState<Bottle | null>(null); // wine.bottle[0
  const showMenu = (b: Bottle) => {
    console.log("Show Menu", b);
    setBottle(b);
    setOpenDialog(true);
  };

  //  Type assertion (wine.bottle as Bottle[]) to explicitly tell TypeScript that you
  // are certain that wine.bottle will always be an array of Bottle objects.
  return (
    <>
      {wine.bottle.length > 4 ? (
        <ScrollArea className="h-56 lg:h-80 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Vintage</TableHead>
                <TableHead>Rack</TableHead>
                <TableHead>Shelf</TableHead>
                <TableHead>Id</TableHead>
                <TableHead className="text-right">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(wine.bottle as Bottle[]).map((bottle) => (
                <TableRow key={bottle.id} onClick={() => showMenu(bottle)}>
                  <TableCell className="font-medium">
                    {bottle.vintage}
                  </TableCell>
                  <TableCell>{bottle.rack}</TableCell>
                  <TableCell>{bottle.shelf}</TableCell>
                  <TableCell>{bottle.id}</TableCell>
                  <TableCell className="text-right">
                    {bottle.cost ? (bottle.cost / 100).toFixed(2) : "n/a"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Vintage</TableHead>
              <TableHead>Rack</TableHead>
              <TableHead>Shelf</TableHead>
              <TableHead>Id</TableHead>
              <TableHead className="text-right">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(wine.bottle as Bottle[]).map((bottle) => (
              <TableRow key={bottle.id} onClick={() => showMenu(bottle)}>
                <TableCell className="font-medium">{bottle.vintage}</TableCell>
                <TableCell>{bottle.rack}</TableCell>
                <TableCell>{bottle.shelf}</TableCell>
                <TableCell>{bottle.id}</TableCell>
                <TableCell className="text-right">
                  {bottle.cost ? (bottle.cost / 100).toFixed(2) : "n/a"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="flex items-center justify-end space-x-4 mt-4">
        <Button size="xs" variant="default" onClick={() => setShow("")}>
          Cancel
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Share</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Maintain bottle id:{bottle?.id}</DialogTitle>
            {/* <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription> */}
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <BottleMaintainForm btl={bottle} setOpenDialog={setOpenDialog} />
          </div>
          {/* <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShowBottles;
