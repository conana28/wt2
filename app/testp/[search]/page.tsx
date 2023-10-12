import { searchWines } from "@/app/actions_wine";
import Container from "@/components/ui/container";
import ShowTable from "./show-table";

const page = async ({ params }: { params: { search: string } }) => {
  // Get Data from DB
  const result = await searchWines({ search: params.search });

  if (!result?.wines) {
    console.log("Something went wrong");
    alert("Something went wrong");
    return;
  }

  return (
    <Container>
      <div className="p-4  sm:p-6 lg:p-8 ">
        Test Search Params {params.search} Results = {result.wines?.length}{" "}
        <div className="mt-4 ">
          <ShowTable wines={result.wines} />
        </div>
      </div>
    </Container>
  );
};

export default page;
