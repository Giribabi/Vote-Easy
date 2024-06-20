import React, { createContext, useState } from "react";

export const StatusContext = createContext();

const StatusProvider = ({ children }) => {
    const backendUrl = "http://localhost:3030";
    const [status, setStatus] = useState("");

    return (
        <StatusContext.Provider value={{ status, setStatus, backendUrl }}>
            {children}
        </StatusContext.Provider>
    );
};

export default StatusProvider;
