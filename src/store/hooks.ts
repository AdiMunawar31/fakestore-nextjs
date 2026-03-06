import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";
import { createSelector } from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);

// Memoized selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);
export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((count, item) => count + item.quantity, 0)
);
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
