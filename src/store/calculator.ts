import { create } from "zustand";
import { persist, devtools } from 'zustand/middleware';
interface Command {
    expression: string;
}

interface CalculatorState {
    expression: string;
    history: Command[];
    undone: Command[];
    execute: (expression: string, alwaysAdd?: boolean) => void;
    undo: () => void;
    redo: () => void;
    clear: () => void;
}

export const useCalculatorStore = create<CalculatorState>()(
    persist(
        devtools(
            (set) => ({
                expression: "",
                history: [
                    { expression: "" }
                ],
                undone: [],
                execute: (expression, alwaysAdd = false) => set((state) => {
                    // Перевірка, чи можна додати вираз в історію 
                    let operatorIndex = expression.split('')
                        .reverse()
                        .findIndex(char => /[+\-*/^√()%]/.test(char));
                    alwaysAdd ? operatorIndex = 0 : operatorIndex;
                    if (operatorIndex !== -1) {
                        const inputExpression = expression.slice(0, expression.length - operatorIndex);
                        if (inputExpression) {
                            const lastCommand = state.history[state.history.length - 1];

                            // Якщо вираз такий самий, оновлюємо останню команду
                            if (lastCommand && lastCommand.expression === inputExpression) {
                                return {
                                    expression,
                                    history: state.history, // Оновлюємо останню команду
                                    undone: [], // Очистити чергу redo
                                };
                            } else {
                                // Якщо вираз інший, додаємо нову команду
                                const newHistory = [...state.history, { expression: inputExpression }];
                                console.log('Current history added:', newHistory);
                                return {
                                    expression,
                                    history: newHistory,
                                    undone: [], // Очистити чергу redo при додаванні нової команди
                                };
                            }
                        }
                    }
                    return state;
                }),
                undo: () => set((state) => {
                    const lastCommand = state.history[state.history.length - 1];
                    if (!lastCommand) return state;
                    console.log('Current last command:', lastCommand);
                    // state.history.length > 1 - нульовий пустий обєкт неочищаємий
                    const newHistory = state.history.length > 1 ? state.history.slice(0, -1) : state.history;
                    const newUndone = [lastCommand, ...state.undone];

                    return {
                        expression: lastCommand.expression,
                        history: newHistory,
                        undone: newUndone,
                    };
                }),

                redo: () => set((state) => {
                    const lastUndone = state.undone[0];
                    if (!lastUndone) return state; // Якщо немає команд для redo

                    const newHistory = [...state.history, lastUndone]; // Додаємо останню скасовану команду назад в історію
                    const newUndone = state.undone.slice(1); // Видаляємо її з undone

                    return {
                        expression: lastUndone.expression, // Відновлюємо вираз
                        history: newHistory, // Оновлюємо історію
                        undone: newUndone, // Оновлюємо стек redo
                    };
                }),
                clear: () => set(() => ({
                    expression: "",
                    history: [
                        { expression: "" }
                    ],
                    undone: [],
                })),
            })),
        {
            name: 'calculator-storage', // Unique name
        }
    )
)
