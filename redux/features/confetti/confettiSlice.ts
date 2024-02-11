import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export interface ConfettiState {
    isOpen: boolean;
}

const initialState: ConfettiState = {
    isOpen: false,
}

const confettiSlice = createSlice({
    name: "confetti",
    initialState,
    reducers: {
        onOpen: (state) => {
            return { ...state, isOpen: true };
        },
        onClose: (state) => {
            return { ...state, isOpen: false };
        }
    }
})

export const {onClose, onOpen} = confettiSlice.actions;
export const isConfettiOpen = (state: RootState) => state.confetti.isOpen;
export default confettiSlice.reducer;