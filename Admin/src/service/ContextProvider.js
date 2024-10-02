import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useContextProvider = () => useContext(AuthContext);
const ContextProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <AuthContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
