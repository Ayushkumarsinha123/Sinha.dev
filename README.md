# 🍔 Bitezy.

**Scroll. Crave. Order.** Bitezy is a modern, premium food discovery and ordering platform that brings the addictive TikTok-style video feed to food delivery. Built with a sleek dark-mode glassmorphism UI, Bitezy connects hungry customers with local restaurants through mouth-watering short videos.

---

## ✨ Key Features

* **📱 TikTok-Style Video Feed:** Discover food through an immersive, infinitely scrolling video feed of restaurant reels.
* **🎭 Dual User Roles:** * **Hungry Customers:** Scroll, search, add to cart, and order.
    * **Restaurant Owners:** Access a dedicated Kitchen Dashboard to manage live orders and upload new menu reels.
* **🛒 Seamless Checkout:** Real-time cart management floating seamlessly over the UI.
* **🎨 Premium UI/UX:** Built with Tailwind CSS and Framer Motion for buttery-smooth animations, staggered reveals, and a native mobile-app feel on desktop.
* **☁️ Cloud Video Hosting:** Integrated with Cloudinary for fast, optimized video processing.

---

## 🛠️ Tech Stack

**Frontend (Client)**
* React.js (Vite)
* Tailwind CSS (Styling & Glassmorphism)
* Framer Motion (Animations & Interactions)
* Material-UI (MUI) (Icons & Input Components)
* React Router (Navigation)

**Backend (Server)**
* Node.js & Express.js
* MongoDB & Mongoose
* JSON Web Tokens (JWT) for Authentication
* Cloudinary (Video/Image Storage)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/your-username/bitezy.git
cd bitezy
\`\`\`

### 2. Environment Variables
You will need to create a `.env` file in your **server** directory with the following keys:
\`\`\`env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
\`\`\`

### 3. Install Dependencies

**For the Server:**
\`\`\`bash
cd server
npm install
\`\`\`

**For the Client:**
\`\`\`bash
cd client
npm install
\`\`\`

---

## 💻 Running the App

You will need two terminal windows open to run the client and the server simultaneously.

**Terminal 1: Start the Backend Server**
\`\`\`bash
cd server
npm start
\`\`\`
*(Server runs on http://localhost:3000)*

**Terminal 2: Start the Frontend Client**
\`\`\`bash
cd client
npm run dev
\`\`\`
*(Client runs on http://localhost:5173 or the port provided by Vite)*

---

## 📂 Folder Structure

\`\`\`text
bitezy/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── assets/         # Images and static files
│   │   ├── components/     # Reusable UI components (Navbar, Reels, Landing)
│   │   ├── context/        # React Context (Auth, Cart)
│   │   ├── pages/          # Full page views (Dashboard, Feed, Login, etc.)
│   │   └── services/       # API call functions (Axios/Fetch)
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── controllers/        # Route logic
│   ├── models/             # Mongoose database schemas
│   ├── routes/             # Express API routes
│   ├── middleware/         # Auth and upload middleware
│   └── package.json
│
└── README.md
\`\`\`

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License
This project is licensed under the MIT License.
