import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IFeedDetailsItemProps } from "../../../services/types/ingredientsTypes";
import classes from "../FeedDetailsItem/FeedDetailsItem.module.css";

export const FeedDetailsItem = ({ item, count }: IFeedDetailsItemProps) => {
  return (
    <li className={`${classes.list_item} mb-4`}>
      <div className={classes.item_image}>
        <img src={item.image_mobile} alt={item.name} />
      </div>
      <p className="text text_type_main-default ml-4 mr-4">{item.name}</p>
      <div className={classes.item_price}>
        {count > 1 && (
          <>
            <p className="text text_type_digits-default">{count}</p>
            &nbsp;x&nbsp;
          </>
        )}
        <p className="text text_type_digits-default">{item.price}</p>
        <CurrencyIcon type={"primary"} />
      </div>
    </li>
  );
};
