import { useEffect } from "react";
import { FeedHistory } from "../../components/Feed/FeedHistory/FeedHistoty";
import { FeedList } from "../../components/Feed/FeedList/FeedList";
import { useActions } from "../../hooks/actions";
import { getOrders } from "../../services/store/reducers/ws.slice";
import classes from "./feed.module.css";

export const FeedPage = () => {
  const { open, close } = useActions();

  useEffect(() => {
    open(getOrders());

    return () => {
      close();
    };
  });

  return (
    <>
      <h1>
        <p className={`${classes.header} text text_type_main-large mb-8`}>
          Orders feed
        </p>
      </h1>
      <section className={classes.feed_container}>
        <FeedList />
        <FeedHistory />
      </section>
    </>
  );
};
