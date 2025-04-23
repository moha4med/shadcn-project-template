import { z } from "zod";

// Defining a schema for login form validation
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"), // Validates that the email is a string and follows a valid email format
  password: z.string().min(8, "Password must be at least 8 characters"), // Validates that the password is a string with a minimum length of 8 characters
});

// Define a TypeScript type for the validated schema
export type LoginForm = z.infer<typeof LoginSchema>;
