import { create } from "zustand";
import { axios_auth } from "../../global/config";
export const useLayoutStore = create((set) => ({
  isAuth: false,
  checkAuth: async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios_auth.get("user/checkAuth");
        console.log(res.data);
        if (res.data.status === 200) {
          set(() => ({ isAuth: true }));

          return;
        }

        set(() => ({ isAuth: false }));
      }
    } catch (error) {
      set(() => ({ isAuth: false }));
    }
  },
}));
