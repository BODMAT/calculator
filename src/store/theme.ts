import { create } from 'zustand';

interface ThemeState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
            document.documentElement.classList.toggle('light', newTheme === 'light');
            return { theme: newTheme };
        }),
}));
