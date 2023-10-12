import React, { useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";


const Logout = () => {
  
  const { logout } = useContext(AuthContext); 

  logout()

  
};

export default Logout;
