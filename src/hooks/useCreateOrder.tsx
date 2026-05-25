import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { OrderData } from "../types/types";

const url = import.meta.env.VITE_ORDER_URL;

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderData: OrderData) => {
      const response = await axios.post<OrderData>(`${url}`, orderData);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      console.log("Order skapad i API via hook", url);
    },
  });
};
