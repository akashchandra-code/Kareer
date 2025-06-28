import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CompanyProfile from "../pages/CompanyProfile";
import UserProfile from "../pages/UserProfile";
import { loadUser } from "../store/actions/AuthActions";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const [checking, setChecking] = React.useState(true);

  useEffect(() => {
    dispatch(loadUser()).finally(() => {
      setChecking(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (!checking && !user) {
      navigate("/login");
    }
  }, [checking, user, navigate]);

  if (checking) return null;

  const role = user?.role?.toLowerCase();
  return <div>{role === "company" ? <CompanyProfile /> : <UserProfile />}</div>;
};

export default Profile;
