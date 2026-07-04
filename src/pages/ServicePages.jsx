import { motion } from 'framer-motion'
import {
  AlertTriangle, Ambulance, CalendarDays, CheckCircle2, ChevronLeft, ChevronRight,
  Clock3, CreditCard, DollarSign, Download, FileText, Filter, FlaskConical,
  HeartPulse, MapPin, Package, Plus, SearchX, ShoppingCart, Siren, TestTube2,
  TrendingUp, Truck, UserRound, XCircle,
} from 'lucide-react'
import { useState, useMemo } from 'react'
import {
  Badge, Button, Card, EmptyState, Modal, PageHeader, Progress, SearchInput,
  Select, Tabs, Field,
} from '../components/ui'
import { useApp } from '../context/AppContext'

const statusTone = (status) => ({
  'Checked in': 'blue', Confirmed: 'success', Pending: 'warning', Completed: 'success',
  Processing: 'blue', 'Sample collected': 'purple', Paid: 'success', 'Partially paid': 'warning',
  'Insurance review': 'blue', Critical: 'danger', Urgent: 'warning', Moderate: 'blue',
}[status] || 'neutral')

export function AppointmentsPage() {
  const { doctors, appointments, addAppointment, checkInAppointment, session } = useApp()
  const [selectedDay, setSelectedDay] = useState(3)
  const [query, setQuery] = useState('')
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(() => ({
    patient: session?.role === 'Patient' ? session.name : '',
    date: '2026-07-03',
    time: '16:30',
    doctor: doctors[0]?.name || ''
  }))

  const days = [29, 30, 1, 2, 3, 4, 5]
  const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const filtered = useMemo(() => {
    return appointments.filter((item) => {
      const matchesQuery = `${item.patient} ${item.doctor} ${item.type}`.toLowerCase().includes(query.toLowerCase())
      if (!matchesQuery) return false

      if (session?.role === 'Patient') {
        return item.patient.toLowerCase() === session.name.toLowerCase()
      }
      if (session?.role === 'Doctor') {
        return item.doctor.toLowerCase().includes(session.name.toLowerCase())
      }
      return true
    })
  }, [appointments, query, session])

  const save = (event) => {
    event.preventDefault()
    addAppointment({ ...form, type: 'Consultation' })
    setAdding(false)
    setForm({ patient: session?.role === 'Patient' ? session.name : '', date: '2026-07-03', time: '16:30', doctor: doctors[0]?.name || '' })
  }

  return <div className="page"><PageHeader eyebrow="Care coordination" title="Appointments" description="A clear daily rhythm for patients, clinicians, and care teams." actions={<Button icon={Plus} onClick={() => setAdding(true)}>New appointment</Button>} />
    <Card className="calendar-strip"><div className="calendar-month"><button aria-label="Previous month"><ChevronLeft /></button><div><span>July 2026</span><small>This week</small></div><button aria-label="Next month"><ChevronRight /></button></div><div className="calendar-days">{days.map((day, index) => <button className={selectedDay === day ? 'active' : ''} key={`${day}-${index}`} onClick={() => setSelectedDay(day)}><span>{week[index]}</span><b>{day}</b>{day === 3 && <i />}</button>)}</div><div className="calendar-summary"><b>{filtered.length}</b><span>Appointments<br />this week</span></div></Card>
    <div className="appointments-layout"><Card className="schedule-card"><div className="card-heading"><div><span>Friday, July 3</span><h2>Today’s schedule</h2></div><SearchInput value={query} onChange={setQuery} placeholder="Search schedule…" /></div><div className="appointment-list">{filtered.map((item, index) => <motion.div key={item.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .05 }}><span className="appointment-time">{item.time}</span><i className="appointment-line" style={{ background: item.color }} /><div className="appointment-main"><span className="appointment-icon" style={{ background: `${item.color}18`, color: item.color }}><UserRound /></span><div><h3>{item.patient}</h3><p>{item.type} · {item.doctor}</p></div></div><Badge tone={statusTone(item.status)} dot>{item.status}</Badge>{['Receptionist', 'Administrator'].includes(session?.role) && (item.status === 'Confirmed' || item.status === 'Pending') && <Button variant="ghost" size="sm" onClick={() => checkInAppointment(item.id)} style={{ marginLeft: '10px' }}>Check In</Button>}<button className="icon-btn" aria-label="View appointment details"><ChevronRight /></button></motion.div>)}</div></Card>
      {session?.role !== 'Patient' && <div className="availability-column"><Card><div className="card-heading"><div><span>Clinical team</span><h2>Doctor availability</h2></div><Badge tone="success">Live</Badge></div><div className="availability-list">{doctors.slice(0, 5).map((doctor) => <div key={doctor.id}><span style={{ background: doctor.color }}>{doctor.name.split(' ').slice(-1)[0][0]}</span><div><b>{doctor.name}</b><small>{doctor.specialty}</small></div><Badge tone={statusTone(doctor.status)} dot>{doctor.status}</Badge></div>)}</div></Card><Card className="next-slot"><span><Clock3 /></span><div><small>Next open slot</small><b>Today at 16:30</b><p>Dr. Sai Kiran · Emergency Medicine</p></div><Button variant="ghost" onClick={() => addAppointment({ patient: 'Walk-in Patient', date: '2026-07-03', time: '16:30', doctor: 'Dr. Sai Kiran', type: 'Emergency' })}>Reserve</Button></Card></div>}
    </div>
    <Modal open={adding} onClose={() => setAdding(false)} title="New appointment" subtitle="Schedule a patient with an available clinician."><form className="form-grid" onSubmit={save}><Field label="Patient name" required placeholder="Enter patient name" value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} disabled={session?.role === 'Patient'} /><Field label="Date" required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /><Field label="Time" required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /><label className="field"><span>Doctor</span><select value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })}>{doctors.map((doctor) => <option key={doctor.id}>{doctor.name} · {doctor.specialty}</option>)}</select></label><div className="modal-actions field-wide"><Button type="button" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button><Button type="submit">Schedule appointment</Button></div></form></Modal>
  </div>
}

