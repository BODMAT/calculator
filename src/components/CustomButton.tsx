import { useCalculatorStore } from "../store/calculator";

interface IProps {
    hasBG?: boolean;
    children: string;
}

export function CustomButton({ hasBG = true, children }: IProps) {
    const { undo } = useCalculatorStore();  // Або будь-яка інша функція, яку потрібно викликати

    const handleClick = () => {
        console.log("Button clicked:", children);
        if (children === "UNDO") {
            undo();  // Викликаємо undo, якщо текст на кнопці - UNDO
        }
    };

    return (
        <button
            className={`min-w-[60px] h-[60px] max-[400px]:min-w-[50px] max-[400px]:min-h-[50px] rounded-[100px] text-adaptive-button flex justify-center items-center transition-colors duration-100 hover:bg-[#ffffff80] active:bg-[#ffffff99] ${hasBG && "bg-[#ffffff4f] shadow-[0_3px_15px_0_rgba(0,0,0,0.05)]"}`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}
