"use client";

import { makeStore } from "./store";
import { Provider } from "react-redux";

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
    return <Provider store={makeStore()}>{children}</Provider>
} 