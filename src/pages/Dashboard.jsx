import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Activity, Ambulance, ArrowRight, BedDouble, CalendarDays, CheckCircle2,
  Clock3, DollarSign, MoreHorizontal, Scissors, Stethoscope, UserMinus, Users,
  Pill, FileText, Check, ShieldAlert, HeartPulse, UserPlus, FlaskConical,
  ClipboardList, Shield, RefreshCw, Wrench, Siren, CreditCard
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts'
import { Badge, Button, Card, PageHeader, Progress, StatCard, Field, Modal } from '../components/ui'
import { useApp } from '../context/AppContext'
import { activitySeed, revenueData } from '../data/mockData'

const occupancyData = [
  { name: 'Occupied', value: 78, color: '#059669' },
  { name: 'Available', value: 16, color: '#10b981' },
  { name: 'Other', value: 6, color: '#334155' },
]
const surgeryData = [
  { time: '10:30', title: 'Laparoscopic appendectomy', doctor: 'Dr. Venkat Avula', room: 'OR-2', status: 'Preparing' },
  { time: '12:15', title: 'Coronary angioplasty', doctor: 'Dr. Srinivasa Rao', room: 'OR-1', status: 'Confirmed' },
  { time: '15:00', title: 'Lumbar decompression', doctor: 'Dr. Murali Krishna', room: 'OR-3', status: 'Confirmed' },
]

export default function Dashboard() {
  const { session } = useApp()

  switch (session?.role) {
    case 'Doctor':
      return <DoctorDashboard />
    case 'Nurse':
      return <NurseDashboard />
    case 'Receptionist':
      return <ReceptionistDashboard />
    case 'Patient':
      return <PatientDashboard />
    case 'Administrator':
    default:
      return <AdminDashboard />
  }
}

// -------------------------------------------------------------
// 1. ADMINISTRATOR DASHBOARD
// -------------------------------------------------------------
function AdminDashboard() {
  const { patients, doctors, admissions, beds, session } = useApp()
  const navigate = useNavigate()
  const activeAdmissions = admissions.filter((item) => item.status === 'Admitted')
  const occupied = beds.filter((bed) => bed.status === 'Occupied').length
  const occupancy = Math.round((occupied / beds.length) * 100)
  const firstName = session?.name?.replace(/^Dr\.\s*/, '').split(' ')[0]

  return (
    <div className="page dashboard-page">
      <PageHeader
        eyebrow="Friday, July 3 · 08:42 AM"
        title={`Good morning, ${firstName}.`}
        description="Here’s what’s happening across St. Helena Campus today."
        actions={
          <>
            <Button variant="ghost" icon={CalendarDays} onClick={() => navigate('/app/appointments')}>View schedule</Button>
            <Button icon={Activity} onClick={() => navigate('/app/admissions')}>New admission</Button>
          </>
        }
      />
      <section className="stat-grid">
        <StatCard label="Total patients" value={patients.length.toLocaleString()} detail="32 new this week" trend="+12.4%" icon={Users} tone="blue" />
        <StatCard label="Today’s appointments" value="48" detail="14 awaiting check-in" trend="+6.2%" icon={CalendarDays} tone="purple" />
        <StatCard label="Doctors available" value={`${doctors.filter((item) => item.status === 'Available').length}/${doctors.length}`} detail="Across 7 departments" icon={Stethoscope} tone="teal" />
        <StatCard label="Active admissions" value={activeAdmissions.length} detail="3 pending discharge" trend="+2.1%" icon={BedDouble} tone="amber" />
        <StatCard label="Today’s revenue" value="$42.8K" detail="Monthly target: 84%" trend="+8.7%" icon={DollarSign} tone="green" />
        <StatCard label="Emergency cases" value="4" detail="2 critical · 2 stable" trend="-14%" icon={Ambulance} tone="red" />
      </section>

      <section className="dashboard-main-grid">
        <Card className="chart-card revenue-card">
          <div className="card-heading">
            <div><span>Financial performance</span><h2>Revenue overview</h2></div>
            <div className="chart-summary">
              <span><i className="rev-dot" /> Revenue</span><span><i className="exp-dot" /> Expenses</span>
              <select aria-label="Revenue period"><option>Last 7 months</option><option>This year</option></select>
            </div>
          </div>
          <div className="revenue-highlight"><strong>$536K</strong><Badge tone="success">+11.8%</Badge><span>July projected revenue</span></div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={.35} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 5" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: 'var(--surface-solid)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text)' }} formatter={(value) => [`$${value}K`]} />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="url(#revenueGradient)" />
                <Area type="monotone" dataKey="expenses" stroke="#14b8a6" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="occupancy-card">
          <div className="card-heading"><div><span>Live capacity</span><h2>Bed occupancy</h2></div><button className="icon-btn" aria-label="More Options"><MoreHorizontal /></button></div>
          <div className="occupancy-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={occupancyData} dataKey="value" innerRadius={63} outerRadius={81} paddingAngle={3} stroke="none" startAngle={90} endAngle={-270}>
                  {occupancyData.map((item) => <Cell key={item.name} fill={item.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div><strong>{occupancy || 78}%</strong><span>occupied</span></div>
          </div>
          <div className="occupancy-meta">
            <div><strong>{occupied}</strong><span>Occupied</span></div>
            <div><strong>{beds.filter((item) => item.status === 'Available').length}</strong><span>Available</span></div>
            <div><strong>{beds.filter((item) => !['Available', 'Occupied'].includes(item.status)).length}</strong><span>Service</span></div>
          </div>
          <Progress value={occupancy || 78} color="#10b981" label="Overall capacity" />
          <button className="card-link" onClick={() => navigate('/app/beds')}>Manage bed capacity <ArrowRight size={15} /></button>
        </Card>
      </section>

      <section className="dashboard-secondary-grid">
        <Card className="activity-card">
          <div className="card-heading"><div><span>Across the hospital</span><h2>Recent activity</h2></div><button className="text-button">View all</button></div>
          <div className="activity-list">
            {activitySeed.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .08 }}>
                <span className={`activity-icon ${item.type}`}>
                  {item.type === 'admit' ? <BedDouble /> : item.type === 'lab' ? <CheckCircle2 /> : item.type === 'billing' ? <DollarSign /> : <UserMinus />}
                </span>
                <div><b>{item.title}</b><span>{item.detail}</span></div>
                <small>{item.time}</small>
              </motion.div>
            ))}
          </div>
        </Card>
        <Card className="surgery-card">
          <div className="card-heading"><div><span>Operating theatres</span><h2>Upcoming surgeries</h2></div><Badge tone="blue">3 today</Badge></div>
          <div className="surgery-list">
            {surgeryData.map((item) => (
              <div key={item.time}>
                <span className="surgery-time"><Clock3 size={14} />{item.time}</span>
                <i />
                <span className="surgery-icon"><Scissors /></span>
                <div><b>{item.title}</b><small>{item.doctor} · {item.room}</small></div>
                <Badge tone={item.status === 'Preparing' ? 'warning' : 'success'}>{item.status}</Badge>
              </div>
            ))}
          </div>
          <button className="card-link" onClick={() => navigate('/app/appointments')}>Open theatre schedule <ArrowRight size={15} /></button>
        </Card>
      </section>
    </div>
  )
}

