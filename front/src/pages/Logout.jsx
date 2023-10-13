import React, { useState } from "react";
import { AuthContext } from "../components/AuthContext";


const Logout = () => {
  
  const { logout } = useContext(AuthContext); 

  logout()

  
};

export default Logout;
