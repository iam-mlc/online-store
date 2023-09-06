import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";



export const useFetchAndQuery = (url: string) => {

  const queryKeys = splitUrl(url);

  const query = useQuery({ queryKey: queryKeys, queryFn: () => fetchData(url) });

  return query;
};


const fetchData = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const splitUrl = (url: string): string[] => {
  const parsedUrl = new URL(url);
  return parsedUrl.pathname.split("/").filter(Boolean);
};