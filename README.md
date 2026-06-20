# Aether AI - Full-Stack Application

## Project Overview

Aether AI is a premium, modern SaaS platform designed to showcase full-stack engineering capabilities, architectural best practices, and meticulous UI/UX design. It features a high-conversion marketing website, a fully authenticated internal dashboard, role-based access control (RBAC), and full CRUD functionality for managing AI agents and user accounts.

Built with **Next.js 14 (App Router)**, **React**, **Tailwind CSS**, and **MongoDB**, this application demonstrates a production-ready architecture with secure authentication, modern serverless deployment on Vercel, and continuous integration via GitHub Actions.

## Links
- **Live Demo**: [https://sanjjay-moksha-media-group-assessme.vercel.app/](https://sanjjay-moksha-media-group-assessme.vercel.app/)
- **GitHub Repository**: [https://github.com/sanjayachari/moksha-media-group-assessment](https://github.com/sanjayachari/moksha-media-group-assessment)

---

## Features Implemented

### 1. Public Marketing Website
- **Modern Landing Page**: High-performance hero section, features grid, pricing teaser, FAQ, and interactive elements.
- **Dynamic Routing**: Secondary pages including "About Us", "Solutions", and "Services".
- **Premium UI/UX**: Custom micro-animations, glassmorphism, responsive grid layouts, and advanced gradient styling for a high-end feel.
- **SEO Optimized**: Semantic HTML5 and built-in Next.js metadata optimizations.

### 2. Authentication System
- **NextAuth.js Integration**: Secure, JWT-based authentication flow.
- **Custom Login & Registration**: Clean, responsive forms with rigorous client-side and server-side validation.
- **Bcrypt Security**: Passwords securely hashed using `bcryptjs` to ensure broad compatibility across serverless environments.
- **Error Handling**: Graceful error surfacing (e.g., "Invalid email or password") without exposing sensitive server stack traces.

### 3. Dashboard Overview & Role-Based Access Control (RBAC)
- **Protected Routes**: Middleware and server-side session checks ensure only authenticated users can access the dashboard.
- **Authorization**: Granular role-based access where only users with the `admin` role can access the User Management view or manage other users. Standard `user` accounts have restricted access.
- **KPI Metrics**: Dashboard cards dynamically summarizing data points (Total Agents, Active Agents, User Count).

### 4. CRUD Functionality (Agents & Users)
- **Agent Management**: Create, Read, Update, and Delete AI agents. Agents are linked via relationships to the user who created them (`createdBy`).
- **User Management (Admin Only)**: Admins can view, edit, and delete user accounts.
- **Reusable Modals**: Clean Dialog components (via shadcn/ui) used for form submissions and delete confirmations.

### 5. Search and Pagination
- **Server-Side Filtering**: API routes support `?search=` and `?page=` queries.
- **Debounced Inputs**: Client-side search bars trigger debounced API calls for efficient network usage.
- **Paginated Tables**: Clean, responsive tables displaying data in chunks (e.g., 10 items per page).

---

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, class-variance-authority, clsx, tailwind-merge
- **UI Components**: Radix UI primitives & shadcn/ui
- **Icons**: Lucide React & React Icons
- **Animations**: Framer Motion
- **Database**: MongoDB (via Mongoose)
- **Authentication**: NextAuth.js
- **Form Validation**: React Hook Form + Zod
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

---

## Folder Structure

```text
├── .github/workflows/   # CI/CD pipeline definitions
├── app/                 # Next.js App Router (Pages & API Routes)
│   ├── api/             # Serverless API Route Handlers
│   ├── dashboard/       # Protected Dashboard Routes
│   ├── login/           # Authentication Routes
│   ├── register/        # Authentication Routes
│   └── page.tsx         # Marketing Homepage
├── components/          # Reusable React Components
│   ├── common/          # Badges, Panels, Skeletons, Wrappers
│   ├── dashboard/       # Dashboard specific components
│   ├── home/            # Marketing section components
│   ├── layout/          # Navbar, Footer, AppShell, Sidebar
│   └── ui/              # shadcn/ui primitive components
├── lib/                 # Utility functions and configurations
│   ├── auth.ts          # NextAuth configuration and logic
│   ├── mongodb.ts       # MongoDB connection caching
│   └── utils.ts         # Tailwind merging utilities
├── models/              # Mongoose Database Schemas
│   ├── Agent.ts         # AI Agent Schema
│   └── User.ts          # User Account Schema
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

---

## Installation Guide

### Prerequisites
- Node.js (v20+ recommended)
- npm or yarn
- MongoDB cluster (Atlas or local)

### Environment Variables
Create a `.env` file in the root directory and populate it with the following keys:

```env
MONGODB_URI="your_mongodb_connection_string"
AUTH_SECRET="your_super_secret_auth_key"
NEXTAUTH_URL="http://localhost:3000"
```

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/sanjayachari/moksha-media-group-assessment.git
   cd moksha-media-group-assessment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment Process

This application is deployed on **Vercel**, taking full advantage of Next.js serverless functions, Edge caching, and automated branch previews. 

Production Environment Variables required in Vercel:
- `MONGODB_URI`
- `NEXTAUTH_SECRET` (Vercel automatically handles `NEXTAUTH_URL` internally)

---

## CI/CD Workflow

A continuous integration pipeline is defined via **GitHub Actions** (`.github/workflows/ci.yml`). 

On every push and pull request to the `main` branch, the pipeline:
1. Checks out the code.
2. Sets up Node.js v20.
3. Installs dependencies using `npm ci`.
4. Runs ESLint to check for code quality and adherence to Next.js standards.
5. Runs the TypeScript compiler (`npm run type-check`) to ensure type safety.
6. Executes a full production build (`npm run build`) to guarantee successful deployment.

*Note: The pipeline strictly uses standard dependencies, intentionally omitting global production overrides to ensure `devDependencies` are installed for linting and type-checking phases.*

---

## Admin Test Credentials

To test the role-based access control and user management features, you can log in with the following admin account:

**Email**: `admin.root@gmail.com`  
**Password**: `Unlockno010203@`

---

## Architecture Summary

For a deep dive into the system design, request flow, database schemas, and architectural trade-offs, please see the [ARCHITECTURE.md](./ARCHITECTURE.md) file included in this repository.

---

## Known Limitations & Future Improvements

**Limitations:**
- Search functionality is currently limited to case-insensitive regex matching. For massive datasets, this should be migrated to MongoDB Atlas Search.
- The dashboard metrics currently poll the database via the API. Deep caching strategies could be employed to reduce database load.

**Future Improvements:**
- **OAuth Integration**: Add Google and GitHub SSO via NextAuth.
- **Rate Limiting**: Implement Upstash/Redis rate limiting on the `/api/auth/register` and `/api/agents` routes.
- **Advanced State Management**: Integrate Zustand for broader cross-component state sharing as the application grows in complexity.
- **Unit & E2E Testing**: Add Jest and Cypress/Playwright test suites to the CI pipeline.

---

## How I Used AI

### AI Tools Used
* **Claude AI** was used for brainstorming implementation approaches, refining component architecture, generating boilerplate code, assisting with debugging, and accelerating development workflows.
* **Perplexity AI** was used for researching technical best practices, validating implementation decisions, troubleshooting issues, and generating marketing content ideas.
* **Pinterest** was used strictly for design inspiration, including layout references, typography ideas, spacing systems, visual hierarchy, and overall UI direction.

### Example of AI Output Accepted As-Is
**Prompt:**
"Generate a responsive feature card component for a modern SaaS landing page using React and Tailwind CSS."

**Accepted Output:**
The generated component structure and responsive layout provided a strong starting point for reusable marketing website components. The implementation required only minor visual refinements to align with the project's design system and branding.

### Example Where AI Was Wrong or Insufficient
**Issue Encountered:**
Authentication worked correctly during local development but failed after deployment to production. Users were unable to log in even though identical credentials worked successfully in the local environment.

**AI Assistance:**
Claude AI and Perplexity AI suggested several possible causes, including authentication configuration issues, deployment settings, and environment variable mismatches. These suggestions helped narrow the investigation but did not identify the underlying issue.

**Actual Root Cause:**
The application initially relied on the native `bcrypt` package. While this worked correctly in the local development environment, production deployment introduced compatibility issues related to native module handling, causing password verification failures after deployment.

**Correction:**
The issue was resolved through manual debugging, production log analysis, verification of the authentication workflow, and adjustments to the password hashing and comparison implementation (swapping `bcrypt` for the pure-JS `bcryptjs` library) to ensure consistent behavior across both local and production environments.

**Outcome:**
Authentication functionality was successfully restored, and login behavior became reliable across all deployment environments.

### Engineering Judgment
AI was used to accelerate development, research, debugging, code scaffolding, and content generation. Final architectural decisions, authentication implementation, authorization strategy, debugging, validation, responsiveness, accessibility improvements, deployment fixes, security considerations, and production-readiness decisions were reviewed, validated, and implemented manually.

Pinterest was used solely as a source of inspiration. No layouts, pages, components, or visual designs were copied directly. The final interface, component architecture, design system, styling, interactions, and responsive behavior were custom-built specifically for this project.
