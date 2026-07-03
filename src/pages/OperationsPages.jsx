import { motion } from 'framer-motion'
import {
  ArrowRightLeft, BedDouble, Building2, CheckCircle2, Clock3, DoorOpen, Filter,
  MapPin, Plus, SearchX, Sparkles, UserMinus, UserRound, Wrench, XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  Avatar, Badge, Button, Card, ConfirmDialog, EmptyState, Modal, PageHeader,
  Progress, SearchInput, Select, Tabs,
} from '../components/ui'
import { useApp } from '../context/AppContext'
import { wardsSeed } from '../data/mockData'

const bedTone = { Available: 'success', Occupied: 'danger', Cleaning: 'warning', Reserved: 'blue', Maintenance: 'neutral' }

export function AdmissionsPage() {
  const { admissions, patients, doctors, beds, admitPatient, dischargePatient, transferPatient } = useApp()
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('Active')
  const [admitOpen, setAdmitOpen] = useState(false)
  const [discharging, setDischarging] = useState(null)
  const [transferring, setTransferring] = useState(null)
  const [form, setForm] = useState({ patientId: '', ward: 'General', bedId: '', doctor: doctors[0]?.name || '', reason: '' })
  const [newBedId, setNewBedId] = useState('')
  const filtered = admissions.filter((item) => (tab === 'Active' ? item.status === 'Admitted' : tab === 'Discharged' ? item.status === 'Discharged' : true) && `${item.patientName} ${item.id} ${item.bedId}`.toLowerCase().includes(query.toLowerCase()))
  const availableBeds = beds.filter((item) => item.status === 'Available' && item.ward === form.ward)
  const submitAdmission = (event) => {
    event.preventDefault()
    if (admitPatient(form)) {
      setAdmitOpen(false)
      setForm({ patientId: '', ward: 'General', bedId: '', doctor: doctors[0]?.name || '', reason: '' })
    }
  }
  const submitTransfer = () => {
    if (transferPatient(transferring.id, newBedId)) { setTransferring(null); setNewBedId('') }
  }
  return <div className="page"><PageHeader eyebrow="Patient flow" title="Admissions" description="Coordinate admission, transfer, and discharge without losing the thread." actions={<Button icon={Plus} onClick={() => setAdmitOpen(true)}>Admit patient</Button>} />
    <section className="mini-stats"><div><span className="mini-icon blue"><BedDouble /></span><b>{admissions.filter((item) => item.status === 'Admitted').length}<small>Active admissions</small></b><em>3 ready for review</em></div><div><span className="mini-icon teal"><UserMinus /></span><b>7<small>Discharges today</small></b><em>2 awaiting summary</em></div><div><span className="mini-icon purple"><Clock3 /></span><b>4.2 days<small>Average stay</small></b><em>-0.4 vs last month</em></div></section>
    <Card className="table-card"><div className="table-toolbar"><Tabs items={['Active', 'Discharged', 'All']} value={tab} onChange={setTab} /><SearchInput value={query} onChange={setQuery} placeholder="Search admissions…" /></div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Patient</th><th>Admission</th><th>Placement</th><th>Attending</th><th>Reason</th><th>Status</th><th /></tr></thead><tbody>{filtered.map((admission) => <tr key={admission.id}><td><div className="person-cell"><Avatar name={admission.patientName} /><span><b>{admission.patientName}</b><small>{admission.patientId}</small></span></div></td><td><b>{admission.id}</b><small>{new Date(admission.admittedAt).toLocaleDateString()} · {new Date(admission.admittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small></td><td><span className="bed-placement"><BedDouble /> {admission.bedId}</span><small>{admission.ward} ward</small></td><td>{admission.doctor}</td><td>{admission.reason}</td><td><Badge tone={admission.status === 'Admitted' ? 'success' : 'neutral'} dot>{admission.status}</Badge></td><td>{admission.status === 'Admitted' && <div className="row-actions"><Button variant="ghost" icon={ArrowRightLeft} onClick={() => setTransferring(admission)}>Transfer</Button><Button variant="soft-danger" icon={UserMinus} onClick={() => setDischarging(admission)}>Discharge</Button></div>}</td></tr>)}</tbody></table></div>{!filtered.length && <EmptyState icon={SearchX} title="No admissions found" message="Try another filter or create a new admission." />}</Card>

    <Modal open={admitOpen} onClose={() => setAdmitOpen(false)} title="Admit a patient" subtitle="A ready bed is required before an admission can be completed." size="lg"><form className="form-grid" onSubmit={submitAdmission}>
      <label className="field field-wide"><span>Patient</span><select required value={form.patientId} onChange={(event) => setForm({ ...form, patientId: event.target.value })}><option value="">Select a patient</option>{patients.map((patient) => <option key={patient.id} value={patient.id}>{patient.name} · {patient.id}{patient.status === 'Admitted' ? ' · Already admitted' : ''}</option>)}</select></label>
      <label className="field"><span>Ward</span><select value={form.ward} onChange={(event) => setForm({ ...form, ward: event.target.value, bedId: '' })}>{wardsSeed.map((ward) => <option key={ward.name}>{ward.name}</option>)}</select></label>
      <label className="field"><span>Available bed</span><select required value={form.bedId} onChange={(event) => setForm({ ...form, bedId: event.target.value })}><option value="">Choose a ready bed</option>{availableBeds.map((bed) => <option key={bed.id}>{bed.id}</option>)}</select>{!availableBeds.length && <small>No ready beds in this ward</small>}</label>
      <label className="field field-wide"><span>Attending physician</span><select value={form.doctor} onChange={(event) => setForm({ ...form, doctor: event.target.value })}>{doctors.map((doctor) => <option key={doctor.id}>{doctor.name}</option>)}</select></label>
      <label className="field field-wide"><span>Reason for admission</span><textarea required value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} placeholder="Clinical reason, presenting condition, or planned procedure…" /></label>
      <div className="capacity-note field-wide"><Sparkles /><span><b>Capacity check is active</b><small>Bed status will update instantly after admission.</small></span></div>
      <div className="modal-actions field-wide"><Button type="button" variant="ghost" onClick={() => setAdmitOpen(false)}>Cancel</Button><Button type="submit">Complete admission</Button></div>
    </form></Modal>
    <ConfirmDialog open={Boolean(discharging)} title="Complete discharge?" message={`${discharging?.patientName || 'The patient'} will be discharged and ${discharging?.bedId || 'their bed'} will automatically be marked for cleaning.`} confirmLabel="Complete discharge" tone="primary" onClose={() => setDischarging(null)} onConfirm={() => dischargePatient(discharging.id)} />
    <Modal open={Boolean(transferring)} onClose={() => setTransferring(null)} title="Transfer patient" subtitle={`${transferring?.patientName} currently occupies ${transferring?.bedId}`}><label className="field"><span>New available bed</span><select value={newBedId} onChange={(event) => setNewBedId(event.target.value)}><option value="">Select a bed</option>{beds.filter((bed) => bed.status === 'Available').map((bed) => <option key={bed.id} value={bed.id}>{bed.id} · {bed.ward}</option>)}</select></label><div className="modal-actions"><Button variant="ghost" onClick={() => setTransferring(null)}>Cancel</Button><Button disabled={!newBedId} icon={ArrowRightLeft} onClick={submitTransfer}>Confirm transfer</Button></div></Modal>
  </div>
}

export function WardsPage() {
  const { beds, nurses } = useApp()
  const [selected, setSelected] = useState(null)
  const wardStats = wardsSeed.map((ward) => {
    const wardBeds = beds.filter((bed) => bed.ward === ward.name)
    const occupied = wardBeds.filter((bed) => bed.status === 'Occupied').length
    return { ...ward, occupied, available: wardBeds.filter((bed) => bed.status === 'Available').length, service: wardBeds.length - occupied - wardBeds.filter((bed) => bed.status === 'Available').length, rate: Math.round((occupied / wardBeds.length) * 100) }
  })
  return <div className="page"><PageHeader eyebrow="Capacity operations" title="Ward management" description="Live capacity, staffing, and operational readiness across every unit." actions={<Button variant="ghost" icon={Filter}>Configure wards</Button>} />
    <div className="ward-grid">{wardStats.map((ward, index) => <motion.div key={ward.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .05 }}><Card interactive className="ward-card" onClick={() => setSelected(ward)}><div className="ward-top"><span style={{ background: `${ward.color}20`, color: ward.color }}><Building2 /></span><div><h3>{ward.name}</h3><p><MapPin /> {ward.floor}</p></div><Badge tone={ward.available <= 3 ? 'danger' : 'success'} dot>{ward.available <= 3 ? 'Near capacity' : 'Operational'}</Badge></div><div className="ward-number"><strong>{ward.rate}%</strong><span>occupied</span></div><Progress value={ward.rate} color={ward.color} /><div className="ward-capacity"><span><b>{ward.total}</b>Total beds</span><span><b>{ward.occupied}</b>Occupied</span><span><b>{ward.available}</b>Available</span></div><div className="ward-footer"><span><UserRound /> {nurses.filter((nurse) => nurse.ward === ward.name).length || 2} nurses assigned</span><button>View ward <ArrowRightLeft /></button></div></Card></motion.div>)}</div>
    <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={`${selected?.name} ward`} subtitle={`${selected?.floor} · Live operational view`} size="lg">{selected && <><div className="profile-grid"><div><span>Total capacity</span><b>{selected.total} beds</b></div><div><span>Occupied</span><b>{selected.occupied}</b></div><div><span>Ready now</span><b>{selected.available}</b></div><div><span>In service</span><b>{selected.service}</b></div></div><div className="profile-section"><h3>Bed snapshot</h3><div className="mini-bed-grid">{beds.filter((bed) => bed.ward === selected.name).map((bed) => <span className={`mini-bed ${bed.status.toLowerCase()}`} key={bed.id}><BedDouble />{bed.id.split('-')[1]}</span>)}</div></div></>}</Modal>
  </div>
}

