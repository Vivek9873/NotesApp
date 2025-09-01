# Notes App (MERN Stack)

A full-stack **Notes Management Application** built using **MongoDB, Express, React, and Node.js (MERN)**. This app allows users to **sign up, log in, create, edit, and delete notes** securely with authentication and OTP verification.

---

## 🚀 Features

- User authentication (Sign Up & Login)
- OTP-based email verification
- Create, Read, Update, and Delete (CRUD) notes
- JWT-based authentication
- Responsive UI

---

## 🛠 Tech Stack

- **Frontend:** React, Redux Toolkit, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT
- **Mailing:** Nodemailer for OTP

---

## 📂 Folder Structure

```
NotesApp-main/
├── frontend/       # React app (Vite setup)
│   ├── src/
│   │   ├── components/  # UI Components
│   │   ├── utils/       # Redux slices, constants
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
├── backend/        # Express API
│   ├── config/      # DB & mail config
│   ├── controllers/ # Auth & Notes logic
│   ├── middleware/  # Auth middleware
│   ├── models/      # Mongoose models
│   ├── routes/      # API routes
│   └── server.js
│
└── README.md
```

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/NotesApp.git
cd NotesApp-main
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a **.env** file in `backend/` folder and add:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

Run the server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

````
Run the React app:
```bash
npm run dev
````

---
