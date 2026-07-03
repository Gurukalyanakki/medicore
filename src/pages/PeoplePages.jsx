import { motion } from 'framer-motion'
import {
  BriefcaseMedical, CalendarDays, Check, Clock3, Edit3, Filter, Mail, MapPin,
  MoreHorizontal, Phone, Plus, SearchX, ShieldCheck, Star, Trash2, UserRound,
  UsersRound, X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  Avatar, Badge, Button, Card, ConfirmDialog, EmptyState, Field, KebabMenu,
  Modal, PageHeader, Progress, SearchInput, Select, Tabs,
} from '../components/ui'
import { useApp } from '../context/AppContext'

const toneForStatus = (status) => ({
  Admitted: 'blue', Outpatient: 'neutral', Available: 'success', 'In surgery': 'purple',
  'On rounds': 'warning', 'Off duty': 'neutral', 'On duty': 'success', 'On leave': 'warning',
  Remote: 'blue',
}[status] || 'neutral')

const blankPatient = { name: '', age: '', gender: 'Female', blood: 'O+', phone: '', emergency: '', insurance: '', allergies: 'None', diagnosis: '', status: 'Outpatient' }

export function PatientsPage() {
  const { patients, addPatient, updatePatient, deletePatient } = useApp()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All statuses')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm] = useState(blankPatient)
  const perPage = 5
  const filtered = patients.filter((item) => `${item.name} ${item.id} ${item.diagnosis}`.toLowerCase().includes(query.toLowerCase()) && (status === 'All statuses' || item.status === status))
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage)
  const openAdd = () => { setEditing('new'); setForm(blankPatient) }
  const openEdit = (patient) => { setEditing(patient); setForm(patient) }
  const save = (event) => {
    event.preventDefault()
    if (editing === 'new') addPatient({ ...form, age: Number(form.age) })
    else updatePatient(editing.id, { ...form, age: Number(form.age) })
    setEditing(null)
  }
  return (
    <div className="page">
      <PageHeader eyebrow="Care delivery" title="Patients" description="A complete, current view of every patient in your care network." actions={<><Button variant="ghost" icon={Filter}>Advanced filters</Button><Button icon={Plus} onClick={openAdd}>Add patient</Button></>} />
      <section className="mini-stats">
        <div><span className="mini-icon blue"><UserRound /></span><b>{patients.length}<small>Total patients</small></b><em>+12 this month</em></div>
        <div><span className="mini-icon teal"><CalendarDays /></span><b>48<small>Visits today</small></b><em>14 pending</em></div>
        <div><span className="mini-icon purple"><BriefcaseMedical /></span><b>{patients.filter((item) => item.status === 'Admitted').length}<small>Currently admitted</small></b><em>Across 7 wards</em></div>
      </section>
      <Card className="table-card">
        <div className="table-toolbar"><SearchInput value={query} onChange={(value) => { setQuery(value); setPage(1) }} placeholder="Search by name, ID, or diagnosis…" /><Select value={status} onChange={setStatus}><option>All statuses</option><option>Admitted</option><option>Outpatient</option></Select><span>{filtered.length} records</span></div>
        <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Patient</th><th>Clinical details</th><th>Contact</th><th>Insurance</th><th>Status</th><th /></tr></thead><tbody>{pageItems.map((patient) => <tr key={patient.id} onClick={() => setSelected(patient)}><td><div className="person-cell"><Avatar name={patient.name} /><span><b>{patient.name}</b><small>{patient.id} · {patient.age} yrs · {patient.gender}</small></span></div></td><td><b>{patient.diagnosis}</b><small>{patient.blood} blood · {patient.allergies === 'None' ? 'No known allergies' : `Allergy: ${patient.allergies}`}</small></td><td><span>{patient.phone}</span><small>Last visit: {patient.lastVisit}</small></td><td>{patient.insurance}</td><td><Badge tone={toneForStatus(patient.status)} dot>{patient.status}</Badge></td><td onClick={(event) => event.stopPropagation()}><KebabMenu><button onClick={() => setSelected(patient)}><UserRound /> View profile</button><button onClick={() => openEdit(patient)}><Edit3 /> Edit record</button><button className="danger" onClick={() => setDeleting(patient)}><Trash2 /> Delete</button></KebabMenu></td></tr>)}</tbody></table></div>
        {pageItems.length === 0 && <EmptyState icon={SearchX} title="No patients found" message="Try another search term or clear your filters." action={<Button variant="ghost" onClick={() => { setQuery(''); setStatus('All statuses') }}>Clear filters</Button>} />}
        <div className="table-footer"><span>Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</span><div><button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>{Array.from({ length: Math.max(1, Math.ceil(filtered.length / perPage)) }, (_, index) => <button className={page === index + 1 ? 'active' : ''} key={index} onClick={() => setPage(index + 1)}>{index + 1}</button>)}<button disabled={page >= Math.ceil(filtered.length / perPage)} onClick={() => setPage(page + 1)}>Next</button></div></div>
      </Card>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Patient profile" subtitle={selected ? `${selected.id} · Last updated ${selected.lastVisit}` : ''} size="lg">
        {selected && <div className="patient-profile"><div className="patient-hero"><Avatar name={selected.name} size="lg" /><div><h3>{selected.name}</h3><span>{selected.age} years · {selected.gender} · {selected.blood}</span><Badge tone={toneForStatus(selected.status)} dot>{selected.status}</Badge></div><Button variant="ghost" icon={Edit3} onClick={() => { setSelected(null); openEdit(selected) }}>Edit record</Button></div>
          <div className="profile-grid"><div><span>Primary diagnosis</span><b>{selected.diagnosis}</b></div><div><span>Allergies</span><b>{selected.allergies}</b></div><div><span>Insurance</span><b>{selected.insurance}</b></div><div><span>Emergency contact</span><b>{selected.emergency}</b></div></div>
          <div className="profile-section"><h3>Medical history</h3><div className="timeline"><div><i /><span><b>Clinical evaluation</b><small>{selected.lastVisit} · Vitals stable, care plan reviewed</small></span></div><div><i /><span><b>Diagnostic assessment</b><small>Jun 18 · {selected.diagnosis} documented</small></span></div><div><i /><span><b>Patient registered</b><small>Apr 08 · Medical and insurance records verified</small></span></div></div></div>
          <div className="profile-section"><h3>Contact information</h3><p className="contact-row"><Phone /> {selected.phone}</p><p className="contact-row"><ShieldCheck /> {selected.insurance}</p></div>
        </div>}
      </Modal>

      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title={editing === 'new' ? 'Add a patient' : 'Edit patient record'} subtitle="Clinical and contact information is stored locally in this demo." size="lg">
        <form onSubmit={save} className="form-grid">
          <Field label="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          <Field label="Age" type="number" min="0" max="120" value={form.age} onChange={(event) => setForm({ ...form, age: event.target.value })} required />
          <label className="field"><span>Gender</span><select value={form.gender} onChange={(event) => setForm({ ...form, gender: event.target.value })}><option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option></select></label>
          <label className="field"><span>Blood group</span><select value={form.blood} onChange={(event) => setForm({ ...form, blood: event.target.value })}>{['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((blood) => <option key={blood}>{blood}</option>)}</select></label>
          <Field label="Phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} required />
          <Field label="Emergency contact" value={form.emergency} onChange={(event) => setForm({ ...form, emergency: event.target.value })} required />
          <Field label="Insurance" value={form.insurance} onChange={(event) => setForm({ ...form, insurance: event.target.value })} required />
          <Field label="Allergies" value={form.allergies} onChange={(event) => setForm({ ...form, allergies: event.target.value })} />
          <Field label="Diagnosis" className="field-wide" value={form.diagnosis} onChange={(event) => setForm({ ...form, diagnosis: event.target.value })} required />
          <div className="modal-actions field-wide"><Button type="button" variant="ghost" onClick={() => setEditing(null)}>Cancel</Button><Button type="submit">{editing === 'new' ? 'Add patient' : 'Save changes'}</Button></div>
        </form>
      </Modal>
      <ConfirmDialog open={Boolean(deleting)} title="Delete patient record?" message={`${deleting?.name || 'This patient'} will be removed from the local registry. You can undo the action from the confirmation toast.`} confirmLabel="Delete patient" onClose={() => setDeleting(null)} onConfirm={() => deletePatient(deleting.id)} />
    </div>
  )
}

export function DoctorsPage() {
  const { doctors, addDoctor } = useApp()
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('All departments')
  const [selected, setSelected] = useState(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', specialty: '', department: 'General', experience: '', schedule: '09:00 – 17:00', status: 'Available' })
  const filtered = doctors.filter((doctor) => `${doctor.name} ${doctor.specialty}`.toLowerCase().includes(query.toLowerCase()) && (department === 'All departments' || doctor.department === department))
  const departments = [...new Set(doctors.map((doctor) => doctor.department))]

  const save = (event) => {
    event.preventDefault()
    addDoctor({ ...form, experience: Number(form.experience) })
    setAdding(false)
    setForm({ name: '', specialty: '', department: 'General', experience: '', schedule: '09:00 – 17:00', status: 'Available' })
  }

  return <div className="page">
    <PageHeader eyebrow="Medical team" title="Doctor directory" description="Specialists, availability, and schedules across every department." actions={<Button icon={Plus} onClick={() => setAdding(true)}>Add doctor</Button>} />
    <div className="directory-toolbar"><SearchInput value={query} onChange={setQuery} placeholder="Search doctors or specialties…" /><Select value={department} onChange={setDepartment}><option>All departments</option>{departments.map((item) => <option key={item}>{item}</option>)}</Select><div className="directory-count"><span className="online-dot" /> {doctors.filter((doctor) => doctor.status === 'Available').length} available now</div></div>
    <div className="doctor-grid">{filtered.map((doctor, index) => <motion.div key={doctor.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .05 }}><Card interactive className="doctor-card" onClick={() => setSelected(doctor)}>
      <div className="doctor-card-top"><Avatar name={doctor.name} color={doctor.color} size="lg" /><Badge tone={toneForStatus(doctor.status)} dot>{doctor.status}</Badge></div><h3>{doctor.name}</h3><p>{doctor.specialty}</p><span className="department-label">{doctor.department}</span>
      <div className="doctor-metrics"><span><Star fill="currentColor" /> <b>{doctor.rating}</b><small>Rating</small></span><span><BriefcaseMedical /><b>{doctor.experience}y</b><small>Experience</small></span><span><UsersRound /><b>{doctor.patients}</b><small>Patients</small></span></div>
      <div className="doctor-schedule"><Clock3 /><span><small>Today’s hours</small><b>{doctor.schedule}</b></span><button>View profile</button></div>
    </Card></motion.div>)}</div>
    <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Doctor profile" subtitle={selected?.id} size="lg">{selected && <div className="doctor-profile"><div className="patient-hero"><Avatar name={selected.name} color={selected.color} size="lg" /><div><h3>{selected.name}</h3><span>{selected.specialty} · {selected.experience} years experience</span><Badge tone={toneForStatus(selected.status)} dot>{selected.status}</Badge></div><Button icon={CalendarDays}>Book appointment</Button></div><div className="profile-grid"><div><span>Patient rating</span><b>{selected.rating} / 5.0</b></div><div><span>Patients handled</span><b>{selected.patients.toLocaleString()}</b></div><div><span>Department</span><b>{selected.department}</b></div><div><span>Today’s schedule</span><b>{selected.schedule}</b></div></div><div className="profile-section"><h3>Today’s calendar</h3><div className="schedule-slots">{['09:00 · Patient rounds', '10:30 · Consultation', '12:00 · Department review', '14:15 · Follow-up clinic', '16:30 · Case conference'].map((slot, index) => <span className={index === 2 ? 'blocked' : ''} key={slot}>{slot}</span>)}</div></div></div>}</Modal>

    <Modal open={adding} onClose={() => setAdding(false)} title="Add doctor" subtitle="Add a new physician to the hospital roster.">
      <form onSubmit={save} className="form-grid">
        <Field label="Doctor name" placeholder="Dr. S. Reddy" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        <Field label="Specialty" placeholder="e.g. Cardiology" value={form.specialty} onChange={(event) => setForm({ ...form, specialty: event.target.value })} required />
        <label className="field"><span>Department</span><select value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })}>{departments.map((dept) => <option key={dept}>{dept}</option>)}</select></label>
        <Field label="Years of experience" type="number" min="0" value={form.experience} onChange={(event) => setForm({ ...form, experience: event.target.value })} required />
        <Field label="Today’s schedule" placeholder="09:00 – 17:00" value={form.schedule} onChange={(event) => setForm({ ...form, schedule: event.target.value })} required />
        <label className="field"><span>Status</span><select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option>Available</option><option>On rounds</option><option>In surgery</option><option>Off duty</option></select></label>
        <div className="modal-actions field-wide"><Button type="button" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button><Button type="submit">Add doctor</Button></div>
      </form>
    </Modal>
  </div>
}