export function BedsPage() {
  const { beds, patients, updateBedStatus } = useApp()
  const [ward, setWard] = useState('All wards')
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const visible = beds.filter((bed) => (ward === 'All wards' || bed.ward === ward) && (filter === 'All' || bed.status === filter))
  const patient = selected?.patientId ? patients.find((item) => item.id === selected.patientId) : null
  const totals = useMemo(() => ['Available', 'Occupied', 'Cleaning', 'Reserved', 'Maintenance'].map((status) => ({ status, value: beds.filter((bed) => bed.status === status).length })), [beds])
  return <div className="page"><PageHeader eyebrow="Real-time capacity" title="Bed occupancy" description="Select any bed to inspect its status, patient, or service readiness." actions={<Button variant="ghost" icon={Wrench}>Maintenance queue</Button>} />
    <div className="bed-status-bar">{totals.map((item) => <button key={item.status} className={filter === item.status ? 'active' : ''} onClick={() => setFilter(filter === item.status ? 'All' : item.status)}><i className={item.status.toLowerCase()} /><span><b>{item.value}</b>{item.status}</span></button>)}</div>
    <Card className="bed-map-card"><div className="bed-map-toolbar"><div><h2>Live bed map</h2><span>Updates immediately with admission activity</span></div><Select value={ward} onChange={setWard}><option>All wards</option>{wardsSeed.map((item) => <option key={item.name}>{item.name}</option>)}</Select></div>
      {(ward === 'All wards' ? wardsSeed : wardsSeed.filter((item) => item.name === ward)).map((wardItem) => {
        const wardBeds = visible.filter((bed) => bed.ward === wardItem.name)
        if (!wardBeds.length) return null
        return <section className="bed-ward" key={wardItem.name}><div className="bed-ward-heading"><span style={{ color: wardItem.color }}><Building2 /></span><div><h3>{wardItem.name}</h3><small>{wardItem.floor}</small></div><b>{wardBeds.filter((item) => item.status === 'Available').length} ready</b></div><div className="bed-grid">{wardBeds.map((bed) => <motion.button layout key={bed.id} className={`bed-tile ${bed.status.toLowerCase()}`} whileHover={{ y: -3 }} onClick={() => setSelected(bed)}><span><BedDouble /></span><b>{bed.id}</b><small>{bed.status}</small>{bed.patientId && <i />}</motion.button>)}</div></section>
      })}{!visible.length && <EmptyState icon={XCircle} title="No beds match this filter" message="Choose another ward or status." />}</Card>
    <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.id || 'Bed details'} subtitle={`${selected?.ward} ward · Current status`}><div className={`bed-detail-state ${selected?.status.toLowerCase()}`}><span><BedDouble /></span><div><small>Status</small><h3>{selected?.status}</h3></div><Badge tone={bedTone[selected?.status]} dot>{selected?.status}</Badge></div>{patient ? <div className="bed-patient"><Avatar name={patient.name} size="lg" /><div><small>Current patient</small><h3>{patient.name}</h3><p>{patient.id} · {patient.age} years · {patient.diagnosis}</p></div></div> : <div className="bed-empty"><CheckCircle2 /><div><h3>No patient assigned</h3><p>This bed is currently {selected?.status?.toLowerCase()}.</p></div></div>}{selected && selected.status !== 'Occupied' && <div className="profile-section"><h3>Update readiness</h3><div className="bed-actions">{['Available', 'Cleaning', 'Reserved', 'Maintenance'].map((status) => <button className={selected.status === status ? 'active' : ''} key={status} onClick={() => { updateBedStatus(selected.id, status); setSelected({ ...selected, status }) }}><i className={status.toLowerCase()} />{status}</button>)}</div></div>}</Modal>
  </div>
}
