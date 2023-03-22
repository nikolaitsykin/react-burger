import { useEffect } from "react";
import { FeedDetails } from "../../../components/Feed/FeedDetails/FeedDetails";
import { useActions } from "../../../hooks/actions";
import { useGetIngredientsQuery } from "../../../services/store/api";
import { getPersonalOrders } from "../../../services/store/reducers/ws.slice";

export const OrderDetailsPage = () => {
  const { open, close } = useActions();
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

  useEffect(() => {
    open(getPersonalOrders());
  }, [open, close]);

  return <FeedDetails />;
};
