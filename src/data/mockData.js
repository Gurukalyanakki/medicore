export const patientsSeed = [
  { id: 'P-1048', name: 'Priya Deepika', age: 34, gender: 'Female', blood: 'O+', phone: '+91 98480 22338', emergency: 'Ravi · +91 98480 22182', insurance: 'Aetna Prime', allergies: 'Penicillin', diagnosis: 'Migraine', status: 'Outpatient', avatar: 'PD', lastVisit: 'Today, 09:30' },
  { id: 'P-1047', name: 'Venkateswara Rao', age: 67, gender: 'Male', blood: 'A-', phone: '+91 94400 12345', emergency: 'Lalitha · +91 94400 54321', insurance: 'Medicare', allergies: 'None', diagnosis: 'Cardiac arrhythmia', status: 'Admitted', avatar: 'VR', lastVisit: 'Today, 08:15' },
  { id: 'P-1046', name: 'Sirisha Chowdary', age: 29, gender: 'Female', blood: 'B+', phone: '+91 88866 55221', emergency: 'Ram · +91 88866 44112', insurance: 'United Health', allergies: 'Latex', diagnosis: 'ACL injury', status: 'Outpatient', avatar: 'SC', lastVisit: 'Yesterday' },
  { id: 'P-1045', name: 'Karthik Reddy', age: 8, gender: 'Male', blood: 'AB+', phone: '+91 99554 43322', emergency: 'Anitha · +91 99554 11223', insurance: 'Cigna Family', allergies: 'Peanuts', diagnosis: 'Asthma', status: 'Admitted', avatar: 'KR', lastVisit: 'Yesterday' },
  { id: 'P-1044', name: 'Lalitha Prasad', age: 42, gender: 'Female', blood: 'O-', phone: '+91 77022 11009', emergency: 'Siva · +91 77022 99001', insurance: 'Blue Shield', allergies: 'Sulfa drugs', diagnosis: 'Pneumonia', status: 'Admitted', avatar: 'LP', lastVisit: 'Jun 28' },
  { id: 'P-1043', name: 'Ramesh Naidu', age: 51, gender: 'Male', blood: 'A+', phone: '+91 90001 88822', emergency: 'Padma · +91 90001 77711', insurance: 'Kaiser', allergies: 'None', diagnosis: 'Type 2 diabetes', status: 'Outpatient', avatar: 'RN', lastVisit: 'Jun 27' },
]

export const doctorsSeed = [
  { id: 'D-201', name: 'Dr. Srinivasa Rao', specialty: 'Cardiology', department: 'Cardiology', experience: 14, rating: 4.9, patients: 1248, status: 'Available', color: '#7c3aed', schedule: '09:00 – 17:00' },
  { id: 'D-202', name: 'Dr. Murali Krishna', specialty: 'Neurology', department: 'Neurology', experience: 11, rating: 4.8, patients: 986, status: 'In surgery', color: '#10b981', schedule: '08:00 – 16:00' },
  { id: 'D-203', name: 'Dr. Swathi Reddy', specialty: 'Pediatrics', department: 'Pediatrics', experience: 9, rating: 4.9, patients: 1104, status: 'Available', color: '#14b8a6', schedule: '10:00 – 18:00' },
  { id: 'D-204', name: 'Dr. Venkat Avula', specialty: 'Orthopedics', department: 'Orthopedics', experience: 17, rating: 4.7, patients: 1532, status: 'On rounds', color: '#f59e0b', schedule: '07:30 – 15:30' },
  { id: 'D-205', name: 'Dr. Sai Kiran', specialty: 'Emergency Medicine', department: 'Emergency', experience: 12, rating: 4.8, patients: 1841, status: 'Available', color: '#ef4444', schedule: '18:00 – 02:00' },
  { id: 'D-206', name: 'Dr. Ranga Rao', specialty: 'Pulmonology', department: 'General', experience: 8, rating: 4.6, patients: 772, status: 'Off duty', color: '#06b6d4', schedule: '09:00 – 17:00' },
]

export const staffSeed = [
  { id: 'S-301', name: 'Anitha Reddy', role: 'Receptionist', department: 'Front Office', shift: 'Morning', status: 'On duty' },
  { id: 'S-302', name: 'Ravi Teja', role: 'Pharmacist', department: 'Pharmacy', shift: 'Morning', status: 'On duty' },
  { id: 'S-303', name: 'Sri Lekha', role: 'Lab Technician', department: 'Diagnostics', shift: 'Evening', status: 'On duty' },
  { id: 'S-304', name: 'Harika Konidela', role: 'HR Manager', department: 'Human Resources', shift: 'General', status: 'Remote' },
  { id: 'S-305', name: 'Narendra Chowdary', role: 'Accountant', department: 'Finance', shift: 'General', status: 'On leave' },
]

