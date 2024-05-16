import { create } from "zustand";

export const useGlobalStore = create((set) => ({
  activeUrl: "",
  setActiveUrl: (url) => set({ activeUrl: url }),
  user: {
    role: "",
    token: "",
  },
  setUser: (data) => {
    set((state) => ({
      user: {
        ...state.user,
        ...data,
      },
    }));
  },
  noti: 0,
  setNoti: (num) => {
   set({noti:num})
  },
}));
