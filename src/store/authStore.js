import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  accessToken: null,

  setUser: (userData) =>
    set({
      user: {
        id: "",
        // password: "",
        nickname: "",
        avatar: userData.avatar
      },
      accessToken: userData.accessToken
    }),
  clearUser: () => set({ user: null, accessToken: null })
}));

export default useUserStore;
