import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Product } from "../types/types";

const url = import.meta.env.VITE_GET_PRODUCTS_URL;

const fetchProductsDetails = async (id: string): Promise<Product> => {
  const { data } = await axios.get<{ data: Product }>(`${url}/${id}`);
  return data.data;
};

export const useProductsDetails = (id: string) => {
  return useQuery<Product>({
    queryKey: ["data", id],
    queryFn: () => fetchProductsDetails(id),
  });
};