export const nursesSeed = [
  { id: 'N-401', name: 'Kalyani Lakshmi', ward: 'ICU', shift: 'Morning', experience: 8, attendance: 96, status: 'On duty' },
  { id: 'N-402', name: 'Jyothi Kumari', ward: 'Pediatrics', shift: 'Evening', experience: 6, attendance: 98, status: 'On duty' },
  { id: 'N-403', name: 'Bhanu Prasad', ward: 'Emergency', shift: 'Night', experience: 11, attendance: 94, status: 'Off duty' },
  { id: 'N-404', name: 'Padma Rani', ward: 'Cardiology', shift: 'Morning', experience: 9, attendance: 97, status: 'On duty' },
  { id: 'N-405', name: 'Saritha Varma', ward: 'General', shift: 'Evening', experience: 4, attendance: 99, status: 'On leave' },
]

export const wardsSeed = [
  { name: 'ICU', total: 18, color: '#ef4444', floor: 'Level 2' },
  { name: 'General', total: 42, color: '#10b981', floor: 'Level 3' },
  { name: 'Emergency', total: 16, color: '#f59e0b', floor: 'Ground' },
  { name: 'Pediatrics', total: 24, color: '#14b8a6', floor: 'Level 4' },
  { name: 'Cardiology', total: 22, color: '#7c3aed', floor: 'Level 5' },
  { name: 'Orthopedics', total: 20, color: '#06b6d4', floor: 'Level 4' },
  { name: 'Neurology', total: 18, color: '#8b5cf6', floor: 'Level 5' },
]

const reservedBeds = new Set(['ICU-03', 'GEN-09', 'PED-06', 'CAR-11'])
const cleaningBeds = new Set(['ICU-07', 'GEN-05', 'GEN-18', 'EME-08', 'ORT-04'])
const maintenanceBeds = new Set(['GEN-33', 'PED-19', 'NEU-12'])

export const createBeds = () => wardsSeed.flatMap((ward) => {
  const code = ward.name.slice(0, 3).toUpperCase()
  return Array.from({ length: ward.total }, (_, i) => {
    const id = `${code}-${String(i + 1).padStart(2, '0')}`
    return { id, ward: ward.name, status: reservedBeds.has(id) ? 'Reserved' : cleaningBeds.has(id) ? 'Cleaning' : maintenanceBeds.has(id) ? 'Maintenance' : 'Available', patientId: null }
  })
})

export const admissionsSeed = [
  { id: 'ADM-8901', patientId: 'P-1047', patientName: 'Venkateswara Rao', ward: 'Cardiology', bedId: 'CAR-02', doctor: 'Dr. Srinivasa Rao', admittedAt: '2026-07-01T08:15:00', reason: 'Cardiac arrhythmia', status: 'Admitted' },
  { id: 'ADM-8902', patientId: 'P-1045', patientName: 'Karthik Reddy', ward: 'Pediatrics', bedId: 'PED-03', doctor: 'Dr. Swathi Reddy', admittedAt: '2026-07-02T11:40:00', reason: 'Acute asthma', status: 'Admitted' },
  { id: 'ADM-8903', patientId: 'P-1044', patientName: 'Lalitha Prasad', ward: 'General', bedId: 'GEN-12', doctor: 'Dr. Ranga Rao', admittedAt: '2026-06-30T16:20:00', reason: 'Pneumonia observation', status: 'Admitted' },
]

export const appointmentsSeed = [
  { id: 'A-501', time: '09:00', patient: 'Priya Deepika', doctor: 'Dr. Murali Krishna', type: 'Follow-up', status: 'Checked in', color: '#10b981' },
  { id: 'A-502', time: '10:15', patient: 'Ramesh Naidu', doctor: 'Dr. Srinivasa Rao', type: 'Consultation', status: 'Confirmed', color: '#7c3aed' },
  { id: 'A-503', time: '11:30', patient: 'Sirisha Chowdary', doctor: 'Dr. Venkat Avula', type: 'Assessment', status: 'Confirmed', color: '#14b8a6' },
  { id: 'A-504', time: '13:45', patient: 'Chandra Shekhar', doctor: 'Dr. Swathi Reddy', type: 'Vaccination', status: 'Pending', color: '#f59e0b' },
  { id: 'A-505', time: '15:00', patient: 'Pranitha Rao', doctor: 'Dr. Ranga Rao', type: 'Follow-up', status: 'Confirmed', color: '#06b6d4' },
]

export const medicinesSeed = [
  { id: 'MED-01', name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 182, threshold: 50, expiry: 'Mar 2027', supplier: 'VitaLabs' },
  { id: 'MED-02', name: 'Atorvastatin 20mg', category: 'Cardiovascular', stock: 38, threshold: 50, expiry: 'Nov 2026', supplier: 'Nova Pharma' },
  { id: 'MED-03', name: 'Salbutamol Inhaler', category: 'Respiratory', stock: 74, threshold: 30, expiry: 'Jan 2027', supplier: 'MediSupply' },
  { id: 'MED-04', name: 'Insulin Glargine', category: 'Diabetes', stock: 24, threshold: 30, expiry: 'Sep 2026', supplier: 'CarePlus' },
  { id: 'MED-05', name: 'Paracetamol 500mg', category: 'Analgesic', stock: 410, threshold: 100, expiry: 'May 2028', supplier: 'VitaLabs' },
  { id: 'MED-06', name: 'Epinephrine 1mg', category: 'Emergency', stock: 52, threshold: 20, expiry: 'Oct 2026', supplier: 'Nova Pharma' },
]

