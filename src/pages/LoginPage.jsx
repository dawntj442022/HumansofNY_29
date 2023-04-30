import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useUserStore } from "../store";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  console.log("User object in login page:", user); // Add this line to check the user object
  const history = useHistory();

  useEffect(() => {
    console.log("User ID in login page:", user && user._id); // Add a check for null or undefined values
    if (user && user._id) {
      history.push(`/users/${user._id}`);
    }
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log("Data received from server:", data); // Log the received data

      setUser(data.user);
      localStorage.setItem("token", data.token);
      if (data.user && data.user._id) {
        history.push(`/users/${data.user._id}`);
      } else {
        alert("User ID is undefined or null");
      }
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Login</h1>
      <LoginForm
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        email={email}
        password={password}
      />
    </div>
  );
};

export default LoginPage;
