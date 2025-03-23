import { useForm } from "react-hook-form";
import { useCalculatorStore } from "../store/calculator";
import { useEffect } from "react";
import { useFilteredInput } from "../hooks/useFilteredInput";

export function InputOutput() {
    const { execute, expression, history } = useCalculatorStore();
    const { register, setValue, watch } = useForm<{ inputExpression: string }>({
        defaultValues: { inputExpression: "" },
        mode: "onChange",
    });
    const value = watch("inputExpression");

    useEffect(() => {
        setValue("inputExpression", expression);
    }, [expression, history]);

    const calcinputExpression = (expr: string) => {
        const sanitizedExpr = expr
            .replace(/√/g, "Math.sqrt")    // Заміна √ на Math.sqrt
            .replace(/\^/g, "**")          // Заміна ^ на **
            .replace(/ln/g, "Math.log")    // Заміна ln на Math.log
            .replace(/π/g, Math.PI.toFixed(5)) // Заміна π на Math.PI з точністю до 2 знаків
            .replace(/\b0{2,}\b/g, "0")  // Заміна чисел, що складаються з двох і більше нулів перед крапкою, на "0"
            .replace(/[\+\-\*\/]$/, ""); //видаляє останній оператор якщо є
        try {
            return sanitizedExpr ? eval(sanitizedExpr).toString() : "0";
        } catch {
            return "Error";
        }
    };

    //async cause of useEffect that upd value after setValue
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            await execute(value, true);
            const result = calcinputExpression(value);
            await execute(result, true);

            setValue("inputExpression", result, { shouldValidate: true });
        }
    };

    const checkForIfHistorible = (value: string) => {
        // шукаю перший оператор з кінця
        const operatorIndex = value.split('').reverse().findIndex(char => /[+\-*/]/.test(char));
        if (operatorIndex !== -1) {
            // якщо знайшов, то беру все що перед ним
            const inputExpression = value.slice(0, value.length - operatorIndex);
            if (inputExpression) { //прибираю випадок коли починаю з мінуса
                // так як це може бути не перша операція, то відправляю в історію або оновлюю
                execute(inputExpression);
            }
        }
    };

    const containsOperator = /[+\-*/]/.test(value.slice(1));
    const filteredInput = useFilteredInput();
    return (
        <div className="w-full flex flex-col gap-2 !p-[9px_34px] min-h-[100px]" >
            {/* MY INPUT */}
            <input
                {...register("inputExpression", {
                    onChange: (e) => {
                        console.log("onChange trigg");
                        const filteredValue = filteredInput(e.target.value);
                        setValue("inputExpression", filteredValue, { shouldValidate: true });
                        checkForIfHistorible(filteredValue);
                    },
                })}
                className="w-full text-right text-adaptive-current text-[#373737] dark:text-[#FBFBFB] transition-colors duration-500"
                id="input"
                autoFocus
                onKeyDown={handleKeyDown}
            />
            {/* MY OUTPUT */}
            <div className="w-full text-right text-adaptive-prev text-[#3737376d] dark:text-[#fbfbfb72] transition-colors duration-500">
                {(value && containsOperator) ? `= ${calcinputExpression(value)}` : ""}
            </div>
        </div>
    )
}
