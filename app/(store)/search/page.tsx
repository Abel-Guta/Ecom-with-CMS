import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: {
    query?: string;
  };
}) => {
  const { query } = await searchParams;
  return <div>{query}</div>;
};

export default SearchPage;
