# ShadCN Project Template

This is a **ShadCN-based project template** bootstrapped with [Next.js](https://nextjs.org). It provides a modern and scalable starting point for building web applications with authentication, reusable components, and other developer-friendly features.

## Features

- **Authentication**:
  - Login, Register and Forgot Password pages.
  - Input validation using [Zod](https://github.com/colinhacks/zod) for type safety.

- **Reusable Components**:
  - Pre-built UI components inspired by [ShadCN](https://shadcn.dev/).

- **State Management**:
  - Lightweight and efficient state management using [Zustand](https://github.com/pmndrs/zustand).

- **Custom Hooks**:
  - Custom React hooks for reusable logic and functionality.

- **Project Structure**:
  - Highly modular structure for scalability and maintainability.

- **Utility Functions**:
  - General utility functions to simplify development tasks.

- **Styling**:
  - Global and component-specific styles managed via Tailwind CSS.

- **TypeScript Support**:
  - Strong type safety with TypeScript across the entire project.

## Folder Structure

```plaintext
src/
├── app/                     # Next.js app directory
│   ├── auth/                # Authentication-related pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   │   ├── reset-password/
│   │   │   ├── verify-code/
│   │   │   └── verify-email/
├── components/              # Reusable UI components
│   ├── custom/              # Custom reusable components
│   ├── ui/                  # ShadCN components
│   ├── …(other files)       # ShadCN blocks files
├── hooks/                   # Custom React hooks
├── schemas/                 # Zod schemas for validation
├── services/                # API calls and business logic
├── store/                   # State management (Zustand)
├── styles/                  # Global and component-specific styles
├── utils/                   # Utility functions
└── types/                   # TypeScript types and interfaces
```