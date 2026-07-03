import { AnimatePresence } from 'framer-motion'
import { Activity, ArrowLeft } from 'lucide-react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useApp } from './context/AppContext'
import AppShell from './layouts/AppShell'
import Dashboard from './pages/Dashboard'
import { ReportsPage, SettingsPage } from './pages/InsightsPages'
import Landing from './pages/Landing'
import Login from './pages/Login'
import { AdmissionsPage, BedsPage, WardsPage } from './pages/OperationsPages'
import { DoctorsPage, NursesPage, PatientsPage, StaffPage } from './pages/PeoplePages'
import { AppointmentsPage, BillingPage, EmergencyPage, LabsPage, PharmacyPage } from './pages/ServicePages'

function ProtectedRoute() {
  const { session } = useApp()
  return session ? <AppShell /> : <Navigate to="/login" replace />
}

function NotFound() {
  return <main className="not-found"><span><Activity /></span><strong>404</strong><h1>This corridor doesn’t exist.</h1><p>The page may have moved, or the route was entered incorrectly.</p><a href="/"><ArrowLeft /> Return to MediCore</a></main>
}

export default function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname.split('/').slice(0, 3).join('/')}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<ProtectedRoute />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="nurses" element={<NursesPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="wards" element={<WardsPage />} />
          <Route path="beds" element={<BedsPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="labs" element={<LabsPage />} />
          <Route path="pharmacy" element={<PharmacyPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="emergency" element={<EmergencyPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}
