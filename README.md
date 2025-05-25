# Portfolio Dashboard

A comprehensive dashboard application for managing personal portfolio content including projects, skills, and blog posts. This fullstack application provides an admin interface to create, update, and manage all the content that appears on your portfolio website.

## Description

Portfolio Dashboard is a Next.js-based content management system designed specifically for developers and creatives who want to showcase their work through a personal website. The dashboard provides an intuitive interface to manage projects, technical skills, and blog posts, with features for media uploads, rich text editing, and content organization.

## Features

### Projects Management

- Create and edit portfolio projects
- Upload multiple project images
- Track project status (completed, in-progress, planned)
- Mark featured projects
- Add project details including:
  - Technologies used
  - Challenges faced
  - Key features
  - Repository links (backend/frontend)
  - Live demo links

### Skills Management

- Add and edit technical skills
- Upload skill logos/icons
- Mark featured skills
- Organize skills by category

### Blog Management

- Rich text editor for writing blog posts
- Add blog thumbnails and images
- Categorize and tag posts
- Save as draft or publish immediately
- Track reading time
- Feature important articles

### Dashboard Overview

- Visual insights of projects, skills, and blog posts
- Quick access to create new content
- Status overview for all content types

## Technology Stack

### Frontend

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI component library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Customizable UI components
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation
- [Lucide React](https://lucide.dev/) - Icon library
- [TanStack Table](https://tanstack.com/table) - Data table management

### UI Components

- Radix UI primitives for accessible components
- Custom theme with light/dark mode support
- Responsive design for mobile and desktop

### Developer Tools

- ESLint for code quality
- Modern PostCSS setup

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Backend API (see configuration)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ranokraihan/portfolio-dashboard.git
   cd portfolio-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the project root with the following variables:

   ```
   NEXT_PUBLIC_API_URL=your_backend_api_url
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
# or
yarn build
```

Then start the production server:

```bash
npm run start
# or
yarn start
```

## Project Structure

```
/portfolio-dashboard
├── src/
│   ├── actions/         # Server actions for API calls
│   ├── app/             # Next.js App Router
│   │   ├── (protected)/ # Protected routes
│   │   └── ...
│   ├── components/      # React components
│   │   ├── form/        # Form components
│   │   ├── module/      # Feature modules
│   │   ├── table/       # Table components
│   │   └── ui/          # UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── providers/       # React context providers
│   ├── schema/          # Zod validation schemas
│   ├── types/           # TypeScript types
│   └── ...
├── public/              # Static assets
└── ...
```

## Configuration

The application expects a backend API that provides endpoints for:

- Authentication (JWT)
- CRUD operations for projects, skills, and blog posts
- Media uploads
