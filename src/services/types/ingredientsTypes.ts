export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count: number;
  uid?: string;
  index: number;
}

export interface IngredientsState {
  ingredientItems: IIngredient[];
  bun: IIngredient[];
  sauce: IIngredient[];
  main: IIngredient[];
  isRequested: boolean;
  isRequestedError: boolean;
  selectedIngredient: IIngredient;
  selectedIngredients: IIngredient[];
  selectedBun: IIngredient;
  currentTab: string;
  total: number;
}

export interface IFeedDetailsItemProps {
  item: IIngredient;
  count: number;
}

export interface PropertiesItemProps {
  title: string;
  value?: number;
}

export interface IngredientItemProps {
  item: IIngredient;
}

export interface IngredientDetailsProps {
  item: IIngredient;
}

export interface DetailPropertiesProps {
  ingredient: IIngredient;
}

export interface IIngredientResponse {
  success: boolean;
  data: IIngredient[];
}