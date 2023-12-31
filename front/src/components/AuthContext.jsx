import React, { createContext, useState } from 'react';
const AuthContext = createContext();


const AuthProvider =  ({ children }) => {

  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUserFavorites = async (userId) => {
    try {

      const response = await fetch(`http://localhost:4000/api/favoritos/usu/${userId}`);

      if (!response.ok) {
        
        throw new Error("Error al obtener los favoritos del usuario");
      }

      const data = await response.json();

 
      localStorage.setItem("favoritos", JSON.stringify(data));

      
    } catch (error) {
      
      console.error("Error al obtener los favoritos del usuario:", error);

      throw error; 
    }
  };


  const fetchComentarios = async (userId) => {
    try {
   
      const response = await fetch(`http://localhost:4000/api/comentarios`);

      if (!response.ok) {
      
        throw new Error("Error al obtener los comentarios del usuario");
      }

      const data = await response.json();

   
      localStorage.setItem("comentarios", JSON.stringify(data));

      
    } catch (error) {
      
      console.error("Error al obtener los comentarios", error);
      
      throw error; 
    }
  };



  const login = async (email,password) => {


    try {

      const postData = {
        email: email,
        password: password,
      };

      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        setLoading(false);
        return setError(true);
      }

      const data = await response.json();

      setUser(data);
      setIsLogged(true);
      
      fetchUserFavorites(data.id);
      fetchComentarios();


      return {
        isLogged,
        user,
      };
      //return data; // Devuelve el usuario autenticado


    } catch (error) {

      console.log({ error });
      setError(true);

    }
}




  const logout = () => {
    // Realiza la lógica de cierre de sesión aquí y establece 'user' en null
    setUser(null);
    setIsLogged(false);
    navigate("/logout");
  };



  const updateUser = async (userData) => {
    try {

      setUser(userData);

      return userData; // Devuelve los datos actualizados del usuario si es necesario.

    } catch (error) {

      console.error("Error al actualizar los datos del usuario:", error);
      throw error;

    }
  };
  

  return (
    <AuthContext.Provider value={{ isLogged, user, login, logout,updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export { AuthProvider, AuthContext };
