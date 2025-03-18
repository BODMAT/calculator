import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
    //! новий стан записується не тільки в сам Zustand-стор, але й у сховище (за замовчуванням localStorage), це робить persist, слухаючи зміни стану
    //! https://zustand.docs.pmnd.rs/middlewares/persist#persist
    persist(
        (set, get) => ({
            theme: 'light', // Початкове значення, буде перезаписано з localStorage
            toggleTheme: () => {
                const newTheme = get().theme === 'light' ? 'dark' : 'light';
                document.documentElement.classList.toggle('dark', newTheme === 'dark');
                document.documentElement.classList.toggle('light', newTheme === 'light');
                set({ theme: newTheme });
            },
        }),
        {
            name: 'theme-storage', // Ключ у localStorage
        }
    )
);
;
