# Price List Management Application

### 🚀 Live Demo: [https://sow-pricelist-1.onrender.com/](https://sow-pricelist-1.onrender.com/)

---

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

A responsive full-stack application for viewing and managing product price lists. This project showcases a clean, component-based architecture and a fully responsive design that adapts from mobile to desktop, with a RESTful API backend and a persistent PostgreSQL database.

---
## Features

* **Fully Responsive UI**: Adapts seamlessly from mobile to desktop screens.
* **Interactive Data Table**: Sortable columns, responsive column hiding, and expandable rows to view full details.
* **Inline Editing**: Click any data cell to enter "edit mode." Changes are saved automatically when you click away or press "Enter".
* **Persistent Data**: All data is fetched from and saved to a PostgreSQL database via the backend API.
* **Component-Based Architecture**: Built with a clear and scalable component structure in React.

---
## Tech Stack

* **Frontend**: React (Vite), JavaScript, Vanilla CSS
* **Backend**: Node.js, Fastify, Sequelize
* **Database**: PostgreSQL (hosted on Vercel Postgres)
* **Deployment**: Frontend (Static Site) and Backend (Web Service) are hosted on Render.

---
## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or later recommended)
* [npm](https://www.npmjs.com/)
* A running PostgreSQL instance (local or hosted)

---
### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/divyanshu-kumar123/SOW_PriceList.git
    cd price-list
    ```
2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```
3.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

---
### Environment Variables
You need to create `.env` files for both the frontend and backend.

1.  **Backend (`backend/.env`):**
    ```ini
    # Your PostgreSQL connection string
    DATABASE_URL="postgres://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME"

    # Port for the local backend server
    PORT=3001
    ```

2.  **Frontend (`frontend/.env`):**
    ```ini
    # URL pointing to your local backend server
    VITE_API_BASE_URL=http://localhost:3001/api
    ```

---
## Running the Application Locally

You will need two separate terminals to run both the backend and frontend servers simultaneously.

1.  **Start the backend server:**
    * Navigate to the `backend` directory.
    * If this is your first time, you may need to seed the database: `node seed.js`
    * Run the development server:
    ```bash
    npm run dev
    ```
    The backend will be running on `http://localhost:3001`.

2.  **Start the frontend server:**
    * Navigate to the `frontend` directory.
    * Run the development server:
    ```bash
    npm run dev
    ```
    The frontend will open in your browser, usually at `http://localhost:5173`.
