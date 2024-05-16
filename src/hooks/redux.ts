import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState } from "../services/store/store";
import { AppDispatch } from "../services/store/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;