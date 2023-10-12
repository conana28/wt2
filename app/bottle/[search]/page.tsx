// import { searchBottles } from "@/app/actions_bottle";
import Container from "@/components/ui/container";
import ShowTable from "./show-table";
import { searchBottles } from "@/app/actions_bottle";

const page = async ({ params }: { params: { search: string } }) => {
  // Get Data from DB
  const result = await searchBottles({ search: params.search });
  if (!result?.bottles) {
    console.log("Something went wrong");
    return;
  }

  return (
    <Container>
      <div className="p-4  sm:p-6 lg:p-8 ">
        <h1 className="text-xl font-bold">
          Bottle Results - {result?.bottles?.length}
        </h1>

        <div className="mt-4 ">
          {/* <ul>
            {bottles.map((bottle) => (
              <li key={bottle.id}>
                {bottle.wine.producer} {bottle.wine.wineName} {bottle.vintage}{" "}
                {bottle.rack} {bottle.shelf} {bottle.cost} {bottle.id}
              </li>
            ))}
          </ul> */}
          <ShowTable btls={result.bottles} />
        </div>
      </div>
    </Container>
  );
};

export default page;
