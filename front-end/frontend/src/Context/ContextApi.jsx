import React, { createContext, useContext } from "react";

const Context = createContext({

});

const ContextApi = ({ children }) => {



    return (
        <Context.Provider value={{

        }}>

            {children}

        </Context.Provider>
    );
};

export const useContextApi = () => useContext(Context);

export default ContextApi;
