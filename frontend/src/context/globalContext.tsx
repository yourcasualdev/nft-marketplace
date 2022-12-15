import React, { useState } from 'react';

interface IGlobalContextProps {
    user: any;
    loading: boolean;
    setUser: (user: any) => void;
    setLoading: (loading: boolean) => void;
}

interface IGlobalContextProviderProps {
    children: React.ReactNode;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
    user: {},
    loading: true,
    setUser: () => { },
    setLoading: () => { },
});

export const GlobalContextProvider: React.FC<IGlobalContextProviderProps> = (props) => {
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    return (
        <GlobalContext.Provider
            value={{
                user: currentUser,
                loading: isLoading,
                setUser: setCurrentUser,
                setLoading: setIsLoading,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};