import { createContext, useState } from "react";

export const AppContext = createContext()
export const AppProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({})
    const [playingNow, setPlayingNow] = useState({})

    
    return (
        <AppContext.Provider value={{userInfo, setUserInfo, playingNow, setPlayingNow}}>
            {children}
        </AppContext.Provider>
    )
}