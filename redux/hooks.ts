
import {useSelector, useDispatch} from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type {RootState, AppDispatch} from "./store";

/* This code is importing the `useSelector` and `useDispatch` hooks from the `react-redux` library. It
is also importing the `TypedUseSelectorHook` type from `react-redux`. */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;