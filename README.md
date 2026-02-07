# FinTrack — Personal Finance Analytics Dashboard

## Overview
**FinTrack** is a personal finance analytics dashboard that helps users track expenses, manage categories, and analyze spending patterns over time.  
The application emphasizes **data-heavy UI performance, clarity of insights, and reliable authenticated workflows**.

---

## Core User Flows
- Secure authentication and session handling  
- Category-based expense creation and management  
- Monthly summaries with visual breakdowns  
- Trend analysis and period-over-period comparisons  
- Cached filters and preferences for repeat analysis  

---

## Key Engineering Decisions
- **State management**: Used Redux Toolkit with memoized selectors to efficiently manage expense data and avoid unnecessary re-renders in chart-heavy views.  
- **Data visualization**: Structured frontend data models to feed chart components efficiently, enabling clear month-over-month and long-term trend insights.  
- **Performance optimization**: Implemented skeleton loaders, cached filters, and render optimizations to maintain smooth interactions during frequent data updates.  
- **API & auth handling**: Integrated JWT-based authentication with Axios interceptors to ensure consistent session management and error handling.  
- **Maintainable UI structure**: Organized the application around reusable components and predictable data flows to keep complexity manageable as features grow.

---

## Tech Stack
- React 18, TypeScript  
- Redux Toolkit  
- Chart.js  
- REST APIs  
- JWT-based authentication  
