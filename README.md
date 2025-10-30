# 🌍 BookIt: Experiences & Slots Booking Platform

A full-stack booking application for travel, adventure, and experience slots.
Includes experience listing, slot management, robust booking flow, promo code discounts, validation, and prevention of double-booking.

---

## 📚 Table of Contents
- [🚀 Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [⚡ Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🌐 API Endpoints](#-api-endpoints)
- [🎯 Usage Guide](#-usage-guide)
- [🗄 Database Models](#-database-models)
- [🤝 Contributing](#-contributing)
- [🧾 License](#-license)

---

## 🚀 Features

### 🔹 Frontend
- **Modern UI/UX** — Built with React.js & Tailwind CSS  
- **Responsive Design** — Mobile-first and adaptive  
- **Experience Browsing** — Browse, search, and filter experiences  
- **Booking Flow** — End-to-end booking (Home → Details → Checkout → Confirmation)  
- **Real-time Availability** — Dynamic slot updates  
- **Promo Code System** — Apply and validate discounts  
- **Form Validation** — Client-side validation for inputs  

### 🔹 Backend
- **RESTful API** — Modular and clean API architecture  
- **MongoDB Database** — NoSQL flexibility with Mongoose ODM  
- **Authentication Ready** — JWT-based structure for future expansion  
- **Booking Management** — Prevents double-booking with transaction logic  
- **Promo Code Engine** — Dynamic discount calculations  
- **Error Handling** — Centralized and descriptive error management  

---

## 🛠 Tech Stack

### Frontend
- ⚛️ **React.js** — Component-based UI library  
- 🎨 **Tailwind CSS** — Utility-first styling framework  
- 🔄 **React Router** — For smooth navigation  
- 🌐 **Axios** — For API requests  
- ⚡ **Vite** — Super-fast development build tool  

### Backend
- 🟢 **Node.js** — Runtime environment  
- 🚂 **Express.js** — Web framework  
- 🍃 **MongoDB** — NoSQL database  
- 🧩 **Mongoose** — MongoDB object modeling  
- 🔐 **CORS** — Secure API requests across origins  

---

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)  
- **npm** or **yarn**  
- **MongoDB** (Local or MongoDB Atlas)

---

## ⚡ Quick Start

### 1️⃣ Clone the Repository
```bash
git clone <your-repository-url>
cd bookit-fullstack
```

---

### 2️⃣ Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/bookit
PORT=8000
NODE_ENV=development
```

---

### 3️⃣ Frontend Setup
```bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install
```

---

### 4️⃣ Seed the Database
```bash
# From backend directory
cd ../backend
npm run seed
```

This seeds:
- 15 sample experiences  
- 150 slots per experience  
- 4 promo codes  
- Sample bookings  

---

### 5️⃣ Run the Application

**Start Backend**
```bash
# From backend directory
npm run dev
```
Server: [http://localhost:5000](http://localhost:8000)

**Start Frontend**
```bash
# From frontend directory (new terminal)
npm run dev
```
---

## 📁 Project Structure
```
bookit-fullstack/
├── backend/
│   ├── models/
│   │   ├── Experience.js
│   │   ├── Slot.js
│   │   ├── Booking.js
│   │   └── Promo.js
│   ├── controllers/
│   │   ├── experienceController.js
│   │   ├── bookingController.js
│   │   └── promoController.js
│   ├── routes/
│   │   ├── experienceRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── promoRoutes.js
│   │   └── index.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── asyncHandler.js
│   │ 
│   ├── seeders/
│   │   └── seedData.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   ├── experience/
│   │   │   │   ├── ExperienceCard.jsx
│   │   │   │   └── ExperienceGrid.jsx
│   │   │   └── booking/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ExperienceDetailPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   └── BookingResultPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
└── README.md
```

---

## 🌐 API Endpoints

### Experiences
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/experiences` | Get all experiences |
| GET | `/api/experiences/:id` | Get single experience with slots |

### Bookings
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/bookings` | Create a new booking |
| GET | `/api/bookings/:reference` | Get booking by reference |

### Promo Codes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/promo/validate` | Validate promo code |

### Health Check
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/health` | Server health status |

---

## 🎯 Usage Guide

### 1️⃣ Browse Experiences
- View all available experiences on the homepage  
- Filter by location, date, or category  

### 2️⃣ View Experience Details
- Click on an experience to view details, images, and reviews  
- Check available dates and slots  

### 3️⃣ Make a Booking
- Choose date and time slot  
- Apply promo codes (`SAVE10`, `FLAT100`, `WELCOME15`, `SUMMER25`)  
- Fill checkout form and confirm  

### 4️⃣ Booking Confirmation
- Receive a unique reference number  
- View and download booking confirmation  

---

## 🗄 Database Models

### Experience
- Title, description, images  
- Price, location, category  
- Host details, rating, requirements  

### Slot
- Date, time, capacity  
- Booked count, price, availability  

### Booking
- User info, slot & experience refs  
- Pricing, discount, booking status  

### Promo
- Code, description, type, value  
- Validity period, usage limit  

---

## 🤝 Contributing
Contributions, bug reports, and suggestions are always welcome!  
Feel free to fork the repo and submit a **Pull Request**.

---

## 🧾 License
This project is licensed under the **MIT License**.  

⭐ **If you like this project, give it a star on GitHub!** 🌟
