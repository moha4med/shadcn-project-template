import axiosInstance from "@/lib/axiosInstance";

// Function to register a new user
export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    // Send a POST request to the /api/register endpoint with user details
    const response = await axiosInstance.post("/api/register", {
      firstName,
      lastName,
      email,
      password
    });

    // Return the response data if the request is successful
    return response.data;
  } catch (error: any) {
    // Throw an error with a descriptive message if the request fails
    throw new Error("Login failed: " + (error.response?.data?.message || error.message));
  }
};


// Function to initiate a password reset for a user
export const resetPassword = async (email: string) => {
  try {
    // Send a POST request to the /api/reset-password endpoint with the user's email
    const response = await axiosInstance.post("/api/reset-password", { email });

    // Return the response data if the request is successful
    return response.data;
  } catch (error: any) {
    // Throw an error with a descriptive message if the request fails
    throw new Error("Password reset failed: " + (error.response?.data?.message || error.message));
  }
};

// Function to verify the password reset code for a user
export const verifyCode = async (email: string, code: number) => {
  try {
    // Send a POST request to the /api/verify-code endpoint with the user's email and code
    const response = await axiosInstance.post("/api/verify-code", { email, code });

    // Return the response data if the request is successful
    return response.data;
  } catch (error: any) {
    // Throw an error with a descriptive message if the request fails
    throw new Error("Code verification failed: " + (error.response?.data?.message || error.message));
  }
}

// Function to update the user's password
export const updatePassword = async (email: string, password: string) => {
  try {
    // Send a POST request to the /api/update-password endpoint with the user's email and new password
    const response = await axiosInstance.post("/api/update-password", { email, password });

    // Return the response data if the request is successful
    return response.data;
  } catch (error: any) {
    // Throw an error with a descriptive message if the request fails
    throw new Error("Password update failed: " + (error.response?.data?.message || error.message));
  }
}
