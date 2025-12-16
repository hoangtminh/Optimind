# Optimind

A modern, collaborative study platform built with Next.js, Supabase, and real-time technologies. Optimind helps users focus better, track engagement, and study together through chat rooms, gamification, and engagement analytics.

## Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` with Supabase and Stream credentials:

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Key Features

### 🔴 Real-time Chat

-   Join public or private chat rooms
-   Instant messaging with Supabase Realtime
-   User presence tracking
-   Message broadcasting

### ⏱️ Study Sessions

-   Pomodoro/customizable timers
-   Focus time tracking
-   Study statistics and history
-   Room-based collaborative study

### 📊 Engagement Tracking

-   Eye gaze detection using ONNX ML models
-   Real-time engagement metrics
-   Engagement analytics and reports
-   Focus quality analysis

### ✅ Task Management

-   Kanban board interface
-   Task creation and organization
-   Status tracking
-   Task assignments

### 🏆 Gamification

-   User rankings and leaderboards
-   Achievement system
-   Points and rewards
-   Performance statistics

## Database Schema

Main tables:

-   **`user_profile`** - User information and settings
-   **`chat_room`** - Chat room details and metadata
-   **`chat_room_member`** - Room membership tracking
-   **`messages`** - Persistent message history
-   **`realtime.messages`** - Real-time message broadcasts

All tables use Row-Level Security (RLS) for data protection.

## Development Resources

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Supabase Documentation](https://supabase.com/docs)
-   [shadcn/ui Components](https://ui.shadcn.com)
-   [Tailwind CSS](https://tailwindcss.com/docs)
-   [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Contributing

When adding new features:

1. Create components in the appropriate `components/` subdirectory
2. Server actions all in `supabase/actions` fetch data in `supabase/lib`
3. Extract reusable hooks to `hooks/`
4. Add utility functions to `lib/`
5. Follow TypeScript strict mode
6. Use Tailwind CSS for styling
7. Ensure database operations use Supabase with RLS

## Client Application

### Directory Overview

```
client/
├── app/                    # Next.js App Router (routes and layouts)
├── components/             # Reusable React components (organized by feature)
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and algorithms
├── public/                 # Static assets (images, ML models)
├── supabase/              # Supabase integration (auth, database)
├── utils/                 # Configuration and utilities
├── package.json           # Dependencies
├── next.config.ts         # Next.js config
├── tsconfig.json          # TypeScript config
└── tailwind.config.ts     # Tailwind CSS config
```

### App Directory (`app/`)

Uses Next.js App Router with route groups for organization:

#### `app/(auth)/`

-   **`auth/`** - Authentication setup page
-   **`login/`** - User login interface

#### `app/(api)/`

Main application features:

-   **`calendar/`** - Calendar view for scheduling study sessions
-   **`chat/`** - Chat messaging interface
-   **`gamification/`** - Achievements and rankings
-   **`history/`** - Session history and statistics
-   **`profile/`** - User profile management
-   **`ranking/`** - Leaderboards and user rankings
-   **`rooms/`** - Study rooms with video/audio calls
-   **`setting/`** - User preferences and settings
-   **`study/`** - Study session interface
-   **`tasks/`** - Task management with Kanban board
-   **`test/`** - Engagement analysis tools

### Components Directory (`components/`)

Reusable UI components (shadcn/ui):

-   Form elements (input, select, textarea, checkbox, etc.)
-   Display elements (card, badge, avatar, etc.)
-   Interactive elements (button, dialog, dropdown, etc.)
-   Data visualization (chart, table, accordion, etc.)
-   Navigation (tabs, breadcrumb, etc.)

### Hooks Directory (`hooks/`)

### Lib Directory (`lib/`)

### Public Directory (`public/`)

### Supabase Directory (`supabase/`)

Supabase integration:

#### `supabase/actions/`

Server-side database operations:

-   `auth.ts` - Authentication actions
-   `chat.ts` - Chat operations

#### `supabase/hooks/`

-   `useCurrentUser.ts` - Current user state

#### `supabase/lib/`

Server-side fetching data:

-   `getCurrentUser.ts` - Fetch current user
-   `getChat.ts` - Fetch chat data

#### `supabase/schemas/`

Database schema validation:

-   `auth-schema.ts`
-   `chat-schema.ts`

#### `supabase/types/`
