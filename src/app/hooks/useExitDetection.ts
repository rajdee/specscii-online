import { useEffect } from "react";

export const detectExit = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    return event.returnValue = 'Are you sure you want to close?';
};


export const useExitDetection = () => {
    useEffect(
        () => {
            window.addEventListener('beforeunload', detectExit);
            return () => window.removeEventListener('beforeunload', detectExit);
        },
        []
    )
};