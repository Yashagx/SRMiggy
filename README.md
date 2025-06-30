
# 🥗 SRMIGGY – Student Canteen Ordering App

> “SRM Canteen, Just a Click Away!”

**Live Demo:** [https://sr-miggy-yash-agarwals-projects-a1b1afa8.vercel.app/](https://sr-miggy-yash-agarwals-projects-a1b1afa8.vercel.app/)

---

## 📌 Overview

SRMIGGY is a full-stack canteen management web application designed for SRM Institute of Science and Technology (SRMIST) students. The platform enables students to place food orders seamlessly and allows canteen staff to efficiently manage those orders with real-time tracking and sales analytics.

Developed as part of the **Advanced Programming Practices (21CSC203P)** mini-project (July–November 2024), SRMIGGY combines modern web technologies with a clean user interface to bridge the gap between traditional food service systems and the digital campus ecosystem.

---

## 👨‍💻 Contributors

- **Yash Agarwal** [RA2311033010055]  
- **Vishok Kumar Singh** [RA2311033010056]  
- **Aaniya Jain** [RA2311033010057]  
- **Sai Yeshwanth** [RA2311033010073]  

**Under the guidance of:**  
*Dr. T. Grace Shalini* – Assistant Professor, Department of Computational Intelligence, SRMIST

---

## ✨ Features

### 👥 Student Side
- 🔐 Secure Sign In/Sign Up (including Google login)
- 📋 Interactive Menu Page (with images, prices, and descriptions)
- 🛒 Cart Functionality with Local Storage
- ✅ Order Confirmation with PDF Receipt Generation

### 🧑‍🍳 Admin Side
- 🔐 Admin Sign In
- 📦 Real-Time Order Tracking
- 📈 Sales Data Visualization (Daily, Weekly, Monthly Trends)
- 🧾 Exportable Sales Reports for Inventory Management

---

## 🧱 System Architecture

### 📂 Layers

1. **Client Layer**  
   - HTML, CSS, JavaScript  
   - Responsive Design (mobile/tablet/desktop)

2. **Server Layer**  
   - Node.js, PHP, XAMPP  
   - Handles authentication, order logic, and admin actions

3. **Database Layer**  
   - MySQL via PhpMyAdmin  
   - JDBC for backend DB connectivity

### 🔄 Use Case Examples
- Student places an order → Sent to server → Stored in DB → Visible to Admin in dashboard
- Admin tracks orders & generates real-time sales analytics

---

## 🧪 Experimental Results

- ⏱️ **Avg Page Load Time:** 2.5s (Home), 3.1s (Confirmation)
- ⚡ **DB Query Speed:** Avg 0.8s (Order fetch)
- 📊 **Survey Result Highlights** (50 Users):
  - Ease of Use: ⭐ 85%
  - Visual Design (Orange/Black Theme): ⭐ 90%
  - Overall Satisfaction: ⭐ 87%
- 🍽️ **Popular Items Ordered:** Dosa, Puff, Tea
- 💸 **Avg Order Value:** ₹80
- 🚀 **Scalability:** Supports up to 100 parallel orders without lag

---

## 🛠 Tech Stack

| Frontend       | Backend       | Database | Tools & Hosting      |
|----------------|---------------|----------|-----------------------|
| HTML, CSS, JS  | Node.js, PHP  | MySQL    | XAMPP, Vercel, JDBC   |

---

## 📁 Project Structure

- `/signin.html`, `/admin-dashboard.html` – Authentication interfaces
- `/cart.html`, `/confirmation.html` – Ordering workflow pages
- `/fetch_orders.php`, `/save-order.php` – Order management logic
- `/DB.sql` – Database schema
- `/JdbcConnectivity.java` – Java DB connection test
- `/styles.css`, `/script.js`, `/admin-dashboard.js` – UI/UX scripts
- `/images/` – Food images and backgrounds

---

## 🚧 Installation Guide

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yashagx/srmiggy.git
   cd srmiggy
   ```

2. **Install & Setup Backend**
   - Start XAMPP (Apache & MySQL)
   - Import `DB.sql` into PhpMyAdmin
   - Update DB credentials in backend PHP files

3. **Start the Frontend**
   - Open `index.html` or view [Live](https://sr-miggy-yash-agarwals-projects-a1b1afa8.vercel.app/)

---

## 📈 Future Enhancements

- 📲 **Mobile App** version using React Native
- 💳 Integration of **UPI/Online Payments**
- 🤖 **AI-based Recommendations** (based on order history)
- 🥗 **Nutritional Info** & **Loyalty Program**
- 📶 **Net ID Login** Integration for better security
- 🌱 Sustainability tracking and paperless receipts

---

## 🧾 References

Key academic references used in research and development:
- Singh, R. (2022). *User Experience and Interface Design for Food Ordering Platforms*
- Kim, T., & Park, E. (2020). *Real-Time Order Processing in E-commerce Systems*
- Smith, L., & Johnson, T. (2018). *Database Management with PHP & MySQL*
- And others listed in the report

---

## 🧠 Learnings

Through SRMIGGY, the team gained hands-on experience with:
- Full-stack development
- Database design & optimization
- Real-time order systems
- Usability testing and performance analytics

---

## 🎓 Academic Context

This project was developed as part of the **21CSC203P - Advanced Programming Practices** course at the **Department of Computational Intelligence**, SRMIST, Kattankulathur Campus.

---

## 📜 License

This project is released under the MIT License.

---

## 🙌 Acknowledgements

We sincerely thank our mentor Dr. T. Grace Shalini, Head of Department Dr. Annie Uthra R, and all professors at SRMIST who supported us in this mini-project journey.
