# 🎓 Scholarship Management System

A full-stack Scholarship Management System where students can explore and apply for scholarships, and admins/moderators can manage applications, users, and reviews.

## 🔗 Live Links

- 🔴 **Frontend**: [Live Site Link](https://your-frontend-site-url.com)
- 🟢 **Backend**: [Live Server Link](https://your-backend-server-url.com)
- 💻 **Client Repository**: [GitHub Client](https://github.com/your-username/client-repo)
- 🗃️ **Server Repository**: [GitHub Server](https://github.com/your-username/server-repo)

## 🧾 Project Purpose

To help students find suitable scholarships and apply easily while allowing moderators and admins to manage scholarship postings, reviews, and applications in a role-based dashboard environment.

## 👤 Demo Credentials

### 🔐 Admin
- Email: `admin@example.com`
- Password: `Admin123!`

### 🛡️ Moderator
- Email: `moderator@example.com`
- Password: `Moderator123!`

## 🧩 Features

### 🌐 Public Pages
- Home with Banner, Top Scholarships, Extra Sections
- All Scholarship with Search + Filter
- Scholarship Details Page
- Login / Register with Email & Google Auth
- 404 Not Found Page

### 👤 Auth
- Email/password & Google Sign In
- JWT-based secure routing
- Private route protection with role check
- Firebase env-protected

### 👨‍🎓 User Dashboard
- My Profile
- My Applications (edit/cancel if pending)
- My Reviews (edit/delete)

### 🧑‍🏫 Moderator Dashboard
- My Profile
- Add Scholarship (with image upload to imgbb)
- Manage Scholarships (edit/delete/details)
- Manage Applications (status/feedback/cancel)
- Manage All Reviews (delete)

### 🛠️ Admin Dashboard
- My Profile
- Add Scholarship
- Manage Scholarships
- Manage Applications
- Manage Users (role update, filter, delete)
- Manage Reviews
- 🔍 Analytics Chart Page

## 💳 Payment Integration

- Stripe payment gateway before scholarship application
- Conditional form + success toast on payment
- Error handling with toast

## 🔒 Security & Deployment

- JWT auth for protected routes
- Axios interceptor (optional)
- Firebase and MongoDB credentials secured in `.env`
- Live deployment CORS handled
- Domain authorized in Firebase Auth
- Route reload safe — no login redirection issue
- Server deployed without 404/504 errors

## 📦 Technologies Used

### 🧑‍💻 Frontend
- React.js
- React Router DOM
- Firebase Auth
- Axios + React Query (Tanstack)
- Stripe.js
- SweetAlert2 + Toastify
- Swiper.js
- Tailwind CSS
- React Hook Form

### 🔙 Backend
- Express.js
- MongoDB + Mongoose
- Stripe SDK
- JWT
- dotenv
- CORS
- Helmet (optional)

## ✅ Assignment Requirements Covered

- ✅ Full Role-based Dashboard: User, Moderator, Admin
- ✅ Secure Image Upload (imgbb)
- ✅ Application Form Before Payment
- ✅ Real-Time Review System with Ratings
- ✅ Filter/Search/Sort in Multiple Places
- ✅ Form Validation (Password, Input)
- ✅ Responsive Layout (Mobile to Desktop)
- ✅ 404 Page
- ✅ Pagination (Challenge Task)
- ✅ Chart Page (Analytics)

## 📁 Folder Structure (Client)

\`\`\`
src/
│
├── components/
├── pages/
│   ├── Home/
│   ├── Auth/
│   ├── Scholarship/
│   ├── Dashboard/
│
├── hooks/
├── routes/
├── context/
├── services/
├── utils/
└── App.jsx
\`\`\`

## 📁 Folder Structure (Server)

\`\`\`
server/
│
├── routes/
├── controllers/
├── models/
├── middleware/
└── index.js
\`\`\`





## 📌 Commit Guidelines

- ✅ 20+ meaningful commits in client repo
- ✅ 12+ meaningful commits in server repo
- ✅ Clear and descriptive messages used

## 🏁 Deployment Checklist

- ✅ Firebase Auth configured with custom domain
- ✅ All routes reload-safe
- ✅ No CORS/404 errors in production
- ✅ Protected routes tested
- ✅ Payment working in production