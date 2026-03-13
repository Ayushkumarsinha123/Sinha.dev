import { Children } from 'react';
import { createContext, useContext, useState , useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token , setToken ] = useState(null);

  // load user from localStorage when app starts

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if(storedUser && storedToken ) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  },[]);

  // login function
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  }

  // local function 
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.rremoveItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login , logout}}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => {
  return useContext(AuthContext);
}