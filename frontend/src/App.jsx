import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Nav from "./components/Nav";
import MainRoute from "./routes/MainRoute";
import { loadUser } from "./store/actions/AuthActions";
import { ToastContainer } from "react-toastify";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="bg-black w-full h-full overflow-x-hidden overflow-y-auto text-white  ">
      <Nav />
      <MainRoute />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;
