import { Redirect, useLocation } from "react-router-dom";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import ProfileSideBar from "../../components/ProfileSideBar/ProfileSideBar";
import { useAppSelector } from "../../hooks/redux";
import { _LOGIN_PATH } from "../../utils/constants";
import classes from "./profile.module.css";

const ProfilePage = () => {
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);

  if (isAuth) {
    return (
      <div className={classes.profile_container}>
        <ProfileSideBar />
        <ProfileForm />
      </div>
    );
  }
  return (
    <Redirect to={{ pathname: { _LOGIN_PATH }, state: { from: location } }} />
  );
};

export default ProfilePage;
