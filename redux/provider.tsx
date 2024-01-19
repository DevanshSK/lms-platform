"use client";

import { useEffect } from "react";
import { makeStore, store } from "./store";
import { Provider } from "react-redux";
import { setAuth } from "./features/auth/authSlice";
import axios from "axios";

import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/lib/persistStore";

const persistor = persistStore(store);

interface Props{
    children: React.ReactNode;
}

/**
 * The CustomProvider function is a React component that creates a Redux store and sets the
 * authentication token in the store based on the userToken stored in localStorage.
 * @param {Props}  - - `children`: The child components that will be wrapped by the `Provider`
 * component.
 * @returns The CustomProvider component is returning the Provider component from the react-redux
 * library, with the store prop set to the store object created by the makeStore function. The children
 * prop is also passed as a child of the Provider component.
 */
export default function CustomProvider({children} : Props){
    // const store = makeStore();

    // useEffect(() => {
    //     const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') || null : null;
    //     store.dispatch(setAuth(userToken as string));
    //     axios.defaults.headers.common['Authorization'] = !!userToken ? `Bearer ${userToken}` : null;
    // }, [store]);

    
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
} 