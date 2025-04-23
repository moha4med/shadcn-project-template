import { z } from "zod";

// Define a schema for user registration form validation
export const RegisterSchema = z.object({
  // Validates the first name: must be a non-empty string
  firstName: z.string().min(1, "First name is required"),

  // Validates the last name: must be a non-empty string
  lastName: z.string().min(1, "Last name is required"),

  // Validates that the email is a string and follows a valid email format
  email: z.string().email("Invalid email address"),

  // Validate the password with multiple rules:
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length of 8 characters
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter", // Must include at least one uppercase letter
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter", // Must include at least one lowercase letter
    })
    .regex(/[0-9]/, { 
      message: "Password must contain at least one number", // Must include at least one numeric digit
    })
    .regex(/[!@#$%^&*()_\-+={[}\]|:;"'<,>.?]/, {
      message: "Password must contain at least one special character", // Must include at least one special character
    }),

  confirmPassword: z.string(), // Validate the confirm password field
})
// Add a refinement to ensure that the password and confirmPassword fields match
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match", // Error message if passwords do not match
  path: ["confirmPassword"], // Path to the field where the error should be displayed
});

// Define a TypeScript type for the validated schema
export type RegisterForm = z.infer<typeof RegisterSchema>;
