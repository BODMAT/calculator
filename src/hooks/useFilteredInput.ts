import { useCallback } from "react";

export const useFilteredInput = () => {
    return useCallback((input: string): string => {
        return input
            .replace(/[^0-9+\-*/().√^lneπ%]/g, "") // Видаляє, крім цифр, операторів та дужок
            .replace(/^(?!-)[+\-*/]/, "") // Видаляє всі знаки з першого місця, крім "-"
            .replace(/([0-9])\(/g, "$1*(") // Замінює "число(" на "число*("
            .replace(/\)([0-9])/g, ")*$1") // Замінює ")число" на ")*число"
            .replace(/([+\-*/√^lnπ%])\./g, "$1") // Видаляє крапку після оператора
            .replace(/^(0{1,})(?=\.)/, "0") // Залишає тільки один нуль перед десятковою крапкою
            .replace(/\.\(/g, "") // Забороняє "(."
            .replace(/\(\)/g, "") // Забороняє "()"
            .replace(/\.\)/g, "") // Забороняє ".)"
            // unhistoryble
            .replace(/(\d+)%/g, (match: string, number: string): string => {
                const percentageValue = (Number(number) / 100).toString();
                return percentageValue;
            })
            .replace(/([+\-*/])\1+/g, "$1") // Запобігає двом операторам
            .replace(/(\d+)\.(?=\d*\.)/g, (match: string, number: string): string => `${number}`); // Видаляє зайві крапки
    }, []);
};