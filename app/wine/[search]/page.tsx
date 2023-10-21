import { searchWines } from "@/app/actions_wine";
import Container from "@/components/ui/container";
import ShowTable from "./show-table";

// Gets the search param from the URL and passes it to the searchWines function
// which returns the results from the DB

const page = async ({ params }: { params: { search: string } }) => {
  // Get Data from DB
  const result = await searchWines({ search: params.search });

  if (!result?.wines) {
    console.log("Search wines went wrong", params.search);
    // alert("Something went wrong");
    return;
  }

  return (
    <Container>
      {/* <div className="p-4 sm:p-6 lg:p-8 "> */}
      <div className="p-4">
        {/* Test Search Params {params.search} Results = {result.wines?.length}{" "} */}
        {/* <div className="mt-4 "> */}
        {/* <h1>Show WInes Table</h1> */}
        <ShowTable wines={result.wines} />
        {/* </div> */}
      </div>
    </Container>
  );
};

export default page;
