import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ThemeState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
    //! https://zustand.docs.pmnd.rs/middlewares/persist#persist
    persist(
        devtools(
            (set, get) => ({
                theme: 'light',
                toggleTheme: () => {
                    const newTheme = get().theme === 'light' ? 'dark' : 'light';
                    document.documentElement.classList.toggle('dark', newTheme === 'dark');
                    document.documentElement.classList.toggle('light', newTheme === 'light');
                    set({ theme: newTheme });
                },
            })
        ),
        {
            name: 'theme-storage', // Ключ у localStorage
        }
    )
);