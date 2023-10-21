const page = async ({
  params,
}: {
  params: { search: string; vintage: string };
}) => {
  // Get Data from DB
  // const result = await searchBottles({ search: params.search });
  // if (!result?.bottles) {
  //   console.log("SearchBottle: Something went wrong");
  //   return;
  // }

  return (
    <div>
      <h1>Search Page: {params.search} </h1>
      <h1>Vintage: {params.vintage} </h1>
    </div>
  );
};

export default page;
