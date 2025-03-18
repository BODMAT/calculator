import { create } from "zustand";

interface Command {
    expression: string; // Вираз для команди
}

interface CalculatorState {
    expression: string;
    history: Command[]; // Історія виконаних команд
    undone: Command[]; // Черга для відкатів
    execute: (expression: string) => void; // Виконати обчислення
    undo: () => void; // Відкатити останнє значення
    redo: () => void; // Повторити відкат
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
    expression: "",
    history: [],
    undone: [],
    execute: (expression) => set((state) => {
        const lastCommand = state.history[state.history.length - 1];

        // Якщо вираз такий самий, оновлюємо останню команду
        if (lastCommand && lastCommand.expression === expression) {
            return {
                expression,
                history: state.history, // Оновлюємо останню команду
                undone: [], // Очистити чергу redo
            };
        } else {
            // Якщо вираз інший, додаємо нову команду
            const newHistory = [...state.history, { expression }];
            console.log('Current history added:', newHistory);
            return {
                expression,
                history: newHistory,
                undone: [], // Очистити чергу redo при додаванні нової команди
            };
        }

    }),
    undo: () => set((state) => {
        const lastCommand = state.history[state.history.length - 1];
        if (!lastCommand) return state;
        console.log('Expression', state.expression);
        console.log('Current last command:', lastCommand);
        const newHistory = state.history.slice(0, -1);
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

        // Переміщаємо останню команду з undone назад в history
        return {
            expression: lastUndone.expression,
            history: [...state.history, lastUndone], // Додаємо команду назад в історію
            undone: state.undone.slice(1), // Видаляємо її з undone
        };
    }),
}));
