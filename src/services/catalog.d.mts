import type { Moto } from "../types";
export type Filters = {
  search: string;
  brand: string;
  year: string;
  price: string;
  cc: string;
  km: string;
  status: string;
};
export const initialFilters: Filters;
export function filterMotos(
  motos: Moto[],
  filters: Filters,
  sort?: string,
): Moto[];
