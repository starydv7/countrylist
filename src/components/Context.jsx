import { createContext, useState } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
   
    const [newdata, setNewdata] = useState({});
    
  
    return (
      <AppContext.Provider value={{setNewdata  ,newdata}}>
        {children}
      </AppContext.Provider>
    );
  }
  
  export default AppContextProvider;