export function NursesPage() {
  const { nurses, addNurse } = useApp()
  const [tab, setTab] = useState('All nurses')
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', ward: 'General', shift: 'Morning', experience: '' })
  const filtered = tab === 'All nurses' ? nurses : nurses.filter((nurse) => nurse.status === tab)
  const wards = ['General', 'ICU', 'Emergency', 'Pediatrics', 'Cardiology', 'Orthopedics', 'Neurology']

  const save = (event) => {
    event.preventDefault()
    addNurse({ ...form, experience: Number(form.experience) })
    setAdding(false)
    setForm({ name: '', ward: 'General', shift: 'Morning', experience: '' })
  }

  return <div className="page"><PageHeader eyebrow="Care teams" title="Nursing staff" description="Shift coverage, ward assignments, and attendance at a glance." actions={<Button icon={Plus} onClick={() => setAdding(true)}>Add nurse</Button>} />
    <section className="mini-stats"><div><span className="mini-icon teal"><UsersRound /></span><b>{nurses.length}<small>Total nurses</small></b><em>Across 7 wards</em></div><div><span className="mini-icon blue"><Clock3 /></span><b>{nurses.filter((item) => item.status === 'On duty').length}<small>On duty now</small></b><em>Coverage optimal</em></div><div><span className="mini-icon purple"><Check /></span><b>96.8%<small>Avg. attendance</small></b><em>+1.4% this month</em></div></section>
    <Card className="table-card"><div className="table-toolbar"><Tabs items={['All nurses', 'On duty', 'Off duty', 'On leave']} value={tab} onChange={setTab} /></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Nurse</th><th>Ward</th><th>Shift</th><th>Experience</th><th>Attendance</th><th>Status</th><th /></tr></thead><tbody>{filtered.map((nurse) => <tr key={nurse.id}><td><div className="person-cell"><Avatar name={nurse.name} /><span><b>{nurse.name}</b><small>{nurse.id}</small></span></div></td><td><span className="department-label">{nurse.ward}</span></td><td>{nurse.shift}</td><td>{nurse.experience} years</td><td><div className="attendance-cell"><Progress value={nurse.attendance} color={nurse.attendance > 95 ? '#10b981' : '#f59e0b'} /><b>{nurse.attendance}%</b></div></td><td><Badge tone={toneForStatus(nurse.status)} dot>{nurse.status}</Badge></td><td><button className="icon-btn"><MoreHorizontal /></button></td></tr>)}</tbody></table></div></Card>

    <Modal open={adding} onClose={() => setAdding(false)} title="Add nurse" subtitle="Register a new nurse to shift rotation.">
      <form onSubmit={save} className="form-grid">
        <Field label="Nurse name" placeholder="Jane Smith" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        <label className="field"><span>Ward assignment</span><select value={form.ward} onChange={(event) => setForm({ ...form, ward: event.target.value })}>{wards.map((w) => <option key={w}>{w}</option>)}</select></label>
        <label className="field"><span>Shift</span><select value={form.shift} onChange={(event) => setForm({ ...form, shift: event.target.value })}><option>Morning</option><option>Evening</option><option>Night</option><option>General</option></select></label>
        <Field label="Years of experience" type="number" min="0" value={form.experience} onChange={(event) => setForm({ ...form, experience: event.target.value })} required />
        <div className="modal-actions field-wide"><Button type="button" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button><Button type="submit">Add nurse</Button></div>
      </form>
    </Modal>
  </div>
}

