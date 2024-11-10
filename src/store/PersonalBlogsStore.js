import { create } from "zustand";

const usePersonalBlogsStore = create((set) => ({
    blogs: [],
    setBlogs: (blogs) => set({ blogs }),
}));

export { usePersonalBlogsStore };
