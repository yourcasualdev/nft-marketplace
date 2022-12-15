import React, { useState } from 'react';

interface IGlobalContextProps {

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