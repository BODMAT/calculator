import { useForm } from "react-hook-form"
export function InputOutput() {

    const { register, setValue, watch } = useForm<{ expression: string }>({
        defaultValues: { expression: "" },
        mode: "onChange",
    });
    const value = watch("expression");

    const calcExpression = (expr: string) => {
        const sanitizedExpr = expr.replace(/[*+\-/]$/, "");
        try {
            return sanitizedExpr ? eval(sanitizedExpr).toString() : "0";
        } catch {
            return "Error";
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setValue("expression", calcExpression(value), { shouldValidate: true });
        }
    };

    const containsOperator = /[+\-*/]/.test(value.slice(1));

    return (
        <div className="w-full flex flex-col gap-2 !p-[9px_34px] min-h-[100px]" >
            <input
                {...register("expression", {
                    onChange: (e) => {
                        const filteredValue = e.target.value
                            .replace(/[^0-9+\-*/()]/g, "")  // Видалити всі символи, крім дозволених
                            .replace(/([+\-*/])\1+/g, "$1"); // Запобігти двом операторам підряд

                        setValue("expression", filteredValue, { shouldValidate: true });
                    },
                })}
                className="w-full text-right text-adaptive-current text-[#373737] dark:text-[#FBFBFB] transition-colors duration-500"
                autoFocus
                onKeyDown={handleKeyDown}
            />
            <div className="w-full text-right text-adaptive-prev text-[#3737376d] dark:text-[#fbfbfb72] transition-colors duration-500">
                {(value && containsOperator) ? `= ${calcExpression(value)}` : ""}
            </div>
        </div>
    )
}