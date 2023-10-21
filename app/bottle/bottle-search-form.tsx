"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

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
import { BottleSearchSchema } from "@/lib/schema";
import { searchBottles } from "../actions_bottle";

type BottleSearchValues = z.infer<typeof BottleSearchSchema>;
type Props = {
  setBtls: (btls: any) => void;
};

export function BottleSearchForm({ setBtls }: Props) {
  const router = useRouter();
  const defaultValues: Partial<BottleSearchValues> = {
    search: "",
    vintage: 0,
    country: "",
    rack: "",
  };

  const form = useForm<BottleSearchValues>({
    resolver: zodResolver(BottleSearchSchema),
    defaultValues,
  });

  async function onSubmit(data: BottleSearchValues) {
    console.log("Submit ", data);
    form.reset(defaultValues);

    const btls = await searchBottles({
      search: data.search,
      vintage: data.vintage,
      country: data.country,
      rack: data.rack,
    });
    // const btls = await searchBottles({ search: data.search });
    console.log(btls);
    setBtls(btls?.bottles);
    // return btls; // router.push(`/bottle/${data.search}/${data.vintage}`);
  }

  return (
    <div className="flex flex-row gap-2">
      <div className="w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-row gap-4">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Search</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-2/12">
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

              <div className="w-2/12">
                <FormField
                  control={form.control}
                  name="rack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rack</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-2/12">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
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
                type="reset"
                onClick={() => router.push("/")}
              >
                Cancel
              </Button>
              <Button size="xs" type="submit">
                Search
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
