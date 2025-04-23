import { create } from "zustand";

// Define the structure of a notification object
interface NotificationProps {
  id: string; // Unique identifier for the notification
  type: "success" | "error" | "info" | "warning"; // Type of notification
  message: string; // The main message or content of the notification
  title?: string; // Optional title for the notification
  timestamp?: Date; // Timestamp of when the notification was created
  isRead?: boolean; // Whether the notification has been read
  onActionClick?: () => void; // Callback function for the action button
}

interface NotificationStore {
  notification: NotificationProps[]; // Array of notification objects
  setNotification: (user: NotificationProps) => void; // Function to add a notification to the store
}


// Create a Zustand store for managing notification data
export const useNotification = create<NotificationStore>((set) => ({
  notification: [], // Initialize the notification array as empty
  setNotification: (notification) => 
    set((state) => ({ notification: [...state.notification, notification] })), // Add a new notification to the array
}));
