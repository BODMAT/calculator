import { AnimatePresence, motion } from "framer-motion";
import { useBurger } from "../store/burger";
import { CustomButton } from "./CustomButton";

export function Operations() {
    const { isOpen } = useBurger();
    return (
        <section className="min-h-full w-full relative z-3 rounded-[40px] overflow-hidden">
            <div className="absolute inset-0 rounded-[40px] bg-blue-200 bg-opacity-20 transition-opacity duration-500 dark:opacity-0"></div>
            <div className="absolute inset-0 rounded-[40px] shadow-[0_-5px_70px_0_rgba(0,_0,_0,_0.1)] bg-[rgba(65,110,135,0.4)] transition-opacity duration-500 opacity-0 dark:opacity-100"></div>

            <div className="w-full relative z-4 !p-[26px_34px] max-[400px]:!p-[10px] text-[#373737] dark:text-[#FBFBFB] transition-all duration-500">

                {/* GRID FOR BUTTONS */}
                <div className={`grid grid-rows-5 gap-[20px] max-[400px]:gap-[10px] grid-cols-4 grid-auto-flow-column`}>
                    <div className="col-span-3 grid grid-cols-3 grid-rows-1 gap-[20px] max-[400px]:gap-[10px] bg-[#ffffff4f] rounded-[100px]">
                        {/* UNDO */}
                        <CustomButton hasBG={false}>UNDO</CustomButton>
                        {/* Clear all */}
                        <CustomButton hasBG={false}>C</CustomButton>

                        <CustomButton hasBG={false}>%</CustomButton>
                    </div>
                    {/* Basic operations */}
                    <div className="row-span-5 grid grid-cols-1 grid-rows-5 gap-[20px] max-[400px]:gap-[10px] bg-[#ffffff4f] rounded-[30px] overflow-hidden">
                        <CustomButton hasBG={false}>/</CustomButton>
                        <CustomButton hasBG={false}>*</CustomButton>
                        <CustomButton hasBG={false}>-</CustomButton>
                        <CustomButton hasBG={false}>+</CustomButton>
                        <CustomButton>=</CustomButton>
                    </div>

                    {/* nums */}
                    <CustomButton>1</CustomButton>
                    <CustomButton>2</CustomButton>
                    <CustomButton>3</CustomButton>
                    <CustomButton>4</CustomButton>
                    <CustomButton>5</CustomButton>
                    <CustomButton>6</CustomButton>
                    <CustomButton>7</CustomButton>
                    <CustomButton>8</CustomButton>
                    <CustomButton>9</CustomButton>
                    <CustomButton>.</CustomButton>
                    <CustomButton>0</CustomButton>
                    <CustomButton>00</CustomButton>

                    {/* addition operations */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                className="col-span-4 grid grid-rows-1 grid-cols-4 gap-[20px] max-[400px]:gap-[10px] bg-[#ffffff4f] rounded-[50px]"
                                initial={{ opacity: 0, transform: 'translateY(100px)' }}
                                animate={{ opacity: 1, transform: 'translateX(0)' }}
                                exit={{ opacity: 0, transform: 'translateY(100px)' }}
                                transition={{ duration: 0.1, ease: 'easeInOut' }}
                            >
                                <CustomButton hasBG={false}>√</CustomButton>
                                <CustomButton hasBG={false}>^</CustomButton>
                                <CustomButton hasBG={false}>ln</CustomButton>
                                <CustomButton hasBG={false}>π</CustomButton>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>


            </div>
        </section>
    )
}