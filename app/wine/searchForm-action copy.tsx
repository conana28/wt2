"use client";

import { useState } from "react";
import { useForm, SubmitHandler, set, useFormContext } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { searchWines } from "@/app/actions_wine";
import { WineSearchSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bottle } from "@prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { WineData } from "./columns";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

type Inputs = z.infer<typeof WineSearchSchema>;

// type WineData = {
//   id: number;
//   producer: string;
//   wineName: string;
//   country: string;
//   region: string;
//   subRegion: string | null;
//   type: string | null;
//   bottle: Array<Bottle | []>;
// };

const transformWinesData = (data: any) => {
  return data.map(
    (wineItem: {
      bottle: never[];
      id: any;
      producer: any;
      wineName: any;
      country: any;
      region: any;
      subRegion: any;
      type: any;
    }) => {
      const bottles = wineItem.bottle || [];
      return {
        id: wineItem.id || 0,
        producer: wineItem.producer || "",
        wineName: wineItem.wineName || "",
        country: wineItem.country || "",
        region: wineItem.region || "",
        subRegion: wineItem.subRegion || null,
        type: wineItem.type || null,
        bottle: bottles,
      };
    }
  );
};

export default function RhfWithAction() {
  const { toast } = useToast();
  // Create a function to generate the default WineData
  const getDefaultWineData = (): WineData => ({
    id: 0,
    producer: "",
    wineName: "",
    country: "",
    region: "",
    subRegion: null,
    type: null,
    bottle: [], // Initialize bottle as an empty array
  });
  const [wineData, setWineData] = useState<WineData>(getDefaultWineData());
  const [searchData, setSearchData] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    // setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { search: "" },
    resolver: zodResolver(WineSearchSchema),
  });

  //   const setValue = useFormContext<Inputs>();

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (data.search === "") {
      console.log("No data");
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[220px] md:top-56 md:left-8"
        ),
        variant: "destructive",
        // title: "No data",
        description: "Please enter a search term",
      });

      return;
    }
    console.log(data.search);

    // Get Data from DB
    const result = await searchWines(data);

    if (!result) {
      console.log("Something went wrong");
      alert("Something went wrong");
      return;
    }

    if (result.error) {
      // set local error state
      console.log(result.error);
      alert(result.error);
      return;
    }

    setSearchData(data.search);
    // reset();
    // console.log(result.wines);

    // Transform the data and set it in the state
    setWineData(transformWinesData(result.wines));
  };

  return (
    <>
      {/* <section className="flex gap-6"> */}
      <section className="flex flex-col md:flex-row gap-4">
        <form
          onSubmit={handleSubmit(processForm)}
          className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4"
        >
          {/* className="flex flex-1 flex-col gap-4 w-1/4 sm:w-1/2" */}

          <Input
            placeholder="search"
            type="search"
            className="rounded-lg"
            {...register("search")}
          />
          {errors.search?.message && (
            <p className="text-sm text-red-400">{errors.search.message}</p>
          )}
          <div className="flex flex-row gap-4 mt-2">
            <Button variant="secondary">Search</Button>
            <Button
              variant="secondary"
              onClick={() => {
                // reset({ search: "" });
                // clearErrors();
                // setValue("search", "", {
                //   shouldValidate: false,
                //   shouldDirty: false,
                //   shouldTouch: false,
                // });
                reset();
                setWineData(transformWinesData([]));
                setSearchData("");
              }}
            >
              Reset
            </Button>
          </div>
        </form>
        <div className="flex-1">
          {searchData && (
            <DataTable
              columns={columns}
              data={JSON.parse(JSON.stringify(wineData || []))}
            />
          )}
        </div>
      </section>
    </>
  );
}
