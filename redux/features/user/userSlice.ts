import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IUser } from "@/redux/types";
import { RootState } from "@/redux/store";

interface IUserState{
    user: IUser | null;
}

const initialState: IUserState = {
    user: null,
}

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        logOut: (state) => {
            state = initialState;
        }
    }
})

export default userSlice.reducer;
export const selectUser = (state: RootState) => state.userState.user;
export const {logOut, setUser} = userSlice.actions;