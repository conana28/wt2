"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { BottleConsumeFormSchema } from "@/lib/schema";
import { useContext } from "react";
import { BottleContext, TBottle } from "./show-table";
import { consumeBottle } from "@/app/actions_bottle";

type BottleFormValues = z.infer<typeof BottleConsumeFormSchema>;

interface BottleFormProps {
  formType: string;
  id: number; // wine id
  btlSelect: TBottle[];
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
}

export function BottleConsumeForm({
  formType,
  id,
  btlSelect,
  setToggle,
  toggle,
}: BottleFormProps) {
  const router = useRouter();

  const { show, setShow, bottle } = useContext(BottleContext);
  console.log("BF Id: ", id);
  let defaultValues: Partial<BottleFormValues>;

  defaultValues = {
    consume: new Date(),
    occasion: "",
  };

  const form = useForm<BottleFormValues>({
    resolver: zodResolver(BottleConsumeFormSchema),
    defaultValues,
  });

  async function onSubmit(data: BottleFormValues) {
    console.log("Submit ", data, btlSelect);

    const result = await consumeBottle(data, bottle.id);
    if (!result) {
      alert("Something went wrong - Add/Edit Bottle");
      return;
    }
    console.log("Result: ", result);
    if (result?.error) {
      // set local error state
      alert(result?.error);
      return;
    }

    setShow("");
    setToggle(!toggle);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="consume"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Consume Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd MMM yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2 -mt-2.5">
            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occasion</FormLabel>
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
