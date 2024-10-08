# 💰 Sam's Personal Finance App

Welcome to the ultimate personal finance management solution! This full-stack application helps you take control of your finances with ease and style.

## 🌟 Features

- 📊 Create and manage budgets
- 💸 Track transactions
- 🏺 Set up savings pots
- 📅 Manage recurring bills
- 📱 Fully responsive design
- 🔐 Secure authentication

## 🚀 Live Demo

[Check out the live application here!](https://sams-finance-app.onrender.com/)

> **Note**: The application is hosted on Render, which may spin down the server after periods of inactivity. If it seems a bit slow at first, give it a moment to wake up!

## 🖥️ Frontend

### Tech Stack

- Angular 18
- TypeScript
- PrimeNG (for skeleton loading screens)
- Chart.js

### Key Features

- 🎨 Organic HTML and CSS (we keep it fresh!)
- 📱 Responsive design for all devices
- 👆 Interactive hover and active states
- ✅ Robust form validation
- 🔒 Local storage for persistent login
- 👀 Demo account available for easy browsing

### Project Structure

```
app/
├── components/    # Shared components
├── guards/        # Auth and login guards
├── interceptors/  # Request logging and token attachment
├── layout/        # Main application layout
├── pages/         # Application pages (overview, budgets, etc.)
├── services/      # Service classes for each resource
└── types/         # TypeScript interfaces
assets/            # Images and other static files
environments/      # Environment-specific configuration
```

## ⚙️ Backend

[Link to Backend Repository](https://github.com/samabati/finance-app-backend)

### Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

### Key Features

- 🔐 Custom JWT Authentication and Authorization
- 🛠️ CRUD endpoints for users, budgets, transactions, and pots
- 🚦 Custom error handling and middleware
- 📝 Request validation using Zod

### Project Structure

```
prisma/             # Prisma ORM configuration and models
src/
├── controllers/    # Business logic
├── exceptions/     # Custom error classes
├── middlewares/    # Error and auth middleware
├── routes/         # API routes
├── schemas/        # Zod validation schemas
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── errorHandler.ts # Central error handling
└── index.ts        # Main server file
```

## 🚀 Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/samabati/finance-app.git
   ```

2. Install dependencies:
   ```
   cd finance-app
   npm install
   ```

3. Set up your environment variables (see `.env.example`)

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:4200`

## 👩‍💻 Development

- Run `ng generate component component-name` to generate a new component
- Run `ng build` to build the project
- Run `ng test` to execute the unit tests

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Project Link: [https://sams-finance-app.onrender.com](https://sams-finance-app.onrender.com)

---

Made with ❤️ and ☕ by Sam

