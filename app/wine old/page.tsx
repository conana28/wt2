import Container from "@/components/ui/container";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getWines } from "@/lib/wine";
import { SearchForm } from "./searchform";
import RhfWithAction from "./searchForm-action";
import { Search } from "lucide-react";

export default async function Wine() {
  // const [searchText, setSearchText] = useState([]);
  // const { wines } = await getWines();

  // const winesWithCostAsNumber = wines?.map((wine: any) => {
  //   return {
  //     ...wine,
  //     cost: wine.bottle?.cost?.toNumber() || 0,
  //   };
  // });

  // console.log(winesWithCostAsNumber);

  return (
    <Container>
      <div className="p-4 sm:p-6 lg:p-8 ">
        <h2 className="mt-2 border-b pb-2 text-xl font-semibold">Wines:</h2>
        <SearchForm />
        {/* <RhfWithAction /> */}
        {/* <InputForm /> */}
        <div className="container mx-auto py-10">
          {/* <DataTable
            columns={columns}
            data={JSON.parse(JSON.stringify(wines || []))}
          /> */}
          {/* In this implementation, the JSON.stringify and JSON.parse methods are used to convert the list of wines 
          with the cost property as a plain JavaScript number to a plain object before passing it to the DataTable component. 
          This ensures that the Decimal object is not passed to the client component, which would trigger the warning message. */}
        </div>
      </div>
    </Container>
  );
}
