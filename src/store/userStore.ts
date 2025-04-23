import { create } from 'zustand';

// Define the structure of a user object
interface UserProps {
  id: string; // Unique identifier for the user
  name: string; // Name of the user
  email: string; // Email address of the user
}

interface UserStore {
  user: UserProps[]; // Array of user objects
  setUser: (user: UserProps) => void; // Function to add a user to the store
}

// Create a Zustand store for managing user data
export const useUser = create<UserStore>((set) => ({
  user: [], // Initialize the user array as empty
  setUser: (user) => 
    set((state) => ({ user: [...state.user, user] })), // Add a new user to the array
}));