export function LabsPage() {
  const { labs, addLabOrder, session } = useApp()
  const [tab, setTab] = useState('All reports')
  const [selected, setSelected] = useState(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ patient: '', test: 'Complete blood count', technician: 'Sri Lekha', progress: 10 })

  const filtered = useMemo(() => {
    let list = tab === 'All reports' ? labs : labs.filter((item) => item.status === tab)
    if (session?.role === 'Patient') {
      list = list.filter(item => item.patient.toLowerCase() === session.name.toLowerCase())
    }
    return list
  }, [labs, tab, session])

  const save = (event) => {
    event.preventDefault()
    addLabOrder(form)
    setAdding(false)
    setForm({ patient: '', test: 'Complete blood count', technician: 'Fatima Ali', progress: 10 })
  }

  const showActions = session?.role !== 'Patient'

  return <div className="page"><PageHeader eyebrow="Diagnostics" title="Lab reports" description="Track every diagnostic order from collection to verified result." actions={showActions ? <Button icon={Plus} onClick={() => setAdding(true)}>New lab order</Button> : null} />
    <section className="mini-stats"><div><span className="mini-icon purple"><TestTube2 /></span><b>{labs.length}<small>Orders today</small></b><em>8 STAT priority</em></div><div><span className="mini-icon blue"><FlaskConical /></span><b>{labs.filter(i => i.status !== 'Completed').length}<small>In progress</small></b><em>Median 46 min</em></div><div><span className="mini-icon teal"><CheckCircle2 /></span><b>{labs.filter(i => i.status === 'Completed').length}<small>Completed</small></b><em>98% within SLA</em></div></section>
    <Card className="table-card"><div className="table-toolbar"><Tabs items={['All reports', 'Pending', 'Sample collected', 'Processing', 'Completed']} value={tab} onChange={setTab} /></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Report</th><th>Patient</th><th>Test</th><th>Progress</th><th>Technician</th><th>Status</th><th /></tr></thead><tbody>{filtered.map((report) => <tr key={report.id} onClick={() => setSelected(report)}><td><b>{report.id}</b><small>{report.ordered}</small></td><td><div className="person-cell"><span className="table-icon"><FlaskConical /></span><span><b>{report.patient}</b><small>Routine diagnostics</small></span></div></td><td>{report.test}</td><td><div className="lab-progress"><Progress value={report.progress} color={report.progress === 100 ? '#10b981' : '#7c3aed'} /><b>{report.progress}%</b></div></td><td>{report.technician}</td><td><Badge tone={statusTone(report.status)} dot>{report.status}</Badge></td><td><button className="icon-btn" aria-label="View lab report details"><ChevronRight /></button></td></tr>)}</tbody></table></div></Card>
    
    <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.test || 'Lab report'} subtitle={`${selected?.id} · ${selected?.patient}`}><div className="report-status-hero"><span><FlaskConical /></span><div><small>Current status</small><h3>{selected?.status}</h3></div><Badge tone={statusTone(selected?.status)}>{selected?.progress}% complete</Badge></div><div className="lab-timeline">{['Order received', 'Sample collected', 'Analysis in progress', 'Clinical verification'].map((item, index) => <div className={selected?.progress >= (index + 1) * 25 ? 'done' : ''} key={item}><span>{selected?.progress >= (index + 1) * 25 ? <CheckCircle2 /> : <Clock3 />}</span><div><b>{item}</b><small>{selected?.progress >= (index + 1) * 25 ? 'Completed' : 'Awaiting step'}</small></div></div>)}</div>{selected?.status === 'Completed' && <Button icon={Download}>Download report</Button>}</Modal>

    <Modal open={adding} onClose={() => setAdding(false)} title="New lab order" subtitle="Issue a new lab test order for a patient.">
      <form onSubmit={save} className="form-grid">
        <Field label="Patient name" required placeholder="Enter patient name" value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} />
        <label className="field"><span>Test type</span><select value={form.test} onChange={(e) => setForm({ ...form, test: e.target.value })}><option>Complete blood count</option><option>Cardiac enzyme panel</option><option>Pulmonary function</option><option>Metabolic panel</option><option>HbA1c</option><option>Urinalysis</option></select></label>
        <label className="field"><span>Technician</span><select value={form.technician} onChange={(e) => setForm({ ...form, technician: e.target.value })}><option>Fatima Ali</option><option>Evan Stone</option><option>Unassigned</option></select></label>
        <Field label="Initial progress (%)" type="number" min="0" max="100" value={form.progress} onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })} />
        <div className="modal-actions field-wide"><Button type="button" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button><Button type="submit">Create lab order</Button></div>
      </form>
    </Modal>
  </div>
}

