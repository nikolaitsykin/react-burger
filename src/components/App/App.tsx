import { Router, useHistory, useLocation } from "react-router-dom";
import { ILocationState } from "../../services/types/locationTypes";
import { AppHeader } from "./AppHeader/AppHeader";
import { AppRouter } from "./AppRouter/AppRouter";
import { AppRouterModal } from "./AppRouter/AppRouterModal";
import classes from "./Main.module.css";

export const App = () => {
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const background = location.state && location.state.background;

  return (
    <div>
      <Router history={history}>
        <AppHeader />
        <main className={classes.main}>
          <AppRouter />
          {background && <AppRouterModal />}
        </main>
      </Router>
    </div>
  );
};
