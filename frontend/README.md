Here's the updated **README.md** file reflecting your `package.json` setup:  

---

```md
# 📝 Task Manager Frontend

This is the **frontend** for the Task Manager application, built using **React, Vite, and TypeScript**.

## 🚀 Tech Stack

- **React** ⚛️ - Frontend framework
- **Vite** ⚡ - Fast build tool
- **TypeScript** 🦾 - Typed JavaScript
- **Tailwind CSS** 🎨 - Styling framework
- **Axios** 🌐 - API calls
- **React Router** 🔀 - Routing
- **React Hot Toast** 🔔 - Notifications
- **Moment.js** ⏳ - Date handling

---

## 📌 Setup & Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/sanya15arora/task-manager.git
cd frontend
```

### 2️⃣ Install Dependencies
```sh
npm install
# or
yarn install
```

### 3️⃣ Start Development Server
```sh
npm run dev
# or
yarn dev
```
Your application should now be running at **http://localhost:5173/** (default Vite port).

---

## 🛠 Project Structure

```
📦 src
 ┣ 📂assets          # Static assets (images, icons, etc.)
 ┣ 📂components      # Reusable UI components
 ┣ 📂context         # Context API state management
 ┣ 📂hooks           # Custom React hooks
 ┣ 📂pages           # Page components
 ┣ 📂types           # TypeScript interfaces and types
 ┣ 📂utils           # Utility functions
 ┣ 📜App.tsx         # Main application component
 ┣ 📜main.tsx        # Application entry point
 ┗ 📜vite.config.ts  # Vite configuration
```

---

## 🔧 Available Scripts

### 🚀 Development
```sh
npm run dev
```
Starts the Vite development server.

### 🔨 Build for Production
```sh
npm run build
```
Compiles TypeScript and builds the Vite project.

---

## 📡 API Endpoints

Ensure the **backend API** is running and update the `axiosInstance` configuration in `src/utils/axiosInstance.ts`.

Example API Routes:
- `GET /v1/dashboard` → Fetch data for dashboard
- `GET /v1/task/getAll` → Fetch all tasks
- `POST /v1/tasks/add` → Add a new task
- `PUT /v1/task/update/:id` → Update a task
- `DELETE /v1/task/delete/:id` → Delete a task

---

## 🌍 Environment Variables

Create a `.env` file in the root directory and add:

```
VITE_API_BASE_URL=http://localhost:8000/api/v1/auth
```

---

## 📜 License
This project is **MIT Licensed**. Feel free to contribute and modify.

---

## 👨‍💻 Author
**Sanya Arora**  
Frontend Developer | [LinkedIn](https://www.linkedin.com/in/sanya15arora)

---

Let me know if you'd like any modifications! 🚀
