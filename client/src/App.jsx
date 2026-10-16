import React from "react";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import api from "./config/api";
import { FiLoader } from "react-icons/fi";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: false,
    role: "",
    avatar: {
      url: "",
    },
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const handleLogin = async (userData) => {
    try {
      const res = await api.post("/auth/login", userData);
      if (res.data.data) {
        setUser(res.data.data);
        setIsLoggedIn(true);
        toast.success("login successful");
      } else {
        toast.error("failed to login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser({
        name: "",
        email: "",
        phone: false,
        role: "",
      });
      setIsLoggedIn(false);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSignUp = async (userData) => {
    try {
      const res = await api.post("/auth/register", userData);
      if (res.data.data) {
        setUser(res.data.data);
        setIsLoggedIn(true);
        toast.success("Registered successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const checkAuth = async () => {
    try {
      setIsChecking(true);
      const res = await api.get("/auth/me");
      if (res.data.data) {
        setUser(res.data.data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isChecking) {
    return (
      <div className="w-full h-dvh flex justify-center items-center">
        <FiLoader className="animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {isLoggedIn ? (
        <Home user={user} handleLogout={handleLogout} />
      ) : (
        <Login login={handleLogin} signup={handleSignUp} />
      )}

      <Toaster />
    </div>
  );
};

export default App;
