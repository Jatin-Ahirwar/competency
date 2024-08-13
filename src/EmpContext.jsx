import React, { createContext, useContext, useState } from 'react';

const EmpContext = createContext();

export const UseEmploye = () => useContext(EmpContext);

export const EmpoloyeProvider = ({ children }) => {
    const [uuid, setuuid] = useState(null);

    return (
        <EmpContext.Provider value={{ uuid, setuuid }}>
            {children}
        </EmpContext.Provider>
    );
};
