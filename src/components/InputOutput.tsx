import { useForm } from "react-hook-form"
import { useCalculatorStore } from "../store/calculator"
import { useEffect } from "react";
export function InputOutput() {
    const { execute, expression, history } = useCalculatorStore();
    const { register, setValue, watch } = useForm<{ inputExpression: string }>({
        defaultValues: { inputExpression: "" },
        mode: "onChange",
    });
    const value = watch("inputExpression");

    // При зміні виразу в інпуті, оновлюємо його в сторінці
    useEffect(() => {
        setValue("inputExpression", expression);
    }, [expression, history]);

    const calcinputExpression = (expr: string) => {
        const sanitizedExpr = expr.replace(/[*+\-/]$/, "");
        try {
            return sanitizedExpr ? eval(sanitizedExpr).toString() : "0";
        } catch {
            return "Error";
        }
    };

    //async cause of useEffect that upd value after  setValue("inputExpression", result, { shouldValidate: true });
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            await execute(value)
            const result = calcinputExpression(value);
            setValue("inputExpression", result, { shouldValidate: true });
        }
    };

    //!=================
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

    return (
        <div className="w-full flex flex-col gap-2 !p-[9px_34px] min-h-[100px]" >
            <input
                {...register("inputExpression", {
                    onChange: (e) => {
                        const filteredValue = e.target.value
                            .replace(/[^0-9+\-*/().]/g, "")   // Видалити всі символи, крім дозволених
                            .replace(/([+\-*/.])\1+/g, "$1") // Запобігає двом операторам або крапкам підряд
                            .replace(/([0-9])\(/g, "$1*(") // Замінює "число(" на "число*("
                            .replace(/\)([0-9])/g, ")*$1") // Замінює ")число" на ")*число"
                            .replace(/^(?!-)[+\-*/]/, "") // Видаляє всі знаки з першого (нульового) місця, крім "-"
                            .replace(/(^|[+\-*/])0(?=\d)/g, "$10.") // Замінює "0" перед числом на "0."
                            .replace(/([+\-*/])\./g, "$1") // Видаляє крапку після оператора
                            .replace(/^(0{1,})(?=\.)/, "0") // Залишає тільки один нуль перед десятковою крапкою
                            .replace(/\.(?=.*\.)/g, "") // Забороняє введення більше ніж однієї крапки
                            .replace(/^0+(?=\d)/, "") // Видаляє всі нулі з початку числа

                        setValue("inputExpression", filteredValue, { shouldValidate: true });
                        checkForIfHistorible(filteredValue);
                    },
                })}
                className="w-full text-right text-adaptive-current text-[#373737] dark:text-[#FBFBFB] transition-colors duration-500"
                autoFocus
                onKeyDown={handleKeyDown}
            />
            <div className="w-full text-right text-adaptive-prev text-[#3737376d] dark:text-[#fbfbfb72] transition-colors duration-500">
                {(value && containsOperator) ? `= ${calcinputExpression(value)}` : ""}
            </div>
        </div>
    )
}