export function PharmacyPage() {
  const { medicines, updateMedicine, addMedicine } = useApp()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All stock')
  const [selected, setSelected] = useState(null)
  const [quantity, setQuantity] = useState(20)
  const [adding, setAdding] = useState(false)
  const [medForm, setMedForm] = useState({ name: '', category: 'Analgesic', stock: 100, threshold: 30, expiry: 'Dec 2027', supplier: 'VitaLabs' })

  const filtered = medicines.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) && (filter === 'All stock' || (filter === 'Low stock' && item.stock <= item.threshold) || (filter === 'In stock' && item.stock > item.threshold)))
  const lowStock = medicines.filter((item) => item.stock <= item.threshold)

  const save = (event) => {
    event.preventDefault()
    addMedicine({ ...medForm, stock: Number(medForm.stock), threshold: Number(medForm.threshold) })
    setAdding(false)
    setMedForm({ name: '', category: 'Analgesic', stock: 100, threshold: 30, expiry: 'Dec 2027', supplier: 'VitaLabs' })
  }

  return <div className="page"><PageHeader eyebrow="Medication operations" title="Pharmacy" description="Medication inventory, expiry intelligence, and replenishment in one place." actions={<><Button variant="ghost" icon={ShoppingCart}>Purchase orders</Button><Button icon={Plus} onClick={() => setAdding(true)}>Add medicine</Button></>} />
    {lowStock.length > 0 && <div className="alert-banner warning"><AlertTriangle /><div><b>{lowStock.length} medicines need attention</b><span>Stock is at or below the configured reorder threshold.</span></div><button onClick={() => setFilter('Low stock')}>Review inventory</button></div>}
    <section className="mini-stats"><div><span className="mini-icon blue"><Package /></span><b>{medicines.length}<small>Active medicines</small></b><em>6 categories</em></div><div><span className="mini-icon amber"><AlertTriangle /></span><b>{lowStock.length}<small>Low stock items</small></b><em>Reorder suggested</em></div><div><span className="mini-icon teal"><Truck /></span><b>4<small>Open orders</small></b><em>2 arriving today</em></div></section>
    <Card className="table-card"><div className="table-toolbar"><SearchInput value={query} onChange={setQuery} placeholder="Search medicine inventory…" /><Select value={filter} onChange={setFilter}><option>All stock</option><option>In stock</option><option>Low stock</option></Select></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Medicine</th><th>Category</th><th>Stock level</th><th>Expiry</th><th>Supplier</th><th>Status</th><th /></tr></thead><tbody>{filtered.map((medicine) => { const stockRate = Math.min(100, (medicine.stock / Math.max(medicine.threshold * 2, medicine.stock)) * 100); return <tr key={medicine.id}><td><div className="person-cell"><span className="table-icon"><Package /></span><span><b>{medicine.name}</b><small>{medicine.id}</small></span></div></td><td>{medicine.category}</td><td><div className="stock-cell"><Progress value={stockRate} color={medicine.stock <= medicine.threshold ? '#f59e0b' : '#10b981'} /><b>{medicine.stock} units</b></div></td><td>{medicine.expiry}</td><td>{medicine.supplier}</td><td><Badge tone={medicine.stock <= medicine.threshold ? 'warning' : 'success'} dot>{medicine.stock <= medicine.threshold ? 'Low stock' : 'In stock'}</Badge></td><td><Button variant="ghost" onClick={() => { setSelected(medicine); setQuantity(20) }}>Adjust</Button></td></tr> })}</tbody></table></div>{!filtered.length && <EmptyState icon={SearchX} title="No medicines found" message="Try a different inventory filter." />}</Card>
    
    <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Adjust inventory" subtitle={`${selected?.name} · ${selected?.stock} units currently available`}><label className="field"><span>Quantity change</span><input type="number" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} /></label><p className="adjust-preview">New stock level <b>{Math.max(0, (selected?.stock || 0) + quantity)} units</b></p><div className="modal-actions"><Button variant="ghost" onClick={() => setSelected(null)}>Cancel</Button><Button onClick={() => { updateMedicine(selected.id, { stock: Math.max(0, selected.stock + quantity) }); setSelected(null) }}>Update stock</Button></div></Modal>

    <Modal open={adding} onClose={() => setAdding(false)} title="Add medicine" subtitle="Register a new medicine to inventory records.">
      <form onSubmit={save} className="form-grid">
        <Field label="Medicine name" required placeholder="e.g. Ibuprofen 400mg" value={medForm.name} onChange={(e) => setMedForm({ ...medForm, name: e.target.value })} />
        <label className="field"><span>Category</span><select value={medForm.category} onChange={(e) => setMedForm({ ...medForm, category: e.target.value })}><option>Analgesic</option><option>Antibiotic</option><option>Cardiovascular</option><option>Respiratory</option><option>Diabetes</option><option>Emergency</option></select></label>
        <Field label="Stock level" type="number" required value={medForm.stock} onChange={(e) => setMedForm({ ...medForm, stock: e.target.value })} />
        <Field label="Reorder threshold" type="number" required value={medForm.threshold} onChange={(e) => setMedForm({ ...medForm, threshold: e.target.value })} />
        <Field label="Expiry date" required placeholder="e.g. Dec 2027" value={medForm.expiry} onChange={(e) => setMedForm({ ...medForm, expiry: e.target.value })} />
        <label className="field"><span>Supplier</span><select value={medForm.supplier} onChange={(e) => setMedForm({ ...medForm, supplier: e.target.value })}><option>VitaLabs</option><option>Nova Pharma</option><option>MediSupply</option><option>CarePlus</option></select></label>
        <div className="modal-actions field-wide"><Button type="button" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button><Button type="submit">Add medicine</Button></div>
      </form>
    </Modal>
  </div>
}

