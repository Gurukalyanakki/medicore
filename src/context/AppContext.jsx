import { createContext, useContext, useEffect, useState } from 'react'
import {
  admissionsSeed, appointmentsSeed, createBeds, credentials, doctorsSeed,
  medicinesSeed, nursesSeed, patientsSeed, staffSeed, labReportsSeed,
  invoicesSeed, emergencySeed,
} from '../data/mockData'

const AppContext = createContext(null)
const STORAGE_KEY = 'medicore-ai-state-v1'

const buildInitialState = () => {
  const beds = createBeds()
  admissionsSeed.forEach((admission) => {
    const bed = beds.find((item) => item.id === admission.bedId)
    if (bed) {
      bed.status = 'Occupied'
      bed.patientId = admission.patientId
    }
  })
  return {
    patients: patientsSeed,
    doctors: doctorsSeed,
    nurses: nursesSeed,
    staff: staffSeed,
    admissions: admissionsSeed,
    beds,
    appointments: appointmentsSeed,
    medicines: medicinesSeed,
    labs: labReportsSeed,
    invoices: invoicesSeed,
    emergencies: emergencySeed,
    hospital: { name: 'MediCore General Hospital', phone: '+1 415 555 0100', email: 'hello@medicore.health', address: '880 Horizon Avenue, San Francisco, CA', timezone: 'America/Los_Angeles' },
    preferences: { compactMode: false, emailAlerts: true, emergencyAlerts: true, inventoryAlerts: true },
  }
}

const readStoredState = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...buildInitialState(), ...JSON.parse(stored) } : buildInitialState()
  } catch {
    return buildInitialState()
  }
}

