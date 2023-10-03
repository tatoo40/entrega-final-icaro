import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserLogout = create((set) => ({
  isLoggedIn: false,
  user: null,
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
}));

export default useUserLogout;