export function BillingPage() {
  const { invoices, createInvoice, payInvoice, session } = useApp()
  const [tab, setTab] = useState('All invoices')
  const [selected, setSelected] = useState(null)
  const [adding, setAdding] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [form, setForm] = useState({ patient: '', service: 'General consultation', amount: 150, status: 'Pending' })

  const filtered = useMemo(() => {
    let list = tab === 'All invoices' ? invoices : invoices.filter((item) => item.status === tab)
    if (session?.role === 'Patient') {
      list = list.filter(item => item.patient.toLowerCase() === session.name.toLowerCase())
    }
    return list
  }, [invoices, tab, session])

  const save = (event) => {
    event.preventDefault()
    createInvoice({ ...form, amount: Number(form.amount) })
    setAdding(false)
    setForm({ patient: '', service: 'General consultation', amount: 150, status: 'Pending' })
  }

  const handlePayment = () => {
    payInvoice(selected.id)
    setPaymentOpen(false)
    setSelected(null)
  }

  const showActions = session?.role !== 'Patient'

  return <div className="page"><PageHeader eyebrow="Revenue cycle" title="Billing & payments" description="A transparent view of invoices, insurance, and collected revenue." actions={showActions ? <Button icon={Plus} onClick={() => setAdding(true)}>Create invoice</Button> : null} />
    <section className="stat-grid billing-stats"><Card className="billing-kpi"><span className="mini-icon green"><DollarSign /></span><div><small>Collected this month</small><strong>$428.6K</strong><em><TrendingUp /> +11.8%</em></div></Card><Card className="billing-kpi"><span className="mini-icon blue"><CreditCard /></span><div><small>Outstanding</small><strong>$84.2K</strong><em>{invoices.filter(i => i.status !== 'Paid').length} invoices</em></div></Card><Card className="billing-kpi"><span className="mini-icon purple"><FileText /></span><div><small>Insurance claims</small><strong>$126.8K</strong><em>{invoices.filter(i => i.status === 'Insurance review').length} in review</em></div></Card></section>
    <Card className="table-card"><div className="table-toolbar"><Tabs items={['All invoices', 'Paid', 'Pending', 'Insurance review']} value={tab} onChange={setTab} /><Button variant="ghost" icon={Download}>Export</Button></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Invoice</th><th>Patient</th><th>Service</th><th>Date</th><th>Amount</th><th>Status</th><th /></tr></thead><tbody>{filtered.map((invoice) => <tr key={invoice.id}><td><b>{invoice.id}</b></td><td>{invoice.patient}</td><td>{invoice.service}</td><td>{invoice.date}</td><td><b>${invoice.amount.toLocaleString()}</b></td><td><Badge tone={statusTone(invoice.status)} dot>{invoice.status}</Badge></td><td>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="ghost" onClick={() => setSelected(invoice)}>View</Button>
        {session?.role === 'Patient' && invoice.status !== 'Paid' && (
          <Button onClick={() => { setSelected(invoice); setPaymentOpen(true) }}>Pay Now</Button>
        )}
        {['Receptionist', 'Administrator'].includes(session?.role) && invoice.status !== 'Paid' && (
          <Button variant="soft-success" onClick={() => payInvoice(invoice.id)}>Record Pay</Button>
        )}
      </div>
    </td></tr>)}</tbody></table></div></Card>
    
    <Modal open={Boolean(selected) && !paymentOpen} onClose={() => setSelected(null)} title={selected?.id || 'Invoice'} subtitle={`${selected?.patient} · ${selected?.date}`}><div className="invoice-total"><small>Amount due</small><strong>${selected?.amount.toLocaleString()}</strong><Badge tone={statusTone(selected?.status)}>{selected?.status}</Badge></div><div className="invoice-lines"><div><span>{selected?.service}</span><b>${selected?.amount.toLocaleString()}</b></div><div><span>Tax and adjustments</span><b>$0</b></div></div><Button icon={Download}>Download invoice</Button></Modal>

    <Modal open={adding} onClose={() => setAdding(false)} title="Create invoice" subtitle="Generate a new billing invoice for a patient.">
      <form onSubmit={save} className="form-grid">
        <Field label="Patient name" required placeholder="Enter patient name" value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} />
        <Field label="Service" required placeholder="e.g. General consultation" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
        <Field label="Amount ($)" type="number" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        <label className="field"><span>Status</span><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Pending</option><option>Paid</option><option>Insurance review</option></select></label>
        <div className="modal-actions field-wide"><Button type="button" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button><Button type="submit">Create invoice</Button></div>
      </form>
    </Modal>

    <Modal open={paymentOpen} onClose={() => { setPaymentOpen(false); setSelected(null); }} title="Secure Patient Billing Checkout" subtitle={`Invoice ID: ${selected?.id || ''}`}>
      <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--surface-soft)', borderRadius: '10px' }}>
        <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Outstanding Charge</span>
        <h2 style={{ fontSize: '24px', margin: '4px 0' }}>${selected?.amount.toLocaleString()}</h2>
        <span style={{ fontSize: '11px', color: 'var(--text-soft)' }}>Service: {selected?.service}</span>
      </div>
      <div className="form-grid">
        <Field label="Cardholder Name" defaultValue={session?.name} required className="field-wide" />
        <Field label="Credit Card Number" placeholder="4111 2222 3333 4444" required className="field-wide" />
        <Field label="Expiry (MM/YY)" placeholder="12/28" required />
        <Field label="CVV" placeholder="382" type="password" maxLength="3" required />
        <div className="modal-actions field-wide">
          <Button type="button" variant="ghost" onClick={() => { setPaymentOpen(false); setSelected(null); }}>Cancel</Button>
          <Button onClick={handlePayment}>Confirm and Pay Now</Button>
        </div>
      </div>
    </Modal>
  </div>
}

