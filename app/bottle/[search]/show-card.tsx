"use client";

import { useContext } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BottleContext } from "./show-table";
import { BottleForm } from "./bottle-form";
// import { WineForm } from "./wine-form";
// import { BottleForm } from "./bottle-form";
// import DeleteCard from "./delete-card";
// import ShowBottles from "./show-bottles";

interface CharacterDisplayProps {
  formType: string;
  id: number;
}

export function ShowCard({ formType, id }: CharacterDisplayProps) {
  // if A id = wineId
  // if E or D id = bottleId
  console.log("Show BottleCard: ", formType, id);
  const { bottle } = useContext(BottleContext);
  let title = "";
  switch (formType) {
    case "M":
      title = "Move";
      break;
    case "E":
      title = "Edit";
      break;
    case "C":
      title = "Consume";
      break;
    case "A":
      title = "Add";
      break;
    case "D":
      title = "Delete";
      break;
    default:
      title = "Bottle Default";
      break;
  }
  return (
    <Card className="dark:bg-slate-900">
      <CardHeader>
        <CardTitle>
          {title} Bottle {formType === "E" ? bottle.id : ""}{" "}
        </CardTitle>
        <CardDescription>
          {bottle.wine.producer} {bottle.wine.wineName}{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formType === "E" && <BottleForm formType={formType} id={id} />}
        {formType === "A" && <BottleForm formType={formType} id={id} />}
        {/* {formType === "D" && <DeleteCard />} */}
        {/* {formType === "B" && <BottleForm formType={formType} id={id} />}  */}
      </CardContent>
    </Card>
  );
}
