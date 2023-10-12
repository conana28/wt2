"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BottleFormSchema1 } from "@/lib/schema";
import { useContext } from "react";
import { BottleContext } from "./show-table";
import { addBottle, updateBottle } from "@/app/actions_bottle";

type BottleFormValues = z.infer<typeof BottleFormSchema1>;

interface BottleFormProps {
  formType: string;
  id: number; // wine id
}

export function BottleForm({ formType, id }: BottleFormProps) {
  const { show, setShow, bottle } = useContext(BottleContext);
  console.log("BF Id: ", id);
  let defaultValues: Partial<BottleFormValues>;
  if (formType === "A") {
    defaultValues = {
      vintage: 2020,
      rack: "",
      shelf: "",
      cost: 0,
    };
  } else {
    defaultValues = {
      vintage: bottle.vintage,
      rack: bottle.rack,
      shelf: bottle.shelf === null ? undefined : bottle.shelf,
      cost: bottle.cost === null ? undefined : bottle.cost,
    };
  }

  const form = useForm<BottleFormValues>({
    resolver: zodResolver(BottleFormSchema1),
    defaultValues,
  });

  async function onSubmit(data: BottleFormValues) {
    console.log("Submit ", data);
    let result;
    if (formType === "A") {
      result = await addBottle(data, id);
    } else {
      result = await updateBottle(data, id);
    }

    if (!result) {
      alert("Something went wrong - Add/Edit Bottle");
      return;
    }

    if (result.error) {
      // set local error state
      alert(result.error);
      return;
    }

    setShow("");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-row gap-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="vintage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vintage</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="rack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rack</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="shelf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shelf</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4">
          <Button size="xs" variant="secondary" onClick={() => setShow("")}>
            Cancel
          </Button>
          <Button size="xs" type="submit">
            {formType === "A" ? "Add" : "Edit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
