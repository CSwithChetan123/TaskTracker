# 🚀 TaskTracker - Full-Stack MERN Application

**🔗 Live Demo:** [https://task-tracker-ui-88qx.onrender.com](https://task-tracker-ui-88qx.onrender.com)

A dynamic, production-ready Task Management application built using the MERN stack (MongoDB, Express, React, Node.js) and Material UI. This application features secure user authentication, a personalized user productivity overview dashboard, and full CRUD capabilities for tracking and managing daily tasks.

---

## 🌟 Features

* **User Authentication & Security:** Secure sign-up and login utilizing JSON Web Tokens (JWT) for session management and route protection.
* **Productivity Dashboard:** A personalized overview displaying total tasks, completed counts, overdue limits, and archived distributions tailored to the logged-in user.
* **Complete CRUD Functionality:** Seamless ability to Create, Read, Update (including quick-toggle completion checkboxes), and Delete tasks.
* **Dynamic Quick Filtering:** Instantly filter lists by categories (Work, Personal, Shopping, Health) or timeline horizons (Today, Upcoming, Completed).
* **Robust Network Layer:** Bypasses restrictive local ISP network blocks using explicit Google Public DNS routing mechanisms globally.
* **Cloud Hosted:** Fully deployed backend web environment synced with an optimized frontend static distribution build.

---

## 🛠️ Tech Stack

### Frontend (User Interface)
* **Framework:** React (Vite)
* **Component Library:** Material UI (MUI)
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Network Requests:** Axios

### Backend (API Server)
* **Runtime Environment:** Node.js
* **Server Framework:** Express.js
* **Database Management:** Mongoose (MongoDB Atlas Cloud Platform)
* **Environment Configuration:** Dotenv

---

## 📦 Project Structure

This repository is organized as a monorepo containing two decoupled application directories:

```text
TaskTracker/
├── task-backend/     # Express.js Server API & Database Schemas
└── task-tracker/     # React.js SPA User Interface Components
