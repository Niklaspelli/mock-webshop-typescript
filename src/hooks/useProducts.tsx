import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ProductsResponse } from "../types/types";

const url = import.meta.env.VITE_GET_PRODUCTS_URL;

const fetchProducts = async () => {
  const { data } = await axios.get<ProductsResponse>(url);
  return data;
};

export const useProducts = () => {
  return useQuery<ProductsResponse>({
    queryKey: ["data"],
    queryFn: fetchProducts,
  });
};
