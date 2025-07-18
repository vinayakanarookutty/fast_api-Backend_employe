import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sessionSchema } from '../validation';

interface User {
  email?: string;
  name?: string;
}


interface UserState {
  userDetails: User;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userDetails: {},
      loginUser: (user: User) => {
        try {
          sessionSchema.parse(user); // Validate the user data
          set(() => ({ userDetails: user }));
        } catch (e: any) {
          console.error('Validation error:', e.errors);
        }
      },
      logoutUser: () => set(() => ({ userDetails: {} })),
    }),
    {
      name: 'user-store', // unique name for the localStorage key
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);