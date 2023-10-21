"use client";

import { useContext } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Context } from "./show-table";
import { WineForm } from "./wine-form";
import { BottleForm } from "./bottle-form";
import DeleteCard from "./delete-card";
import ShowBottles from "./show-bottles";

interface CharacterDisplayProps {
  formType: string;
  id: number;
}

export function ShowCard({ formType, id }: CharacterDisplayProps) {
  console.log("ShowCard: ", formType, id);
  const { wine } = useContext(Context);
  let title = "";
  switch (formType) {
    case "A":
      title = "Add Wine Like";
      break;
    case "E":
      title = "Edit Wine";
      break;
    case "D":
      title = "Delete Wine";
      break;
    case "S":
      title = "Show bottles";
      break;
    case "B":
      title = "Add bottle(s)";
      break;
    default:
      title = "Wine Details";
      break;
  }
  return (
    <Card className="dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="-mt-2">{title}</CardTitle>
        <CardDescription>
          {wine.producer} {wine.wineName}{" "}
        </CardDescription>
      </CardHeader>
      <CardContent className="-mt-4">
        {formType === "A" && <WineForm formType={formType} id={id} />}
        {formType === "E" && <WineForm formType={formType} id={id} />}
        {formType === "D" && <DeleteCard />}
        {formType === "S" && <ShowBottles wine={wine} />}
        {formType === "B" && <BottleForm formType={formType} id={id} />}
      </CardContent>
    </Card>
  );
}
