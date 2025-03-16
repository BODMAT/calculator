import { create } from 'zustand';

type Burger = {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
};

export const useBurger = create<Burger>((set) => ({
    isOpen: false,
    setIsOpen: (state) => set({ isOpen: state }),
}));
