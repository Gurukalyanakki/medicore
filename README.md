# MediCore AI — Smart Hospital Management Platform

MediCore AI is a real-time smart hospital command center and operations hub designed to connect clinicians, administration staff, and patients under a single, beautiful workspace. Built with modern React, Vite, and tailwind styling, the platform adapts dynamically to support five tailored user roles with specialized workflows.

---

## 🚀 Key Features

- **Role-Based Experience**: The sidebar, dashboard metrics, operational tools, search bounds, and quick actions dynamically restructure themselves depending on the logged-in role.
- **Real-Time Operational command center**: Financial analysis charts, live ward-occupancy metrics, upcoming surgeries schedules, and emergency response updates.
- **Global Command Search (`⌘ K`)**: Fast, overlay search indexing patients, doctors, inventory, and admissions with role-based restriction.
- **Aesthetic Premium Design**: Curated dark/light theme toggle, glassmorphic card overlays, responsive layouts, micro-animations via `framer-motion`, and notification toast stack.

---

## 👥 Demo Profiles & Credentials

Select any profile on the sign-in screen, or use the credentials below:

| Role | Email | Password | Assigned Identity |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@medicore.com` | `Admin@123` | Raju Garu (Full System Access) |
| **Doctor** | `doctor@medicore.com` | `Doctor@123` | Dr. Srinivasa Rao (Cardiology) |
| **Nurse** | `nurse@medicore.com` | `Nurse@123` | Kalyani Lakshmi (ICU Ward) |
| **Receptionist** | `reception@medicore.com` | `Reception@123` | Anitha Reddy (Front Office Desk) |
| **Patient** | `patient@medicore.com` | `Patient@123` | Priya Deepika (Personal Portal) |

---

## 🛠️ Role-Specific Portals & Operations

### 1. Administrator Portal
- **Dashboard**: High-level commands. Financial performance (Recharts), overall bed capacity, live activity feeds, and surgical schedule status.
- **Access**: Full navigation access to Care Delivery, Wards, Beds, Billing, Diagnostics, Emergency, and Intelligence.

### 2. Doctor Portal
- **Dashboard**: Shows doctor schedule for the day, active inpatient list, and pending lab work reviews.
- **Key Operations**:
  - **New Prescription**: Modal allowing the doctor to write prescriptions and dynamically deduct medication inventory levels.
  - **Diagnostic Order**: Modal to request specific lab panels (CBC, Metabolic Panel, Cardiac panel) for registered patients.
- **Navigation**: Scoped to Appointments, Patients, Admissions, Bed Maps, Labs, and Pharmacy.

### 3. Nurse Portal
- **Dashboard**: Displays ward occupancy metrics, list of beds needing cleaning/sanitization, and emergency arrivals triage.
- **Key Operations**:
  - **Bed Map Status Update**: Interactive grid showing live bed placement where nurses can mark beds as *Available*, *Cleaning*, *Maintenance*, or *Reserved*.
  - **Triage Vitals**: Quick triage queue visualization.
- **Navigation**: Scoped to ICU Wards, Bed Maps, Admissions, Labs, and Pharmacy.

### 4. Receptionist Portal
- **Dashboard**: Front Desk checklist tracking expected check-ins, invoice settlement status, and ambulance arrivals.
- **Key Operations**:
  - **Check-In Patient**: Quickly check in patients from the schedule registry, updating appointment status in real-time.
  - **Collect Payment**: Mark pending invoices as paid directly from the billing queue.
  - **Intake Modals**: Quick scheduling, new patient registration, invoice creation, and emergency logs.
- **Navigation**: Scoped to Appointments, Patients, Bed Map, and Billing.

### 5. Patient Portal
- **Dashboard**: Personal health dashboard. Displays verified diagnosis history, active prescriptions, lab results status, and outstanding billing balances.
- **Key Operations**:
  - **Book Consultation**: Request a clinical visit with a preferred doctor.
  - **Pay Bill**: Interactive payment checkout gateway using pre-filled details to pay outstanding invoices.
- **Navigation**: Restricted to My visits, My Labs, My Invoices, and Personal Settings.

---

## 📂 Codebase Directory Structure

```bash
├── src
│   ├── App.jsx           # Protected routes, path configuration, and guards
│   ├── main.jsx          # Root rendering entry point
│   ├── layouts
│   │   └── AppShell.jsx  # Layout shell, dynamic navigation, search engine
│   ├── context
│   │   └── AppContext.jsx# Global state management, login/logout, core handlers
│   ├── data
│   │   └── mockData.js   # Seed data, demo accounts registry, initial state
│   ├── pages
│   │   ├── Dashboard.jsx # Consolidated role-based dashboard hubs
│   │   ├── PeoplePages.jsx# Clinical directory (Patients, Doctors, Nurse)
│   │   ├── ServicePages.jsx# Services (Appointments, Labs, Billing, ER)
│   │   ├── OperationsPages.jsx# Bed layout planners, Ward managers
│   │   └── Landing.jsx   # Public landing pages
│   ├── components
│   │   └── ui.jsx        # Modular UI components (Badge, Modals, Progress)
│   └── styles
│       └── index.css     # Global responsive styles, dark mode themes
├── package.json          # Dependency mappings (React 19, Vite, Recharts)
└── vite.config.js        # Vite compiler configurations
```

---

## ⚙️ How to Setup & Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates production assets inside the `/dist` directory.