export const labReportsSeed = [
  { id: 'LAB-3301', patient: 'Venkateswara Rao', test: 'Cardiac enzyme panel', ordered: 'Today, 07:40', status: 'Completed', progress: 100, technician: 'Sri Lekha' },
  { id: 'LAB-3302', patient: 'Lalitha Prasad', test: 'Complete blood count', ordered: 'Today, 08:20', status: 'Processing', progress: 65, technician: 'Sri Lekha' },
  { id: 'LAB-3303', patient: 'Karthik Reddy', test: 'Pulmonary function', ordered: 'Today, 09:10', status: 'Sample collected', progress: 35, technician: 'Vasu Babu' },
  { id: 'LAB-3304', patient: 'Sirisha Chowdary', test: 'Metabolic panel', ordered: 'Yesterday', status: 'Completed', progress: 100, technician: 'Vasu Babu' },
  { id: 'LAB-3305', patient: 'Ramesh Naidu', test: 'HbA1c', ordered: 'Today, 10:00', status: 'Pending', progress: 10, technician: 'Unassigned' },
]

export const invoicesSeed = [
  { id: 'INV-7201', patient: 'Venkateswara Rao', service: 'Cardiology admission', amount: 4280, date: 'Jul 02', status: 'Insurance review' },
  { id: 'INV-7202', patient: 'Priya Deepika', service: 'Neurology consultation', amount: 380, date: 'Jul 02', status: 'Paid' },
  { id: 'INV-7203', patient: 'Karthik Reddy', service: 'Pediatric admission', amount: 2160, date: 'Jul 01', status: 'Partially paid' },
  { id: 'INV-7204', patient: 'Sirisha Chowdary', service: 'Orthopedic imaging', amount: 920, date: 'Jun 30', status: 'Paid' },
  { id: 'INV-7205', patient: 'Lalitha Prasad', service: 'Respiratory care', amount: 1840, date: 'Jun 29', status: 'Pending' },
]

export const emergencySeed = [
  { id: 'ER-109', patient: 'Venkata Raman', age: 58, complaint: 'Chest pain, diaphoresis', arrival: '3 min ago', priority: 'Critical', vitals: 'BP 168/102 · HR 118', room: 'Trauma 1' },
  { id: 'ER-108', patient: 'Sandhya Rani', age: 23, complaint: 'Severe allergic reaction', arrival: '8 min ago', priority: 'Critical', vitals: 'SpO₂ 91% · HR 126', room: 'Trauma 2' },
  { id: 'ER-107', patient: 'Nageswara Rao', age: 71, complaint: 'Fall, possible fracture', arrival: '18 min ago', priority: 'Urgent', vitals: 'BP 142/88 · HR 94', room: 'Bay 4' },
  { id: 'ER-106', patient: 'Anupama Naidu', age: 31, complaint: 'Abdominal pain', arrival: '26 min ago', priority: 'Moderate', vitals: 'BP 118/76 · HR 82', room: 'Waiting' },
]

export const revenueData = [
  { month: 'Jan', revenue: 382, expenses: 244 }, { month: 'Feb', revenue: 410, expenses: 251 },
  { month: 'Mar', revenue: 396, expenses: 263 }, { month: 'Apr', revenue: 448, expenses: 271 },
  { month: 'May', revenue: 472, expenses: 286 }, { month: 'Jun', revenue: 508, expenses: 294 },
  { month: 'Jul', revenue: 536, expenses: 302 },
]

export const activitySeed = [
  { title: 'Patient admitted to Cardiology', detail: 'Venkateswara Rao · CAR-02', time: '8 min', type: 'admit' },
  { title: 'Lab report finalized', detail: 'Cardiac enzyme panel · LAB-3301', time: '24 min', type: 'lab' },
  { title: 'Insurance payment received', detail: 'INV-7189 · $2,840', time: '41 min', type: 'billing' },
  { title: 'Bed marked ready', detail: 'ICU-11 · Cleaning complete', time: '1 hr', type: 'bed' },
]

export const credentials = {
  'admin@medicore.com': { password: 'Admin@123', role: 'Administrator', name: 'Guru Kalyan' },
  'doctor@medicore.com': { password: 'Doctor@123', role: 'Doctor', name: 'Dr.Gurukalyan' },
  'reception@medicore.com': { password: 'Reception@123', role: 'Receptionist', name: 'A Venkat' },
  'nurse@medicore.com': { password: 'Nurse@123', role: 'Nurse', name: 'Bhaveshi' },
  'patient@medicore.com': { password: 'Patient@123', role: 'Patient', name: 'Vishal' },
}
