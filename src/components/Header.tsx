import { SwitchTheme } from "./SwitchTheme";
import { useBurger } from "../store/burger";
import { useCalculatorStore } from "../store/calculator";
export function Header() {
    const { isOpen, setIsOpen } = useBurger();
    const { redo } = useCalculatorStore();
    return (
        <header className="!pt-10 !pr-7 !pl-7">
            <div className="flex justify-between gap-1 items-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group w-[36px] rounded-lg border-2 border-text"
                >
                    <div className="grid justify-items-center gap-1.5">
                        <span
                            className={`h-1 w-9 bg-[#373737] dark:bg-[#fbfbfb] rounded-full transition-all duration-500 ${isOpen ? "rotate-45 translate-y-2.5" : ""
                                }`}
                        ></span>
                        <span
                            className={`h-1 w-9 bg-[#373737] dark:bg-[#fbfbfb] rounded-full transition-all duration-500 ${isOpen ? "scale-x-0" : ""
                                }`}
                        ></span>
                        <span
                            className={`h-1 w-9 bg-[#373737] dark:bg-[#fbfbfb] rounded-full transition-all duration-500 ${isOpen ? "-rotate-45 -translate-y-2.5" : ""
                                }`}
                        ></span>
                    </div>
                </button>

                {/* theme change */}
                <SwitchTheme />

                {/* REDO */}
                <button className="recent" onClick={() => redo()}>
                    <svg width="40" height="40" viewBox="0 0 30 30" fill="none" className="fill-current text-[#373737ab] dark:text-[#FBFBFB] transition-all duration-500 transform active:rotate-[360deg]" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.7061 7.99805H14.2969C14.168 7.99805 14.0625 8.10352 14.0625 8.23243V16.2979C14.0625 16.374 14.0977 16.4443 14.1592 16.4883L19.002 20.0244C19.1074 20.1006 19.2539 20.0801 19.3301 19.9746L20.168 18.832C20.2471 18.7236 20.2236 18.5772 20.1182 18.5039L15.9404 15.4834V8.23243C15.9404 8.10352 15.835 7.99805 15.7061 7.99805ZM22.1455 10.2012L26.7393 11.3232C26.8857 11.3584 27.0293 11.2471 27.0293 11.0977L27.0527 6.36622C27.0527 6.16993 26.8272 6.0586 26.6748 6.18165L22.0576 9.78809C22.0227 9.81509 21.9962 9.85138 21.981 9.89281C21.9658 9.93423 21.9626 9.97909 21.9718 10.0222C21.981 10.0654 22.0021 10.1051 22.0329 10.1367C22.0636 10.1684 22.1026 10.1907 22.1455 10.2012ZM27.0586 19.0225L25.3975 18.4512C25.3396 18.4313 25.2762 18.4349 25.2209 18.4612C25.1656 18.4875 25.1227 18.5344 25.1016 18.5918C25.0459 18.7412 24.9873 18.8877 24.9258 19.0342C24.4043 20.2676 23.6572 21.3779 22.7022 22.3301C21.7577 23.2775 20.6384 24.0327 19.4063 24.5537C18.1299 25.0934 16.7579 25.3704 15.3721 25.3682C13.9717 25.3682 12.6152 25.0957 11.3379 24.5537C10.1058 24.0327 8.98647 23.2775 8.042 22.3301C7.08985 21.3779 6.34278 20.2676 5.81836 19.0342C5.28169 17.7571 5.00673 16.3853 5.00977 15C5.00977 13.5996 5.28223 12.2402 5.82422 10.9629C6.34571 9.7295 7.09278 8.61915 8.04785 7.667C8.99233 6.71959 10.1116 5.96443 11.3438 5.44336C12.6152 4.90137 13.9746 4.62891 15.375 4.62891C16.7754 4.62891 18.1318 4.90137 19.4092 5.44336C20.6413 5.96443 21.7606 6.71959 22.7051 7.667C23.0039 7.96876 23.2852 8.28223 23.543 8.61329L25.2949 7.24219C22.9893 4.29493 19.4004 2.39942 15.3691 2.40235C8.34961 2.40528 2.71289 8.10645 2.78321 15.1289C2.85352 22.0283 8.46387 27.5977 15.375 27.5977C20.8096 27.5977 25.4385 24.1524 27.2022 19.3272C27.2461 19.2041 27.1816 19.0664 27.0586 19.0225Z" />
                    </svg>
                </button>
            </div>
        </header>
    )
}