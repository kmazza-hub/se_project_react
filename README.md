# 👕 WTWR ("What To Wear") — Full Stack Application

WTWR is a full-stack web application that helps users decide what clothing to wear based on the weather in real-time.  
Built with **React (Vite)** on the frontend and **Node.js + Express + MongoDB** on the backend.

---

## 🌟 Features

- 👤 User Sign Up / Sign In with JWT Authentication  
- 🧥 Add, Like, and Delete clothing items  
- 🔒 Protected Routes with Authorization Middleware  
- 🌦️ Real-time Weather Data via OpenWeather API  
- 📱 Responsive design matching the Figma specification  
- 💻 Full support for both mobile and desktop devices  

---

## 🔧 Technologies Used

### Frontend
- **React + Vite**
- **React Router DOM**
- **Context API**
- **CSS** (BEM Methodology)
- **Axios / Fetch API**

### Backend
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JSON Web Tokens (JWT)**
- **Celebrate + Joi**
- **bcryptjs**
- **Winston (logging)**

---

## 🚀 Frontend Setup

```bash
git clone https://github.com/kmazza-hub/se_project_react.git
cd se_project_react
npm install
npm run dev
The app will run at http://localhost:5173 (default Vite port).

🔗 Backend Setup (API Server)
bash
Copy
Edit
git clone https://github.com/kmazza-hub/se_project_express.git
cd se_project_express
npm install
Create a .env file in the backend root directory:

env
Copy
Edit
PORT=3001
MONGO_URL=mongodb://localhost:27017/wtwr
JWT_SECRET=your-strong-secret-key-here
NODE_ENV=development
OPEN_WEATHER_API_KEY=your_real_openweathermap_api_key_here
Start the server locally:

bash
Copy
Edit
npm run dev
The backend will run at http://localhost:3001

🌐 Deployed Project Links

Service	URL
Frontend	https://keithswtwr.myserver.dns.com.crabdance.com
Backend API	https://api.keithswtwr.myserver.dns.com.crabdance.com
✅ Status
 JWT authentication and token storage

 Protected routes

 Add / delete clothing items

 Like / unlike functionality

 Profile edit modal

 Mobile responsive

 Frontend and backend deployed on GCP

📦 Project Structure
bash
Copy
Edit
se_project_react/
├── src/
│   ├── components/       # UI Components (Header, Footer, Modals)
│   ├── contexts/         # React Contexts
│   ├── pages/            # Main route pages (Main, Profile)
│   ├── utils/            # API helpers, constants
│   ├── App.jsx           # Root app component
│   └── index.css         # Base styles
└── vite.config.js        # Vite config
🛡️ Security
JWT stored in memory and sent with secure headers

Token expiration handling

Backend includes authentication middleware for route protection

Input validation using Celebrate/Joi

🎯 Acknowledgments
Built as part of a full-stack software engineering curriculum with an emphasis on clean code, best practices, and real-world deployment workflows.

Thanks for checking out the project! Feel free to fork, clone, or contribute 🚀