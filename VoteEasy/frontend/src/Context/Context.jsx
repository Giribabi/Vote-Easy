import React, { createContext, useState } from "react";

export const StatusContext = createContext();

const StatusProvider = ({ children }) => {
    const [status, setStatus] = useState("");

    return (
        <StatusContext.Provider value={{ status, setStatus }}>
            {children}
        </StatusContext.Provider>
    );
};

export default StatusProvider;
