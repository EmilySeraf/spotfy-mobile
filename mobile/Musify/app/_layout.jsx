import React from "react";
import { Slot } from "expo-router";
import { AppProvider } from "../scripts/appContext";


export default Layout = () => {
    return (
        <AppProvider>
            <Slot />
        </AppProvider>
    )
}