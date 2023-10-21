"use client";

import { useContext } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BottleContext, TBottle } from "./show-table";
import { BottleForm } from "./bottle-form";
import BottleDeleteForm from "./bottle-delete-form";
import { BottleConsumeForm } from "./bottle-consume-form";
// import { WineForm } from "./wine-form";
// import { BottleForm } from "./bottle-form";
// import DeleteCard from "./delete-card";
// import ShowBottles from "./show-bottles";

interface CharacterDisplayProps {
  formType: string;
  id: number;
  btlSelect: TBottle[];
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
}

export function ShowCard({
  formType,
  id,
  btlSelect,
  setToggle,
  toggle,
}: CharacterDisplayProps) {
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
        <CardTitle className="-mt-2">
          {title} Bottle {formType === "E" ? bottle.id : ""}{" "}
        </CardTitle>
        <CardDescription>
          {bottle.wine.producer} {bottle.wine.wineName} id:{bottle.id}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formType === "E" && (
          <BottleForm
            formType={formType}
            id={id}
            btlSelect={btlSelect}
            setToggle={setToggle}
            toggle={toggle}
          />
        )}
        {formType === "A" && (
          <BottleForm
            formType={formType}
            id={id}
            btlSelect={btlSelect}
            setToggle={setToggle}
            toggle={toggle}
          />
        )}
        {formType === "D" && (
          <BottleDeleteForm setToggle={setToggle} toggle={toggle} />
        )}
        {formType === "C" && (
          <BottleConsumeForm
            formType={formType}
            id={id}
            btlSelect={btlSelect}
            setToggle={setToggle}
            toggle={toggle}
          />
        )}

        {/* {formType === "B" && <BottleForm formType={formType} id={id} />}  */}
      </CardContent>
    </Card>
  );
}
