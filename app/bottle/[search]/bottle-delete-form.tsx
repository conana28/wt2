import React, { useContext } from "react";
import { BottleContext } from "./show-table";
import { Button } from "@/components/ui/button";
import { deleteBottle } from "@/app/actions_bottle";

interface BottleFormProps {
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
}
const BottleDeleteForm = ({ setToggle, toggle }: BottleFormProps) => {
  const { bottle, setShow } = useContext(BottleContext);

  const handleDelete = async () => {
    console.log("Delete: ", bottle.id);
    const result = await deleteBottle(bottle.id);
    if (!result) {
      alert("Something went wrong with bottle delete");
      return;
    }

    if (result.error) {
      // set local error state
      console.error(result.error);
      return;
    }
    setShow("");
    setToggle(!toggle);
  };

  return (
    <>
      <div className="text-red-500 text-2xl">
        Id {bottle.id} - Are you sure?{" "}
      </div>
      <div className="flex items-center justify-end space-x-4">
        <Button size="xs" variant="secondary" onClick={() => setShow("")}>
          Cancel
        </Button>
        <Button size="xs" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </>
  );
};

export default BottleDeleteForm;
