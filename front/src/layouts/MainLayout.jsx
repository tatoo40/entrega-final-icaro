import React  from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

const MainLayout = ({ children }) => {
 
  //console.log(isLogged);


  return (
    <>
      <Navbar

       />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
