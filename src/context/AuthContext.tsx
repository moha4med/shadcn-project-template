"use client";

import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the authentication context
interface AuthContextType {
  user: { email: string } | null; // Represents the currently logged-in user or null if no user is logged in
  login: (credentials: { email: string; password: string }) => void; // Function to log in a user
  logout: () => void; // Function to log out the user
}

// Create the authentication context with an initial value of null
export const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component to wrap the application and provide authentication context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State to manage the currently logged-in user
  const [user, setUser] = useState<{ email: string } | null>(null);

  // Function to log in a user by setting the user state
  const login = (credentials: { email: string; password: string }) => {
    setUser({ email: credentials.email });
  };

  // Function to log out the user by clearing the user state
  const logout = () => {
    setUser(null); // Clear the user state to log out
  };

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
