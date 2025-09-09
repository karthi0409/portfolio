# Overview

This is a full-stack portfolio application for Karthigayan S, a Front-End Developer and MCA Student. The application showcases personal projects including a Sentiment Analysis System, Data Analytics Dashboard, and E-commerce Platform. It features a comprehensive analytics dashboard for tracking visitor engagement and portfolio interactions. Built as a modern single-page application with React frontend, Express.js backend, and PostgreSQL database for analytics persistence. The portfolio includes downloadable resume in both PDF and text formats.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and builds
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, modern UI design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and data fetching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **UI Components**: Extensive use of Radix UI primitives through shadcn/ui for accessibility

## Backend Architecture
- **Framework**: Express.js with TypeScript for API endpoints
- **Development Setup**: Vite middleware integration for seamless development experience
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage)
- **Session Management**: Express sessions with PostgreSQL session store support
- **Error Handling**: Centralized error handling middleware with structured responses

## Database Design
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless database support
- **Schema Management**: Centralized schema definitions in shared directory
- **Migrations**: Drizzle Kit for database schema migrations
- **Analytics Tables**: page_views, contact_submissions, analytics_events for comprehensive tracking
- **Storage Interface**: DatabaseStorage implementation with analytics query methods

## Component Architecture
- **Design System**: Modular component structure with consistent theming
- **Layout**: Section-based layout (Hero, About, Projects, Skills, Resume, Contact, Footer)
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Animations**: CSS-based animations for enhanced user experience
- **Theme Support**: Dark/Light/System theme implementation with CSS custom properties
- **Analytics Dashboard**: Real-time visitor tracking with charts and metrics using Recharts
- **Resume Download**: PDF and text format resume downloads with click tracking

## Build and Deployment
- **Development**: Vite dev server with hot module replacement
- **Production Build**: Separate client (Vite) and server (esbuild) builds
- **Static Assets**: Optimized asset handling with proper caching strategies
- **Environment**: Node.js ESM modules with TypeScript compilation

# EmailJS Configuration
- **Public Key**: zw-J0wCbcZTAZG2Sg
- **Service ID**: service_kk0hq6x
- **Template ID**: template_z445fjf
- **Integration Status**: Connected and configured for contact form submissions

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-kit**: Database migration and schema management tools
- **express**: Web application framework for the backend API

## Frontend UI Dependencies
- **@radix-ui/***: Complete set of accessible UI primitives (accordion, dialog, dropdown, etc.)
- **@tanstack/react-query**: Powerful data synchronization for React applications
- **wouter**: Minimalist routing library for React
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Modern icon library with React components

## Development and Build Tools
- **vite**: Fast build tool and development server
- **typescript**: Type safety and enhanced developer experience
- **@vitejs/plugin-react**: React support for Vite
- **esbuild**: Fast JavaScript bundler for production builds

## Form and Validation
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **zod**: TypeScript-first schema validation

## Email Integration
- **@emailjs/browser**: Client-side email sending service integration for contact forms

## Utility Libraries
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings conditionally
- **class-variance-authority**: Type-safe variant generation for component styling