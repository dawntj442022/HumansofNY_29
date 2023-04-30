import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  posts: [],
  setPosts: (posts) => set((state) => ({ ...state, posts })),
  logout: () => set(() => ({ user: null })),
  getUserData: async (token) => {
    const res = await fetch("/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to get user data from server");
    }
  },
}));

export { useUserStore };
