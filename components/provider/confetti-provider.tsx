"use client";
import { isConfettiOpen, onClose } from "@/redux/features/confetti/confettiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ReactConfetti from "react-confetti";


export const ConfettiProvider =  () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(isConfettiOpen);

    if(!isOpen) return null;

    return (
        <ReactConfetti 
            className="pointer-events-none z-[100]"
            numberOfPieces={500}
            recycle={false}
            onConfettiComplete={() => {
                dispatch(onClose());
            }}
        />
    )
}