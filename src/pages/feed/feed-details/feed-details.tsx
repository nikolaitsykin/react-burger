import { useEffect } from "react";
import { FeedDetails } from "../../../components/Feed/FeedDetails/FeedDetails";
import { useActions } from "../../../hooks/actions";
import { useGetIngredientsQuery } from "../../../services/store/api";
import { getOrders } from "../../../services/store/reducers/ws.slice";

export const FeedDetailsPage = () => {
  const { open, close } = useActions();

  useEffect(() => {
    open(getOrders());
    return () => {
      close();
    };
  }, [open, close]);

  const { getIngredients, getIngredientsFailed } = useActions();

  const {
    isError: isIngredientsError,
    data: ingredients,
    isSuccess: isIngredientsGetSuccess,
  } = useGetIngredientsQuery("");

  useEffect(() => {
    if (isIngredientsGetSuccess) {
      getIngredients(ingredients);
    }
    if (isIngredientsError) {
      getIngredientsFailed();
    }
  }, [
    ingredients,
    isIngredientsGetSuccess,
    isIngredientsError,
    getIngredients,
    getIngredientsFailed,
  ]);

  return <FeedDetails />;
};
