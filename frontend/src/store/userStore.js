import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// The 'persist' middleware automatically saves the user's session
// in the browser's localStorage, so they stay logged in after a refresh.
const useUserStore = create(
  persist(
    (set) => ({
      // This is the default state: no user is logged in.
      userInfo: null,

      // This is an "action" that components can call to log a user in.
      // It takes the user data from the API and saves it in the state.
      login: (userData) => set({ userInfo: userData }),

      // This action logs the user out by clearing their data from the state.
      logout: () => set({ userInfo: null }),
    }),
    {
      name: 'user-session', // Unique name for the localStorage item
    }
  )
);

export default useUserStore;