"use client";
import { store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/lib/persistStore";

const persistor = persistStore(store);

interface Props {
    children: React.ReactNode;
}


/* The `export default function CustomProvider({ children }: Props)` is a custom React component that
acts as a provider for the Redux store. It wraps the `Provider` component from the `react-redux`
library and the `PersistGate` component from the `redux-persist` library. */
export default function CustomProvider({ children }: Props) {

    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
} 