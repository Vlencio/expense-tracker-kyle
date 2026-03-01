# EXPEN$IVE 💸

A personal expense tracker built with Next.js 16, Tailwind CSS, and shadcn/ui. Track your spending, visualize expenses by category with a donut chart, and manage your budget — all stored locally in your browser.

This is a challenge by unicorn machine, and also, my first project with NextJS.

---

## Features

- **Mock Authentication** — Login with predefined credentials, protected routes via Next.js proxy middleware
- **Add Expenses** — Name, value, category (predefined + custom), description, and date
- **Expense History** — Collapsible cards with slide-in animations for each expense
- **Donut Chart** — Visual breakdown of spending by category using Recharts
- **Delete Expenses** — Remove expenses with a smooth exit animation
- **Dark / Light Mode** — Theme toggle powered by next-themes
- **Persistent Storage** — Expenses saved to localStorage, no backend required

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework, routing, middleware |
| Tailwind CSS 4 | Utility-first styling |
| shadcn/ui | UI components (Input, Button, Select) |
| Recharts | Donut chart for expense visualization |
| Framer Motion | Slide-in/out animations for expense cards |
| next-themes | Dark/light mode toggle |
| cookies-next | Cookie management for auth state |
| TypeScript | Type safety |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Vlencio/expense-tracker.git

# Navigate to the project folder
cd expense-tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Mock Credentials

Since this project uses mock authentication, use the following credentials to log in:

```
Email:    kyle@unicornmachine.com
Password: notKyle
```

---

## Project Structure

```
expense-tracker/
├── app/
│   ├── dashboard/
│   │   └── page.tsx        # Main dashboard page
│   ├── globals.css
│   ├── layout.tsx           # Root layout with Navbar and ThemeProvider
│   └── page.tsx             # Login page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── ExpenseCard.tsx      # Collapsible expense card with animations
│   ├── ExpenseChart.tsx     # Recharts donut chart
│   ├── NavBar.tsx           # Top navigation with theme toggle
│   └── ThemeProvider.tsx    # next-themes wrapper
├── public/
│   └──                      # Static assets
├── types/
│   └── index.ts             # Shared TypeScript types (Expense)
├── proxy.ts                 # Route protection middleware
└── package.json
```

---

## How It Works

### Authentication
Login is validated against a mock user list. On success, a cookie `isLoggedIn` is set. The `proxy.ts` middleware intercepts any request to `/dashboard` and redirects unauthenticated users back to the login page.

### Expense Storage
Expenses are stored in `localStorage` as a JSON array. On page load, the Dashboard reads from localStorage and hydrates the React state. Every time the expenses state changes, it is automatically saved back to localStorage.

### Chart Data
The donut chart groups expenses by category using `Array.reduce()`, summing the values for each category. The result is passed to Recharts as `[{ category, value }]`.

---

## Future Improvements

- [ ] Real authentication with NextAuth.js
- [ ] Backend database (Supabase or PlanetScale)
- [ ] Edit existing expenses
- [ ] Filter and sort expenses by date or category
- [ ] Export expenses to CSV
- [ ] Responsive design for mobile

---

## License

This project is made to the technical test in unicorn machine.