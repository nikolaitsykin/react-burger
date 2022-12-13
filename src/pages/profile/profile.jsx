import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import ProfileSideBar from "../../components/ProfileSideBar/ProfileSideBar";
import { checkUser } from "../../services/actions/auth";
import { getCookie } from "../../utils/api";
import {
  _LOGIN_PATH
} from "../../utils/constants";
import classes from "./profile.module.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const token = document.cookie ? getCookie("token") : "";

  const { isAuth } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(checkUser(token));
  }, [dispatch, isAuth, token]);


  if (isAuth) {
    return (
      <div className={classes.profile_container}>
        <ProfileSideBar />
        <ProfileForm />
      </div>
    );
  } else {
    return <Redirect to={{ pathname: {_LOGIN_PATH}, state: { from: location } }} />;
  }
};

export default ProfilePage;