export function AppProvider({ children }) {
  const [state, setState] = useState(readStoredState)
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem('medicore-session')) } catch { return null }
  })
  const [theme, setTheme] = useState(() => localStorage.getItem('medicore-theme') || 'light')
  const [toasts, setToasts] = useState([])

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)), [state])
  useEffect(() => {
    localStorage.setItem('medicore-theme', theme)
    document.documentElement.dataset.theme = theme
  }, [theme])
  useEffect(() => {
    if (session) localStorage.setItem('medicore-session', JSON.stringify(session))
    else localStorage.removeItem('medicore-session')
  }, [session])

  const toast = (message, tone = 'success', action) => {
    const id = crypto.randomUUID()
    setToasts((items) => [...items, { id, message, tone, action }])
    setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 4500)
  }

  const login = (email, password) => {
    const account = credentials[email.toLowerCase()]
    if (!account || account.password !== password) return { ok: false, message: 'The email or password is incorrect.' }
    setSession({ email: email.toLowerCase(), role: account.role, name: account.name })
    return { ok: true }
  }

  const logout = () => setSession(null)

  const addPatient = (patient) => {
    const nextNumber = 1049 + state.patients.length
    const record = { ...patient, id: `P-${nextNumber}`, avatar: patient.name.split(' ').map((word) => word[0]).join('').slice(0, 2), lastVisit: 'Just now', status: patient.status || 'Outpatient' }
    setState((current) => ({ ...current, patients: [record, ...current.patients] }))
    toast(`${record.name} added to patient registry`)
  }

  const updatePatient = (id, changes) => {
    setState((current) => ({ ...current, patients: current.patients.map((item) => item.id === id ? { ...item, ...changes } : item) }))
    toast('Patient record updated')
  }

  const deletePatient = (id) => {
    if (state.admissions.some((item) => item.patientId === id && item.status === 'Admitted')) {
      toast('Discharge the patient before deleting their record.', 'danger')
      return false
    }
    const removed = state.patients.find((item) => item.id === id)
    setState((current) => ({ ...current, patients: current.patients.filter((item) => item.id !== id) }))
    toast('Patient removed', 'neutral', () => {
      setState((current) => ({ ...current, patients: [removed, ...current.patients] }))
      toast('Patient restored')
    })
    return true
  }

  const addDoctor = (doctor) => {
    const nextNumber = 201 + state.doctors.length
    const record = { ...doctor, id: `D-${nextNumber}`, patients: 0, rating: 5.0, status: doctor.status || 'Available', color: doctor.color || '#10b981' }
    setState((current) => ({ ...current, doctors: [...current.doctors, record] }))
    toast(`Dr. ${record.name} added to doctor directory`)
  }

  const addNurse = (nurse) => {
    const nextNumber = 401 + state.nurses.length
    const record = { ...nurse, id: `N-${nextNumber}`, attendance: 100, status: nurse.status || 'On duty' }
    setState((current) => ({ ...current, nurses: [...current.nurses, record] }))
    toast(`Nurse ${record.name} added to nursing staff`)
  }

  const addStaff = (member) => {
    const nextNumber = 301 + state.staff.length
    const record = { ...member, id: `S-${nextNumber}`, status: member.status || 'On duty' }
    setState((current) => ({ ...current, staff: [...current.staff, record] }))
    toast(`${record.name} added to staff directory`)
  }

  const addAppointment = (appointment) => {
    const nextNumber = 501 + state.appointments.length
    const record = { ...appointment, id: `A-${nextNumber}`, status: appointment.status || 'Confirmed', color: appointment.color || '#10b981' }
    setState((current) => ({ ...current, appointments: [...current.appointments, record] }))
    toast(`Appointment scheduled for ${record.patient}`)
  }

  const addLabOrder = (lab) => {
    const nextNumber = 3301 + state.labs.length
    const record = { ...lab, id: `LAB-${nextNumber}`, ordered: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: lab.status || 'Pending', progress: lab.progress || 10 }
    setState((current) => ({ ...current, labs: [record, ...current.labs] }))
    toast(`Lab order ${record.id} created`)
  }

  const addMedicine = (medicine) => {
    const nextNumber = state.medicines.length + 1
    const record = { ...medicine, id: `MED-${String(nextNumber).padStart(2, '0')}` }
    setState((current) => ({ ...current, medicines: [...current.medicines, record] }))
    toast(`${record.name} added to pharmacy inventory`)
  }

  const createInvoice = (invoice) => {
    const nextNumber = 7201 + state.invoices.length
    const record = { ...invoice, id: `INV-${nextNumber}`, date: new Date().toLocaleDateString([], { month: 'short', day: '2-digit' }), status: invoice.status || 'Pending' }
    setState((current) => ({ ...current, invoices: [record, ...current.invoices] }))
    toast(`Invoice ${record.id} created`)
  }

  const registerEmergency = (emergency) => {
    const nextNumber = 101 + state.emergencies.length
    const record = { ...emergency, id: `ER-${nextNumber}`, arrival: 'Just now', room: emergency.room || 'Triage' }
    setState((current) => ({ ...current, emergencies: [record, ...current.emergencies] }))
    toast(`Emergency case for ${record.patient} registered`)
  }

  const admitPatient = ({ patientId, ward, bedId, doctor, reason }) => {
    if (state.admissions.some((item) => item.patientId === patientId && item.status === 'Admitted')) {
      toast('This patient already has an active admission.', 'danger')
      return false
    }
    const bed = state.beds.find((item) => item.id === bedId)
    if (!bed || bed.status !== 'Available' || bed.ward !== ward) {
      toast('That bed is no longer available. Choose another bed.', 'danger')
      return false
    }
    const patient = state.patients.find((item) => item.id === patientId)
    if (!patient) return false
    const admission = {
      id: `ADM-${8901 + state.admissions.length}`,
      patientId, patientName: patient.name, ward, bedId, doctor, reason,
      admittedAt: new Date().toISOString(), status: 'Admitted',
    }
    setState((current) => ({
      ...current,
      admissions: [admission, ...current.admissions],
      beds: current.beds.map((item) => item.id === bedId ? { ...item, status: 'Occupied', patientId } : item),
      patients: current.patients.map((item) => item.id === patientId ? { ...item, status: 'Admitted' } : item),
    }))
    toast(`${patient.name} admitted to ${ward}`)
    return true
  }

  const dischargePatient = (admissionId) => {
    const admission = state.admissions.find((item) => item.id === admissionId && item.status === 'Admitted')
    if (!admission) {
      toast('No active admission found for this patient.', 'danger')
      return false
    }
    setState((current) => ({
      ...current,
      admissions: current.admissions.map((item) => item.id === admissionId ? { ...item, status: 'Discharged', dischargedAt: new Date().toISOString() } : item),
      beds: current.beds.map((item) => item.id === admission.bedId ? { ...item, status: 'Cleaning', patientId: null } : item),
      patients: current.patients.map((item) => item.id === admission.patientId ? { ...item, status: 'Outpatient' } : item),
    }))
    toast(`${admission.patientName} discharged · ${admission.bedId} sent for cleaning`)
    return true
  }

  const transferPatient = (admissionId, newBedId) => {
    const admission = state.admissions.find((item) => item.id === admissionId && item.status === 'Admitted')
    const bed = state.beds.find((item) => item.id === newBedId)
    if (!admission || !bed || bed.status !== 'Available') {
      toast('Transfer unavailable. The selected bed is not ready.', 'danger')
      return false
    }
    const oldBedId = admission.bedId
    setState((current) => ({
      ...current,
      admissions: current.admissions.map((item) => item.id === admissionId ? { ...item, bedId: newBedId, ward: bed.ward } : item),
      beds: current.beds.map((item) => item.id === oldBedId ? { ...item, status: 'Cleaning', patientId: null } : item.id === newBedId ? { ...item, status: 'Occupied', patientId: admission.patientId } : item),
    }))
    toast(`${admission.patientName} transferred to ${newBedId}`)
    return true
  }

  const updateBedStatus = (bedId, status) => {
    const bed = state.beds.find((item) => item.id === bedId)
    if (bed?.status === 'Occupied') {
      toast('Occupied beds can only be released through discharge or transfer.', 'danger')
      return
    }
    setState((current) => ({ ...current, beds: current.beds.map((item) => item.id === bedId ? { ...item, status } : item) }))
    toast(`${bedId} marked ${status.toLowerCase()}`)
  }

  const updateMedicine = (id, changes) => {
    setState((current) => ({ ...current, medicines: current.medicines.map((item) => item.id === id ? { ...item, ...changes } : item) }))
    toast('Inventory updated')
  }

  const saveSettings = (section, values) => {
    setState((current) => ({ ...current, [section]: { ...current[section], ...values } }))
    toast('Settings saved')
  }

  const resetDemo = () => {
    setState(buildInitialState())
    toast('Demo data restored')
  }

  const value = {
    ...state, session, theme, toasts, login, logout, setTheme, toast, setToasts,
    addPatient, updatePatient, deletePatient, admitPatient, dischargePatient,
    transferPatient, updateBedStatus, updateMedicine, saveSettings, resetDemo,
    addDoctor, addNurse, addStaff, addAppointment, addLabOrder, addMedicine,
    createInvoice, registerEmergency,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used inside AppProvider')
  return context
}
