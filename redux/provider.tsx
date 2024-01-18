"use client";

import { useEffect } from "react";
import { makeStore } from "./store";
import { Provider } from "react-redux";
import { setAuth } from "./features/auth/authSlice";
import axios from "axios";

interface Props{
    children: React.ReactNode;
}

/**
 * The CustomProvider component is a wrapper that provides the Redux store to its children components.
 * @param {Props}  - The above code is a TypeScript function component called "CustomProvider" that
 * acts as a wrapper for the Redux Provider component. It takes in a single prop called "children"
 * which represents the child components that will be wrapped by the Provider.
 */
export default function CustomProvider({children} : Props){
    const store = makeStore();

    useEffect(() => {
        const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') || null : null;
        store.dispatch(setAuth(userToken as string));
        axios.defaults.headers.common['Authorization'] = !!userToken ? `Bearer ${userToken}` : null;
    }, [store]);
    return <Provider store={store}>{children}</Provider>
} 