export function StaffPage() {
  const { staff, addStaff } = useApp()
  const [query, setQuery] = useState('')
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', role: 'Receptionist', department: 'Front Office', shift: 'Morning' })
  const groups = useMemo(() => [...new Set(staff.map((item) => item.role))], [staff])
  const filtered = staff.filter((item) => `${item.name} ${item.role} ${item.department}`.toLowerCase().includes(query.toLowerCase()))

  const save = (event) => {
    event.preventDefault()
    addStaff(form)
    setAdding(false)
    setForm({ name: '', role: 'Receptionist', department: 'Front Office', shift: 'Morning' })
  }

  return <div className="page"><PageHeader eyebrow="Hospital operations" title="Staff directory" description="The people supporting every clinical and administrative workflow." actions={<Button icon={Plus} onClick={() => setAdding(true)}>Add staff member</Button>} />
    <div className="role-summary">{groups.map((role) => <Card key={role}><span className="mini-icon blue"><UsersRound /></span><b>{staff.filter((item) => item.role === role).length}</b><small>{role}s</small></Card>)}</div>
    <Card className="table-card"><div className="table-toolbar"><SearchInput value={query} onChange={setQuery} placeholder="Search staff, roles, or departments…" /><span>{filtered.length} team members</span></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Team member</th><th>Role</th><th>Department</th><th>Shift</th><th>Status</th><th>Contact</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td><div className="person-cell"><Avatar name={item.name} /><span><b>{item.name}</b><small>{item.id}</small></span></div></td><td><b>{item.role}</b></td><td>{item.department}</td><td>{item.shift}</td><td><Badge tone={toneForStatus(item.status)} dot>{item.status}</Badge></td><td><div className="row-actions"><button className="icon-btn"><Mail /></button><button className="icon-btn"><Phone /></button></div></td></tr>)}</tbody></table></div></Card>

    <Modal open={adding} onClose={() => setAdding(false)} title="Add staff member" subtitle="Add administrative or operational support staff.">
      <form onSubmit={save} className="form-grid">
        <Field label="Staff name" placeholder="John Doe" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        <label className="field"><span>Role</span><select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}><option>Receptionist</option><option>Pharmacist</option><option>Lab Technician</option><option>HR Manager</option><option>Accountant</option></select></label>
        <label className="field"><span>Department</span><select value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })}><option>Front Office</option><option>Pharmacy</option><option>Diagnostics</option><option>Human Resources</option><option>Finance</option></select></label>
        <label className="field"><span>Shift</span><select value={form.shift} onChange={(event) => setForm({ ...form, shift: event.target.value })}><option>Morning</option><option>Evening</option><option>Night</option><option>General</option></select></label>
        <div className="modal-actions field-wide"><Button type="button" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button><Button type="submit">Add staff member</Button></div>
      </form>
    </Modal>
  </div>
}
