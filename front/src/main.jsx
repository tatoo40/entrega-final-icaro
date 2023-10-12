import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CarritoProvider } from './components/CarritoContext.jsx';
import { AuthProvider } from "./components/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </AuthProvider> 
  </React.StrictMode>
);



