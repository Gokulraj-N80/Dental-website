# SmileCraft Dental Clinic Website: Technical Project Report
*A Detailed Developer & System Documentation of the Full-Stack Application*

---

## 1. Directory Structure & Codebase Overview

The codebase is split into a **Frontend (Vite + React)** and a **Backend (Node.js + Express)**. Below is the file structure detailing the core components:

```
Dental Clinic/
├── backend/
│   ├── models/
│   │   ├── Admin.js               # Admin schema & password hashing hooks
│   │   └── Appointment.js         # Appointment data schema
│   ├── routes/
│   │   ├── appointments.js        # CRUD APIs for scheduling & date checks
│   │   └── auth.js                # JWT registration & login endpoints
│   ├── server.js                  # Express server entry point, MongoDB connection
│   ├── seed.js                    # Database seeder script with mock data
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/            # Patient-facing React components
    │   │   ├── About.jsx
    │   │   ├── AssistYou.jsx
    │   │   ├── BookingCalendar.jsx # Main interactive calendar grid
    │   │   ├── BookingForm.jsx     # Patient info collector form
    │   │   ├── Hero.jsx
    │   │   ├── TimeSlots.jsx       # Real-time slot selection UI
    │   │   └── ...
    │   └── admin/                 # Admin Dashboard components
    │       ├── Dashboard.jsx      # Core visual stats & overview charts
    │       ├── Appointments.jsx   # List, search, & status updates
    │       ├── Patients.jsx       # Electronic Health Records (EHR) logs
    │       ├── Doctors.jsx        # Scheduling & doctor availability
    │       └── AdminPanel.css     # Desktop & responsive admin stylesheet
```

---

## 2. Backend & API Documentation

The backend is built using Node.js and Express.js, connecting to MongoDB via Mongoose.

### Data Models

#### 1. Appointment Schema (`backend/models/Appointment.js`)
Handles appointment reservations, payment flags, and status fields:
```javascript
const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  patientPhone: { type: String, required: true },
  doctor: { type: String, required: true },
  treatment: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  notes: { type: String }
});
```

#### 2. Admin Schema (`backend/models/Admin.js`)
Manages system credentials using bcrypt hashing for security:
```javascript
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});
```

### API Endpoint Mappings

| Method | Endpoint | Description | Auth Required |
|:---|:---|:---|:---|
| `POST` | `/api/auth/register` | Create a new administrator account | No |
| `POST` | `/api/auth/login` | Log in and return a JWT access token | No |
| `GET` | `/api/appointments` | Fetch all appointments (filter by date/doctor) | Yes (JWT) |
| `POST` | `/api/appointments` | Book a new slot (runs slot conflict checks) | No |
| `PUT` | `/api/appointments/:id` | Edit, reschedule, or cancel booking status | Yes (JWT) |
| `DELETE` | `/api/appointments/:id`| Remove appointment records from database | Yes (JWT) |

---

## 3. Frontend Architecture & Component Roles

The frontend is a React application built with modular component tasks:

* **App Entry & Navigation (`Navbar.jsx` / `Logo.jsx`):** Employs stateful transitions and navigation scrolling to navigate between patient pages and the admin portal.
* **Interactive Booking Calendar (`BookingCalendar.jsx` / `TimeSlots.jsx`):** Fetches appointments from the backend for the selected date and filters out booked slots to prevent double-booking.
* **Patient Booking Form (`BookingForm.jsx`):** Performs frontend field validation (email syntax, phone length, required fields) and sends payload requests to `/api/appointments`.
* **Administrative Subsystem (`frontend/src/components/admin/`):**
  * `Dashboard.jsx`: Pulls total appointments, filters metrics, and generates visual performance reports.
  * `Patients.jsx`: A search-enabled dashboard detailing records, patient contact lists, and past treatment histories.
  * `Invoices.jsx` & `Payments.jsx`: Manages billing statuses, tracking which patients have paid or have outstanding invoices.

---

## 4. Seeding & Local Configuration

The application includes a utility seeding script (`backend/seed.js`) to ease development setups. 

Running `node seed.js` does the following:
1. Clears existing appointments and admin schemas.
2. Creates a default admin account (`admin` / password hash).
3. Generates mock patient profiles, doctor records, and placeholder bookings across a range of calendar dates.

---

## 5. Deployment & Execution Steps

### Environment Variables (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/dental-clinic
JWT_SECRET=super_secret_jwt_key
```

### Starting the Stack
1. **Database:** Ensure local MongoDB is running at port `27017`.
2. **Backend Server:**
   ```bash
   cd backend
   npm install
   npm start
   ```
3. **Frontend Client:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
