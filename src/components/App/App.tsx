import { useEffect } from "react";
import { Header } from "../Header";
import { InputOutput } from "../InputOutput";
import { Operations } from "../Operations";

export function App() {
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
            document.documentElement.classList.toggle('light', savedTheme === 'light');
        }
    }, []);

    return (
        <div className="calc-container">
            <div className="relative min-h-[calc(100vh-20px)] rounded-[40px] overflow-hidden">
                {/* Так як градієнтні background не анімуються (opacity + transition) */}
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#fefefe] via-[#f9f9f9] via-[32.53%] to-[#e5e5e5] transition-opacity duration-500 dark:opacity-0"></div>
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#373737] via-[#252628] via-[22.9%] to-[#000309] transition-opacity duration-500 opacity-0 dark:opacity-100"></div>

                <div className="relative z-2 min-h-[calc(100vh-20px)] flex flex-col justify-between">
                    <Header />
                    <InputOutput />
                    <Operations />
                </div>
            </div>
        </div >
    )
}

