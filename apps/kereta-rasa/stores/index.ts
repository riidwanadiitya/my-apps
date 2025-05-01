import { IProduct } from "@/app/home/page";
import { create } from "zustand";

export interface ICart extends IProduct {
  qty: number;
  notes?: string;
}

interface IRootStores {
  carts: ICart[];
  updateCart: (product: ICart[]) => void;
  updateStore: (newState: Partial<IRootStores>) => void;
}

export const useRootStores = create<IRootStores>((set) => ({
  carts: [],
  updateCart: (newProduct) => set((state) => ({ ...state, carts: newProduct })),
  updateStore: (newState) => set((state) => ({ ...state, ...newState })),
}));
