import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null,
      accessToken: null,
      refreshToken: null,
      setAuth: ({ user, role, accessToken, refreshToken }) =>
        set({ user, role, accessToken, refreshToken }),
      setRole: (role) => set({ role }),
      clearAuth: () => set({ user: null, role: null, accessToken: null, refreshToken: null })
    }),
    { name: "sjcs-auth" }
  )
);
