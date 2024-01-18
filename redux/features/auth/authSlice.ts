import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
/* The code is defining a Redux slice for managing the authentication state in a TypeScript
application. */
export interface AuthState{
    token: string | null;
    isAuthenticated: boolean;
}

export const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setInitialState: (state, action: PayloadAction<AuthState>) => {
            return {...state, ...action.payload};
        },
        setAuth: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
    }
})

export const {setAuth, logout, setInitialState} = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export default authSlice.reducer;