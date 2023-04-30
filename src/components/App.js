import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useUserStore } from "../store";
import { getUserData } from "../store/users";
import HomePage from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import UserPage from "../pages/UserPage";
import Navigation from "./Navigation";
import Footer from "./Footer";

function App() {
  const history = useHistory();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserData(token)
        .then((data) => {
          console.log("User data received from server:", data);
        })
        .catch((error) => {
          console.error("Error getting user data:", error);
          localStorage.removeItem("token");
        });
    } else {
      history.push("/login");
    }
  }, [history]);

  return (
    <>
      <Navigation user={user} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/users/:id" component={UserPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
