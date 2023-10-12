import React, { useContext } from "react";

import { Context } from "./show-table";
import { Button } from "@/components/ui/button";
import { WineData } from "@/app/testp/[search]/columns";
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

type Props = {
  wine: WineData;
};

const ShowBottles = ({ wine }: Props) => {
  const { setShow } = useContext(Context);
  console.log("Wine passed ", wine);

  if (wine.bottle.length < 1) {
    return (
      <div>
        <div className="text-red-500 text-2xl">
          There are no bottles for this wine
        </div>
        <div className="flex justify-end">
          <Button variant="secondary" size="xs" onClick={() => setShow("")}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  //  Type assertion (wine.bottle as Bottle[]) to explicitly tell TypeScript that you
  // are certain that wine.bottle will always be an array of Bottle objects.
  return (
    <>
      {/* <div className="text-red-500 text-2xl">Display Bottles </div> */}

      {/* <ScrollArea className="h-28 w-48 rounded-md border">
        <div className="p-4">
          {(wine.bottle as Bottle[]).map((bottle) => (
            <>
              <div key={bottle.id} className="text-sm">
                {bottle.vintage} {bottle.rack} - {bottle.shelf}{" "}
                {bottle.cost ? bottle.cost / 100 : "n/a"}
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea> */}

      {/* <ul>
        <ul>
          {(wine.bottle as Bottle[]).map((bottle) => (
            <li key={bottle.id}>
              {bottle.rack} {bottle.vintage} {bottle.shelf}{" "}
              {bottle.cost ? bottle.cost / 100 : "n/a"}
            </li>
          ))}
        </ul>
      </ul> */}

      {/* <ul>
          {wine.bottle.map((bottle, index) => (
            <li key={index}>
              {Array.isArray(bottle) ? "Empty Bottle" : bottle.rack} {}
              {Array.isArray(bottle) ? "Empty Bottle" : bottle.vintage}
            </li>
          ))}
        </ul> */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Vintage</TableHead>
            <TableHead>Rack</TableHead>
            <TableHead>Shelf</TableHead>
            <TableHead className="text-right">Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(wine.bottle as Bottle[]).map((bottle) => (
            <TableRow key={bottle.id}>
              <TableCell className="font-medium">{bottle.vintage}</TableCell>
              <TableCell>{bottle.rack}</TableCell>
              <TableCell>{bottle.shelf}</TableCell>
              <TableCell className="text-right">
                {bottle.cost ? (bottle.cost / 100).toFixed(2) : "n/a"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-4 mt-4">
        <Button size="xs" variant="default" onClick={() => setShow("")}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default ShowBottles;