export function EmergencyPage() {
  const { emergencies, registerEmergency } = useApp()
  const [selected, setSelected] = useState(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ patient: '', age: '', complaint: '', priority: 'Urgent', vitals: 'BP 120/80 · HR 72', room: 'Waiting' })

  const save = (event) => {
    event.preventDefault()
    registerEmergency({ ...form, age: Number(form.age) })
    setAdding(false)
    setForm({ patient: '', age: '', complaint: '', priority: 'Urgent', vitals: 'BP 120/80 · HR 72', room: 'Waiting' })
  }

  return <div className="page emergency-page"><PageHeader eyebrow="Live emergency operations" title="Emergency command" description="Real-time triage, team response, and ambulance coordination." actions={<Button variant="danger" icon={Siren} onClick={() => setAdding(true)}>Register emergency</Button>} />
    <div className="emergency-live"><span><i /> LIVE</span><b>{emergencies.length} patients in queue</b><p>Average triage time <strong>2m 14s</strong></p></div>
    <div className="emergency-layout"><Card className="emergency-queue"><div className="card-heading"><div><span>Triage queue</span><h2>Patients requiring attention</h2></div><Badge tone="danger">{emergencies.filter(e => e.priority === 'Critical').length} critical</Badge></div>{emergencies.map((patient, index) => <motion.button key={patient.id} onClick={() => setSelected(patient)} className={`emergency-row priority-${patient.priority.toLowerCase()}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .06 }}><span className="priority-stripe" /><div className="emergency-number"><b>{String(index + 1).padStart(2, '0')}</b><small>{patient.id}</small></div><div className="emergency-patient"><h3>{patient.patient} <small>{patient.age} yrs</small></h3><p>{patient.complaint}</p><span><HeartPulse /> {patient.vitals}</span></div><div className="emergency-meta"><Badge tone={statusTone(patient.priority)}>{patient.priority}</Badge><span><Clock3 /> {patient.arrival}</span><b>{patient.room}</b></div><ChevronRight /></motion.button>)}</Card>
      <div className="ambulance-column"><Card><div className="card-heading"><div><span>Field response</span><h2>Ambulance tracker</h2></div><Badge tone="success" dot>3 active</Badge></div><div className="map-mock"><div className="map-grid" /><span className="map-road road-one" /><span className="map-road road-two" /><i className="hospital-pin"><Plus /></i><motion.i className="ambulance-pin pin-one" animate={{ x: [0, 20, 0], y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 6 }}><Ambulance /></motion.i><i className="ambulance-pin pin-two"><Ambulance /></i><div className="eta-card"><b>AMB-12 · 4 min</b><span>Cardiac priority · inbound</span></div></div><div className="ambulance-list"><div><span><Ambulance /></span><b>AMB-12<small>Inbound · 4 min</small></b><Badge tone="danger">Priority 1</Badge></div><div><span><Ambulance /></span><b>AMB-07<small>On scene · 3.2 km</small></b><Badge tone="warning">Priority 2</Badge></div><div><span><Ambulance /></span><b>AMB-03<small>Returning · 8 min</small></b><Badge tone="blue">Available soon</Badge></div></div></Card></div>
    </div>
    <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Emergency patient" subtitle={`${selected?.id} · Arrived ${selected?.arrival}`}><div className="critical-patient"><span><Siren /></span><div><h3>{selected?.patient}</h3><p>{selected?.age} years · {selected?.complaint}</p></div><Badge tone={statusTone(selected?.priority)}>{selected?.priority}</Badge></div><div className="profile-grid"><div><span>Current location</span><b>{selected?.room}</b></div><div><span>Vitals</span><b>{selected?.vitals}</b></div></div><div className="capacity-note"><AlertTriangle /><span><b>Clinical team assigned</b><small>Emergency physician and trauma nurse notified.</small></span></div></Modal>

    <Modal open={adding} onClose={() => setAdding(false)} title="Register emergency case" subtitle="Triage a new emergency patient.">
      <form onSubmit={save} className="form-grid">
        <Field label="Patient name" required placeholder="Enter patient name" value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} />
        <Field label="Age" type="number" required min="0" max="120" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
        <Field label="Chief complaint" required placeholder="e.g. Chest pain, breathing difficulty" value={form.complaint} onChange={(e) => setForm({ ...form, complaint: e.target.value })} />
        <label className="field"><span>Priority</span><select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option>Critical</option><option>Urgent</option><option>Moderate</option></select></label>
        <Field label="Current vitals" required placeholder="e.g. BP 120/80 · HR 72" value={form.vitals} onChange={(e) => setForm({ ...form, vitals: e.target.value })} />
        <Field label="Room/Bay assignment" required placeholder="e.g. Trauma 1 or Waiting" value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} />
        <div className="modal-actions field-wide"><Button type="button" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button><Button type="submit">Register emergency</Button></div>
      </form>
    </Modal>
  </div>
}