// -------------------------------------------------------------
// 2. DOCTOR DASHBOARD
// -------------------------------------------------------------
function DoctorDashboard() {
  const { patients, medicines, admissions, appointments, labs, session, prescribeMedication, addLabOrder } = useApp()
  const navigate = useNavigate()

  const [prescriptionOpen, setPrescriptionOpen] = useState(false)
  const [labOpen, setLabOpen] = useState(false)
  
  const [presForm, setPresForm] = useState({ patientName: patients[0]?.name || '', medicineId: medicines[0]?.id || '', instructions: '' })
  const [labForm, setLabForm] = useState({ patientName: patients[0]?.name || '', test: 'Complete blood count', technician: 'Sri Lekha' })

  const myAppointments = useMemo(() => {
    return appointments.filter(a => a.doctor.toLowerCase().includes(session?.name?.toLowerCase()))
  }, [appointments, session])

  const myInpatients = useMemo(() => {
    return admissions.filter(adm => adm.status === 'Admitted' && adm.doctor.toLowerCase().includes(session?.name?.toLowerCase()))
  }, [admissions, session])

  const myLabs = useMemo(() => {
    return labs.filter(l => myInpatients.some(p => p.patientName.toLowerCase() === l.patient.toLowerCase()))
  }, [labs, myInpatients])

  const lowStockCount = medicines.filter(m => m.stock <= m.threshold).length

  const handlePrescription = (e) => {
    e.preventDefault()
    const success = prescribeMedication(presForm.medicineId, presForm.patientName, presForm.instructions)
    if (success) {
      setPrescriptionOpen(false)
      setPresForm({ patientName: patients[0]?.name || '', medicineId: medicines[0]?.id || '', instructions: '' })
    }
  }

  const handleLabOrder = (e) => {
    e.preventDefault()
    addLabOrder({
      patient: labForm.patientName,
      test: labForm.test,
      technician: labForm.technician,
      progress: 10,
      status: 'Pending'
    })
    setLabOpen(false)
  }

  return (
    <div className="page dashboard-page">
      <PageHeader
        eyebrow="Clinical Workspace"
        title={`Good morning, ${session?.name}.`}
        description="Here are your clinical activities, schedules, and active patient listings."
        actions={
          <>
            <Button variant="ghost" icon={Pill} onClick={() => setPrescriptionOpen(true)}>Prescribe</Button>
            <Button icon={FlaskConical} onClick={() => setLabOpen(true)}>Order Lab</Button>
          </>
        }
      />

      <section className="stat-grid">
        <StatCard label="My Consultations Today" value={myAppointments.length} detail="Next in 30 min" icon={CalendarDays} tone="purple" />
        <StatCard label="My Inpatients" value={myInpatients.length} detail="Admitted under your care" icon={Users} tone="blue" />
        <StatCard label="Labs under Review" value={myLabs.filter(l => l.status !== 'Completed').length} detail="Awaiting diagnostic results" icon={FlaskConical} tone="teal" />
        <StatCard label="Pharmacy Alert Items" value={lowStockCount} detail="Low stock medications" icon={Pill} tone="amber" />
      </section>

      <section className="dashboard-main-grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <Card className="table-card" style={{ padding: '20px' }}>
          <div className="card-heading" style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span>Daily Rhythm</span>
              <h2>My Schedule & Consultations</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/app/appointments')}>View Calendar</Button>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Patient</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myAppointments.map(appt => (
                  <tr key={appt.id}>
                    <td><b>{appt.time}</b></td>
                    <td>{appt.patient}</td>
                    <td>{appt.type}</td>
                    <td><Badge tone={appt.status === 'Checked in' ? 'blue' : appt.status === 'Confirmed' ? 'success' : 'neutral'}>{appt.status}</Badge></td>
                  </tr>
                ))}
                {!myAppointments.length && (
                  <tr><td colSpan="4" style={{ textAlign: 'center', color: 'var(--muted)' }}>No consultations scheduled for today.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card style={{ padding: '20px' }}>
          <div className="card-heading" style={{ marginBottom: '18px' }}>
            <span>Care Unit Placement</span>
            <h2>Patients Under My Care</h2>
          </div>
          <div className="activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {myInpatients.map(patient => (
              <div key={patient.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span className="activity-icon admit" style={{ width: '32px', height: '32px', display: 'grid', placeItems: 'center', borderRadius: '8px' }}><BedDouble size={16} /></span>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '12px' }}>{patient.patientName}</b>
                  <p style={{ fontSize: '10.5px', color: 'var(--muted)' }}>{patient.ward} · {patient.bedId}</p>
                </div>
                <Badge tone="blue">{patient.reason.split(' ')[0]}</Badge>
              </div>
            ))}
            {!myInpatients.length && (
              <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '11px', paddingTop: '15px' }}>No active admitted patients.</p>
            )}
          </div>
        </Card>
      </section>

      {/* Prescription Modal */}
      <Modal open={prescriptionOpen} onClose={() => setPrescriptionOpen(false)} title="Prescribe Medication" subtitle="Deducts stock automatically from pharmacy records.">
        <form onSubmit={handlePrescription} className="form-grid">
          <label className="field field-wide">
            <span>Select Admitted Patient</span>
            <select value={presForm.patientName} onChange={e => setPresForm({ ...presForm, patientName: e.target.value })} required>
              {patients.map(p => <option key={p.id} value={p.name}>{p.name} ({p.id})</option>)}
            </select>
          </label>
          <label className="field field-wide">
            <span>Medication</span>
            <select value={presForm.medicineId} onChange={e => setPresForm({ ...presForm, medicineId: e.target.value })} required>
              {medicines.map(m => <option key={m.id} value={m.id}>{m.name} ({m.stock} left)</option>)}
            </select>
          </label>
          <label className="field field-wide">
            <span>Dosage & Instructions</span>
            <textarea value={presForm.instructions} onChange={e => setPresForm({ ...presForm, instructions: e.target.value })} placeholder="e.g. 1 tab twice daily after meals for 5 days" required />
          </label>
          <div className="modal-actions field-wide">
            <Button type="button" variant="ghost" onClick={() => setPrescriptionOpen(false)}>Cancel</Button>
            <Button type="submit">Submit Prescription</Button>
          </div>
        </form>
      </Modal>

      {/* Lab Order Modal */}
      <Modal open={labOpen} onClose={() => setLabOpen(false)} title="Request Diagnostic Lab Test" subtitle="Orders a new sample verification.">
        <form onSubmit={handleLabOrder} className="form-grid">
          <label className="field field-wide">
            <span>Patient Name</span>
            <select value={labForm.patientName} onChange={e => setLabForm({ ...labForm, patientName: e.target.value })} required>
              {patients.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </label>
          <label className="field field-wide">
            <span>Test Type</span>
            <select value={labForm.test} onChange={e => setLabForm({ ...labForm, test: e.target.value })} required>
              <option>Complete blood count</option>
              <option>Cardiac enzyme panel</option>
              <option>Pulmonary function</option>
              <option>Metabolic panel</option>
              <option>HbA1c</option>
            </select>
          </label>
          <label className="field field-wide">
            <span>Assigned Lab Technician</span>
            <select value={labForm.technician} onChange={e => setLabForm({ ...labForm, technician: e.target.value })} required>
              <option>Sri Lekha</option>
              <option>Vasu Babu</option>
            </select>
          </label>
          <div className="modal-actions field-wide">
            <Button type="button" variant="ghost" onClick={() => setLabOpen(false)}>Cancel</Button>
            <Button type="submit">Issue Lab Order</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

// -------------------------------------------------------------
// 3. NURSE DASHBOARD
// -------------------------------------------------------------
function NurseDashboard() {
  const { beds, admissions, emergencies, session, updateBedStatus } = useApp()
  const [bedUpdateOpen, setBedUpdateOpen] = useState(false)
  const [selectedBed, setSelectedBed] = useState({ id: '', status: '' })

  const nurseWard = 'ICU' // default ward for Kalyani Lakshmi (N-401)

  const wardBeds = useMemo(() => {
    return beds.filter(b => b.ward === nurseWard)
  }, [beds])

  const cleaningBeds = useMemo(() => {
    return beds.filter(b => b.status === 'Cleaning')
  }, [beds])

  const submitBedStatus = (e) => {
    e.preventDefault()
    updateBedStatus(selectedBed.id, selectedBed.status)
    setBedUpdateOpen(false)
  }

  return (
    <div className="page dashboard-page">
      <PageHeader
        eyebrow="Care Operations & Ward Logistics"
        title={`Good morning, ${session?.name}.`}
        description={`Active duty: ${nurseWard} Ward · Clinical & Triage tracking Dashboard.`}
        actions={
          <Button variant="ghost" icon={Wrench} onClick={() => setBedUpdateOpen(true)}>Update Bed Readiness</Button>
        }
      />

      <section className="stat-grid">
        <StatCard label="ICU Beds Occupied" value={wardBeds.filter(b => b.status === 'Occupied').length} detail={`Out of ${wardBeds.length} total beds`} icon={BedDouble} tone="red" />
        <StatCard label="ICU Beds Available" value={wardBeds.filter(b => b.status === 'Available').length} detail="Ready for incoming admissions" icon={CheckCircle2} tone="green" />
        <StatCard label="Beds Cleaning (Global)" value={cleaningBeds.length} detail="Urgent turnover requested" icon={Wrench} tone="amber" />
        <StatCard label="ER Triage Arrivals" value={emergencies.length} detail="Active triage queue" icon={Ambulance} tone="purple" />
      </section>

      <section className="dashboard-main-grid" style={{ gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        <Card style={{ padding: '20px' }}>
          <div className="card-heading" style={{ marginBottom: '18px' }}>
            <span>Live Layout Map</span>
            <h2>ICU Ward Bed Snapshot</h2>
          </div>
          <div className="mini-bed-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
            {wardBeds.map((bed) => {
              const statusClass = bed.status.toLowerCase()
              return (
                <button
                  key={bed.id}
                  className={`mini-bed ${statusClass}`}
                  style={{
                    padding: '12px 6px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    background: bed.status === 'Occupied' ? 'rgba(239, 68, 68, 0.08)' : bed.status === 'Available' ? 'rgba(16, 185, 129, 0.08)' : 'var(--surface-soft)',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setSelectedBed({ id: bed.id, status: bed.status })
                    setBedUpdateOpen(true)
                  }}
                >
                  <BedDouble size={18} style={{ color: bed.status === 'Occupied' ? '#fb7185' : bed.status === 'Available' ? '#4ade80' : 'var(--muted)' }} />
                  <b style={{ fontSize: '10px' }}>{bed.id.split('-')[1]}</b>
                  <small style={{ fontSize: '7.5px', color: 'var(--muted)' }}>{bed.status}</small>
                </button>
              )
            })}
          </div>
        </Card>

        <Card style={{ padding: '20px' }}>
          <div className="card-heading" style={{ marginBottom: '18px' }}>
            <span>Triage Board</span>
            <h2>Active ER Queue</h2>
          </div>
          <div className="activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {emergencies.slice(0, 4).map(er => (
              <div key={er.id} style={{ display: 'flex', justifySelf: 'stretch', alignItems: 'center', gap: '12px', paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
                <span className="activity-icon" style={{ background: er.priority === 'Critical' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', color: er.priority === 'Critical' ? '#fb7185' : '#f59e0b', width: '32px', height: '32px', display: 'grid', placeItems: 'center', borderRadius: '8px' }}><Siren size={15} /></span>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '12px' }}>{er.patient}</b> <small style={{ color: 'var(--muted)' }}>({er.age}y)</small>
                  <p style={{ fontSize: '10.5px', color: 'var(--muted)', marginTop: '2px' }}>{er.complaint}</p>
                </div>
                <Badge tone={er.priority === 'Critical' ? 'danger' : 'warning'}>{er.priority}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Bed Status Update Modal */}
      <Modal open={bedUpdateOpen} onClose={() => setBedUpdateOpen(false)} title="Update Bed Placement Status" subtitle="Set readiness availability.">
        <form onSubmit={submitBedStatus} className="form-grid">
          <label className="field field-wide">
            <span>Select Bed ID</span>
            <select value={selectedBed.id} onChange={e => setSelectedBed({ ...selectedBed, id: e.target.value })} required>
              <option value="">Select a bed</option>
              {beds.map(b => <option key={b.id} value={b.id}>{b.id} ({b.ward} · {b.status})</option>)}
            </select>
          </label>
          <label className="field field-wide">
            <span>Readiness Status</span>
            <select value={selectedBed.status} onChange={e => setSelectedBed({ ...selectedBed, status: e.target.value })} required>
              <option value="Available">Available (Ready for Admission)</option>
              <option value="Cleaning">Needs Cleaning / Sanitization</option>
              <option value="Maintenance">Maintenance Queue</option>
              <option value="Reserved">Reserved</option>
            </select>
          </label>
          <div className="modal-actions field-wide">
            <Button type="button" variant="ghost" onClick={() => setBedUpdateOpen(false)}>Cancel</Button>
            <Button type="submit">Update Status</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

// -------------------------------------------------------------
// 4. RECEPTIONIST DASHBOARD
// -------------------------------------------------------------
function ReceptionistDashboard() {
  const { appointments, invoices, emergencies, checkInAppointment, payInvoice, registerEmergency, addAppointment } = useApp()
  const [apptModal, setApptModal] = useState(false)
  const [erModal, setErModal] = useState(false)
  
  const [apptForm, setApptForm] = useState({ patient: '', doctor: 'Dr. Srinivasa Rao', time: '10:00', type: 'Consultation' })
  const [erForm, setErForm] = useState({ patient: '', age: '', complaint: '', priority: 'Moderate', room: 'Bay 1' })

  const pendingCheckIn = appointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending')
  const unpaidBills = invoices.filter(i => i.status !== 'Paid')

  const handleApptSubmit = (e) => {
    e.preventDefault()
    addAppointment({ ...apptForm, status: 'Confirmed' })
    setApptModal(false)
    setApptForm({ patient: '', doctor: 'Dr. Srinivasa Rao', time: '10:00', type: 'Consultation' })
  }

  const handleErSubmit = (e) => {
    e.preventDefault()
    registerEmergency({ ...erForm, age: Number(erForm.age), arrival: 'Just now', vitals: 'BP 120/80 · HR 72' })
    setErModal(false)
    setErForm({ patient: '', age: '', complaint: '', priority: 'Moderate', room: 'Bay 1' })
  }

  return (
    <div className="page dashboard-page">
      <PageHeader
        eyebrow="Front Office Operations"
        title="Good morning, VENKAT."
        description="Patient intake, scheduled check-ins, and invoice settlement dashboard."
        actions={
          <>
            <Button variant="ghost" icon={CalendarDays} onClick={() => setApptModal(true)}>New Appointment</Button>
            <Button icon={Ambulance} onClick={() => setErModal(true)}>Emergency Registry</Button>
          </>
        }
      />

      <section className="stat-grid">
        <StatCard label="Today's Consultations" value={appointments.length} detail="Scheduled visits" icon={CalendarDays} tone="blue" />
        <StatCard label="Awaiting Check-in" value={pendingCheckIn.length} detail="Please process registration" icon={Clock3} tone="purple" />
        <StatCard label="Outstanding Invoices" value={unpaidBills.length} detail="Billing queue" icon={DollarSign} tone="amber" />
        <StatCard label="Active ER Board" value={emergencies.length} detail="Registered emergencies" icon={Ambulance} tone="red" />
      </section>

      <section className="dashboard-main-grid" style={{ gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
        <Card style={{ padding: '20px' }}>
          <div className="card-heading" style={{ marginBottom: '16px' }}>
            <span>Check-in Coordinator</span>
            <h2>Expected Arrivals & Check-ins</h2>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingCheckIn.map(appt => (
                  <tr key={appt.id}>
                    <td><b>{appt.patient}</b></td>
                    <td>{appt.doctor}</td>
                    <td>{appt.time}</td>
                    <td>
                      <Button variant="ghost" size="sm" onClick={() => checkInAppointment(appt.id)}>Check In</Button>
                    </td>
                  </tr>
                ))}
                {!pendingCheckIn.length && (
                  <tr><td colSpan="4" style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '11px' }}>All expected patients are checked in.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card style={{ padding: '20px' }}>
          <div className="card-heading" style={{ marginBottom: '16px' }}>
            <span>Billing Desk</span>
            <h2>Outstanding Invoice Registry</h2>
          </div>
          <div className="activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {unpaidBills.slice(0, 4).map(bill => (
              <div key={bill.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
                <span className="activity-icon billing" style={{ width: '32px', height: '32px', display: 'grid', placeItems: 'center', borderRadius: '8px' }}><CreditCard size={15} /></span>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: '12px' }}>{bill.patient}</b>
                  <p style={{ fontSize: '10px', color: 'var(--muted)' }}>{bill.service} · ${bill.amount}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => payInvoice(bill.id)}>Record Pay</Button>
              </div>
            ))}
            {!unpaidBills.length && (
              <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '11px', paddingTop: '15px' }}>No unpaid billing items.</p>
            )}
          </div>
        </Card>
      </section>

      {/* Appointment Modal */}
      <Modal open={apptModal} onClose={() => setApptModal(false)} title="Schedule New Patient Appointment">
        <form onSubmit={handleApptSubmit} className="form-grid">
          <Field label="Patient Name" placeholder="e.g. Siva Prasad" value={apptForm.patient} onChange={val => setApptForm({ ...apptForm, patient: val.target.value })} required />
          <Field label="Consultation Time" type="time" value={apptForm.time} onChange={val => setApptForm({ ...apptForm, time: val.target.value })} required />
          <label className="field field-wide">
            <span>Doctor Choice</span>
            <select value={apptForm.doctor} onChange={e => setApptForm({ ...apptForm, doctor: e.target.value })} required>
              <option>Dr. Srinivasa Rao</option>
              <option>Dr. Murali Krishna</option>
              <option>Dr. Swathi Reddy</option>
              <option>Dr. Venkat Avula</option>
            </select>
          </label>
          <div className="modal-actions field-wide">
            <Button type="button" variant="ghost" onClick={() => setApptModal(false)}>Cancel</Button>
            <Button type="submit">Schedule Confirm</Button>
          </div>
        </form>
      </Modal>

      {/* Emergency Registry Modal */}
      <Modal open={erModal} onClose={() => setErModal(false)} title="Register Emergency Patient Intake">
        <form onSubmit={handleErSubmit} className="form-grid">
          <Field label="Patient Name" placeholder="e.g. K. Prasad" value={erForm.patient} onChange={val => setErForm({ ...erForm, patient: val.target.value })} required />
          <Field label="Age" type="number" value={erForm.age} onChange={val => setErForm({ ...erForm, age: val.target.value })} required />
          <Field label="Chief Complaint" placeholder="e.g. Acute appendicitis" value={erForm.complaint} onChange={val => setErForm({ ...erForm, complaint: val.target.value })} required />
          <label className="field">
            <span>Priority Triage</span>
            <select value={erForm.priority} onChange={e => setErForm({ ...erForm, priority: e.target.value })} required>
              <option>Critical</option>
              <option>Urgent</option>
              <option>Moderate</option>
            </select>
          </label>
          <Field label="Room Assignment" placeholder="e.g. Trauma 1" value={erForm.room} onChange={val => setErForm({ ...erForm, room: val.target.value })} required />
          <div className="modal-actions field-wide">
            <Button type="button" variant="ghost" onClick={() => setErModal(false)}>Cancel</Button>
            <Button type="submit">Register Arrival</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

// -------------------------------------------------------------
// 5. PATIENT PORTAL DASHBOARD
// -------------------------------------------------------------
function PatientDashboard() {
  const { session, patients, appointments, labs, invoices, addAppointment, payInvoice } = useApp()
  const [bookingOpen, setBookingOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [bookingForm, setBookingForm] = useState({ doctor: 'Dr. Srinivasa Rao', time: '14:00', date: '2026-07-04' })

  const patientRecord = useMemo(() => {
    return patients.find(p => p.name.toLowerCase() === session?.name?.toLowerCase()) || patients[0]
  }, [patients, session])

  const myAppointments = useMemo(() => {
    return appointments.filter(a => a.patient.toLowerCase() === session?.name?.toLowerCase())
  }, [appointments, session])

  const myLabs = useMemo(() => {
    return labs.filter(l => l.patient.toLowerCase() === session?.name?.toLowerCase())
  }, [labs, session])

  const myInvoices = useMemo(() => {
    return invoices.filter(i => i.patient.toLowerCase() === session?.name?.toLowerCase())
  }, [invoices, session])

  const unpaidBalance = useMemo(() => {
    return myInvoices.filter(i => i.status !== 'Paid').reduce((acc, curr) => acc + curr.amount, 0)
  }, [myInvoices])

  const submitAppointmentRequest = (e) => {
    e.preventDefault()
    addAppointment({
      patient: session.name,
      doctor: bookingForm.doctor,
      time: `${bookingForm.date} · ${bookingForm.time}`,
      type: 'Consultation',
      status: 'Pending'
    })
    setBookingOpen(false)
  }

  const handleBillPayment = () => {
    payInvoice(selectedInvoice.id)
    setPaymentOpen(false)
    setSelectedInvoice(null)
  }

  return (
    <div className="page dashboard-page">
      <PageHeader
        eyebrow="My Personal Health Portal"
        title={`Good morning, ${session?.name?.split(' ')[0]}.`}
        description="View your diagnostics, scheduled visits, billing receipts, and care summaries."
        actions={
          <>
            <Button variant="ghost" icon={CalendarDays} onClick={() => setBookingOpen(true)}>Book Consultation</Button>
            {unpaidBalance > 0 && (
              <Button icon={CreditCard} onClick={() => {
                const unpaid = myInvoices.find(i => i.status !== 'Paid')
                if (unpaid) {
                  setSelectedInvoice(unpaid)
                  setPaymentOpen(true)
                }
              }}>Pay Due Bills</Button>
            )}
          </>
        }
      />

      <section className="stat-grid">
        <StatCard label="Upcoming Appointments" value={myAppointments.filter(a => a.status !== 'Completed').length} detail="Next scheduled consultation" icon={CalendarDays} tone="purple" />
        <StatCard label="Completed Lab Tests" value={myLabs.filter(l => l.status === 'Completed').length} detail="Verified diagnostics on file" icon={FlaskConical} tone="green" />
        <StatCard label="Outstanding Balance" value={`$${unpaidBalance.toLocaleString()}`} detail="Insurance claims processing" icon={DollarSign} tone="amber" />
        <StatCard label="Clinical Record Status" value={patientRecord?.status || 'Outpatient'} detail="Active registry tier" icon={CheckCircle2} tone="blue" />
      </section>

      <section className="dashboard-main-grid" style={{ gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card style={{ padding: '20px' }}>
            <div className="card-heading" style={{ marginBottom: '16px' }}>
              <span>Verified Health History</span>
              <h2>My Patient Profile</h2>
            </div>
            <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div><span style={{ color: 'var(--muted)', fontSize: '11px' }}>Primary Diagnosis</span><br /><b style={{ fontSize: '13px' }}>{patientRecord?.diagnosis}</b></div>
              <div><span style={{ color: 'var(--muted)', fontSize: '11px' }}>Known Allergies</span><br /><b style={{ fontSize: '13px' }}>{patientRecord?.allergies}</b></div>
              <div><span style={{ color: 'var(--muted)', fontSize: '11px' }}>Emergency Contact</span><br /><b style={{ fontSize: '13px' }}>{patientRecord?.emergency}</b></div>
              <div><span style={{ color: 'var(--muted)', fontSize: '11px' }}>Insurance Provider</span><br /><b style={{ fontSize: '13px' }}>{patientRecord?.insurance}</b></div>
            </div>
          </Card>

          <Card style={{ padding: '20px' }}>
            <div className="card-heading" style={{ marginBottom: '16px' }}>
              <span>Recent Invoices</span>
              <h2>Billing Receipt Tracker</h2>
            </div>
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {myInvoices.map(bill => (
                    <tr key={bill.id}>
                      <td><b>{bill.service}</b></td>
                      <td>{bill.date}</td>
                      <td>${bill.amount}</td>
                      <td><Badge tone={bill.status === 'Paid' ? 'success' : 'warning'}>{bill.status}</Badge></td>
                      <td>
                        {bill.status !== 'Paid' && (
                          <Button variant="ghost" size="sm" onClick={() => {
                            setSelectedInvoice(bill)
                            setPaymentOpen(true)
                          }}>Pay Now</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card style={{ padding: '20px' }}>
            <div className="card-heading" style={{ marginBottom: '16px' }}>
              <span>Diagnostics Center</span>
              <h2>My Laboratory Results</h2>
            </div>
            <div className="activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {myLabs.map(labItem => (
                <div key={labItem.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
                  <span className="activity-icon lab" style={{ width: '32px', height: '32px', display: 'grid', placeItems: 'center', borderRadius: '8px' }}><FlaskConical size={15} /></span>
                  <div style={{ flex: 1 }}>
                    <b style={{ fontSize: '12px' }}>{labItem.test}</b>
                    <p style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>Order: {labItem.id} · progress: {labItem.progress}%</p>
                  </div>
                  <Badge tone={labItem.status === 'Completed' ? 'success' : 'blue'}>{labItem.status}</Badge>
                </div>
              ))}
              {!myLabs.length && (
                <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '11px', paddingTop: '15px' }}>No laboratory reports documented.</p>
              )}
            </div>
          </Card>

          <Card style={{ padding: '20px' }}>
            <div className="card-heading" style={{ marginBottom: '16px' }}>
              <span>Advisories & Visits</span>
              <h2>Upcoming Appointments</h2>
            </div>
            <div className="activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {myAppointments.map(appt => (
                <div key={appt.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
                  <span className="activity-icon" style={{ background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', width: '32px', height: '32px', display: 'grid', placeItems: 'center', borderRadius: '8px' }}><CalendarDays size={15} /></span>
                  <div style={{ flex: 1 }}>
                    <b style={{ fontSize: '12px' }}>{appt.doctor}</b>
                    <p style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>{appt.time} · {appt.type}</p>
                  </div>
                  <Badge tone={appt.status === 'Confirmed' ? 'success' : 'warning'}>{appt.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Appointment Request Modal */}
      <Modal open={bookingOpen} onClose={() => setBookingOpen(false)} title="Book Clinical Consultation" subtitle="Request an appointment with a primary physician.">
        <form onSubmit={submitAppointmentRequest} className="form-grid">
          <label className="field field-wide">
            <span>Choose Attending Physician</span>
            <select value={bookingForm.doctor} onChange={e => setBookingForm({ ...bookingForm, doctor: e.target.value })} required>
              <option>Dr. Srinivasa Rao · Cardiology</option>
              <option>Dr. Murali Krishna · Neurology</option>
              <option>Dr. Swathi Reddy · Pediatrics</option>
              <option>Dr. Venkat Avula · Orthopedics</option>
            </select>
          </label>
          <Field label="Choose Date" type="date" value={bookingForm.date} onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })} required />
          <Field label="Choose Time" type="time" value={bookingForm.time} onChange={e => setBookingForm({ ...bookingForm, time: e.target.value })} required />
          <div className="modal-actions field-wide">
            <Button type="button" variant="ghost" onClick={() => setBookingOpen(false)}>Cancel</Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </Modal>

      {/* Billing Invoice Payment Modal */}
      <Modal open={paymentOpen} onClose={() => setPaymentOpen(false)} title="Secure Patient Billing Checkout" subtitle={`Invoice ID: ${selectedInvoice?.id || ''}`}>
        <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--surface-soft)', borderRadius: '10px' }}>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Outstanding Charge</span>
          <h2 style={{ fontSize: '24px', margin: '4px 0' }}>${selectedInvoice?.amount.toLocaleString()}</h2>
          <span style={{ fontSize: '11px', color: 'var(--text-soft)' }}>Service: {selectedInvoice?.service}</span>
        </div>
        <div className="form-grid">
          <Field label="Cardholder Name" defaultValue={session?.name} required className="field-wide" />
          <Field label="Credit Card Number" placeholder="4111 2222 3333 4444" required className="field-wide" />
          <Field label="Expiry (MM/YY)" placeholder="12/28" required />
          <Field label="CVV" placeholder="382" type="password" maxLength="3" required />
          <div className="modal-actions field-wide">
            <Button type="button" variant="ghost" onClick={() => setPaymentOpen(false)}>Cancel</Button>
            <Button onClick={handleBillPayment}>Confirm and Pay Now</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
