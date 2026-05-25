import { createContext } from "react";
import type { ShopContextType } from "../types/types";

export const ShopContext = createContext<ShopContextType | null>(null);
