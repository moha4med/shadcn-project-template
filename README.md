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

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Firebase Project](https://firebase.google.com/) for authentication setup.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/moha4med/shadcn-project-template.git
   cd shadcn-project-template
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Configure Firebase:
   - Add your Firebase configuration in the `.env` file in the root directory:

     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Built With

- [Next.js](https://nextjs.org) - React Framework
- [Firebase Authentication](https://firebase.google.com) - Firebase services for user authentication.
- [Zod](https://github.com/colinhacks/zod) - Input validation library.
- [Zustand](https://github.com/pmndrs/zustand) - State management library.
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework.
- [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript.
