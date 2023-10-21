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
import { Context } from "./show-table";
import { addBottle, updateBottle } from "@/app/actions_bottle";
import { Bottle } from "@prisma/client";

type BottleFormValues = z.infer<typeof BottleFormSchema1>;

interface BottleFormProps {
  btl: Bottle | null;
  setOpenDialog: (b: boolean) => void;
}

export function BottleMaintainForm({ btl, setOpenDialog }: BottleFormProps) {
  const { show, setShow, wine } = useContext(Context);
  const defaultValues: Partial<BottleFormValues> = {
    vintage: btl?.vintage,
    rack: btl?.rack,
    shelf: btl?.shelf === null ? undefined : btl?.shelf,
    cost: btl?.cost === null ? undefined : btl?.cost,
  };
  const form = useForm<BottleFormValues>({
    resolver: zodResolver(BottleFormSchema1),
    defaultValues,
  });

  async function onSubmit(data: BottleFormValues) {
    console.log("Submit ", data);

    if (btl) {
      const result = await updateBottle(data, btl.id);

      if (!result) {
        alert("Something went wrong - Add Wine");
        return;
      }
    }

    setOpenDialog(false);
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
          <Button
            size="xs"
            variant="secondary"
            type="button"
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>
          <Button
            size="xs"
            variant="destructive"
            type="button"
            onClick={() => setOpenDialog(false)}
          >
            Delete
          </Button>
          <Button
            size="xs"
            variant="secondary"
            type="button"
            onClick={() => setOpenDialog(false)}
          >
            Add
          </Button>
          <Button size="xs" type="submit">
            Edit
          </Button>
        </div>
      </form>
    </Form>
  );
}
