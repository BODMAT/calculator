
import { useCalculatorStore } from "../store/calculator";

interface IProps {
    hasBG?: boolean;
    children: string;
}

export function CustomButton({ hasBG = true, children }: IProps) {
    const { undo, clear } = useCalculatorStore();

    //імітація вводу текста через кнопки (+автофокус)
    const typeText = (text: string) => {
        const input = document.getElementById("input") as HTMLInputElement;
        if (!input) return;

        input.focus();

        [...text].forEach(char => {
            const selectionStart = input.selectionStart ?? input.value.length;
            const selectionEnd = input.selectionEnd ?? input.value.length;

            const eventDown = new KeyboardEvent("keydown", { key: char, bubbles: true });
            input.dispatchEvent(eventDown);

            const eventPress = new KeyboardEvent("keypress", { key: char, bubbles: true });
            input.dispatchEvent(eventPress);

            const eventBeforeInput = new InputEvent("beforeinput", {
                bubbles: true,
                cancelable: true,
                data: char,
                inputType: "insertText",
            });

            input.dispatchEvent(eventBeforeInput);

            if (!eventBeforeInput.defaultPrevented) {
                const clipboardData = new DataTransfer();
                clipboardData.setData("text/plain", char);

                const eventPaste = new ClipboardEvent("paste", {
                    bubbles: true,
                    cancelable: true,
                    clipboardData: clipboardData,
                });

                input.dispatchEvent(eventPaste);
                input.setRangeText(char, selectionStart, selectionEnd, "end");
            }

            const eventInput = new Event("input", { bubbles: true });
            input.dispatchEvent(eventInput);

            const eventUp = new KeyboardEvent("keyup", { key: char, bubbles: true });
            input.dispatchEvent(eventUp);
        });
    };

    //імітація Enter (+автофокус)
    const pressEnter = () => {
        const input = document.getElementById("input") as HTMLInputElement;
        if (!input) return;

        input.focus();

        const eventDown = new KeyboardEvent("keydown", { key: "Enter", bubbles: true });
        const eventPress = new KeyboardEvent("keypress", { key: "Enter", bubbles: true });
        const eventUp = new KeyboardEvent("keyup", { key: "Enter", bubbles: true });

        input.dispatchEvent(eventDown);
        input.dispatchEvent(eventPress);
        input.dispatchEvent(eventUp);

        const form = input.closest("form");
        if (form) {
            const eventSubmit = new Event("submit", { bubbles: true, cancelable: true });
            form.dispatchEvent(eventSubmit);
        }
    };

    const handleClick = () => {
        console.log("Button clicked:", children);

        switch (children) {
            case "UNDO":
                undo();
                break;
            case "C":
                clear();
                break;
            case "=":
                pressEnter();
                break;
            default:
                typeText(children);
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
