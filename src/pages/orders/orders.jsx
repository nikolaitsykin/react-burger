import React from "react";
import classes from "../profile/profile.module.css";
import ProfileSideBar from "../../components/ProfileSideBar/ProfileSideBar";

const OrdersPage = () => {
  return (
    <div className={classes.profile_container}>
      <ProfileSideBar />
      <div>
      <p className="text text_type_main-medium mb-6">Here is gonna be your orders page</p>

      </div>
    </div>
  );
};

export default OrdersPage;
