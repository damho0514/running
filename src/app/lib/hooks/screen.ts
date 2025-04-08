import { useEffect } from "react";

export const useScreenSize = () => {
    const setScreenSize = () => {
        if(typeof window === 'undefined') return;
        const vh = window.innerHeight * 0.1;
        document.documentElement.style.setProperty('--vh', `${vh}`);
    }

    useEffect(() => {
        setScreenSize();
        window.addEventListener('resize', setScreenSize);
        return () => window.removeEventListener('resize', setScreenSize)
    }, [])
}