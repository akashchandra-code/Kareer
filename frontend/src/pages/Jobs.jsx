import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadUser } from "../store/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";

const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    dispatch(loadUser()).finally(() => {
      setChecking(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (!checking) {
      if (!user) {
        navigate("/login");
      } else if (user.role?.toLowerCase() === "company") {
        navigate("/company-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }
  }, [checking, user, navigate]);

  return null;
};

export default Jobs;
