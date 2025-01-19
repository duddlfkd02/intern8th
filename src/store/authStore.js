import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setUser: (userData) =>
        set({
          user: {
            id: userData.userId,
            nickname: userData.nickname,
            avatar: userData.avatar
          },
          accessToken: userData.accessToken
        }),
      clearUser: () => set({ user: null, accessToken: null })
    }),
    {
      name: "user-storage", // 로컬 스토리지 키
      onRehydrateStorage: () => (state) => {
        console.log("Rehydrate state", state);
        if (!state?.accessToken) {
          console.warn("access token 기간이 만료되었거나 존재하지 않습니다.");
        }
      }
    }
  )
);

export default useUserStore;
