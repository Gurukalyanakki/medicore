import { motion } from 'framer-motion'
import {
  Activity, Ambulance, ArrowRight, BedDouble, CalendarDays, CheckCircle2,
  Clock3, DollarSign, MoreHorizontal, Scissors, Stethoscope, UserMinus, Users,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts'
import { Badge, Button, Card, PageHeader, Progress, StatCard } from '../components/ui'
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
  const { patients, doctors, admissions, beds, session } = useApp()
  const navigate = useNavigate()
  const activeAdmissions = admissions.filter((item) => item.status === 'Admitted')
  const occupied = beds.filter((bed) => bed.status === 'Occupied').length
  const occupancy = Math.round((occupied / beds.length) * 100)
  const firstName = session?.name?.replace(/^Dr\.\s*/, '').split(' ')[0]
  return (
    <div className="page dashboard-page">
      <PageHeader eyebrow="Friday, July 3 · 08:42 AM" title={`Good morning, ${firstName}.`} description="Here’s what’s happening across St. Helena Campus today." actions={<><Button variant="ghost" icon={CalendarDays} onClick={() => navigate('/app/appointments')}>View schedule</Button><Button icon={Activity} onClick={() => navigate('/app/admissions')}>New admission</Button></>} />
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
          <div className="card-heading"><div><span>Financial performance</span><h2>Revenue overview</h2></div><div className="chart-summary"><span><i className="rev-dot" /> Revenue</span><span><i className="exp-dot" /> Expenses</span><select aria-label="Revenue period"><option>Last 7 months</option><option>This year</option></select></div></div>
          <div className="revenue-highlight"><strong>$536K</strong><Badge tone="success">+11.8%</Badge><span>July projected revenue</span></div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
                <defs><linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={.35} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs>
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
          <div className="card-heading"><div><span>Live capacity</span><h2>Bed occupancy</h2></div><button className="icon-btn"><MoreHorizontal /></button></div>
          <div className="occupancy-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={occupancyData} dataKey="value" innerRadius={63} outerRadius={81} paddingAngle={3} stroke="none" startAngle={90} endAngle={-270}>{occupancyData.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie></PieChart></ResponsiveContainer><div><strong>{occupancy || 78}%</strong><span>occupied</span></div></div>
          <div className="occupancy-meta"><div><strong>{occupied}</strong><span>Occupied</span></div><div><strong>{beds.filter((item) => item.status === 'Available').length}</strong><span>Available</span></div><div><strong>{beds.filter((item) => !['Available', 'Occupied'].includes(item.status)).length}</strong><span>Service</span></div></div>
          <Progress value={occupancy || 78} color="#10b981" label="Overall capacity" />
          <button className="card-link" onClick={() => navigate('/app/beds')}>Manage bed capacity <ArrowRight size={15} /></button>
        </Card>
      </section>

      <section className="dashboard-secondary-grid">
        <Card className="activity-card">
          <div className="card-heading"><div><span>Across the hospital</span><h2>Recent activity</h2></div><button className="text-button">View all</button></div>
          <div className="activity-list">{activitySeed.map((item, index) => <motion.div key={item.title} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .08 }}><span className={`activity-icon ${item.type}`}>{item.type === 'admit' ? <BedDouble /> : item.type === 'lab' ? <CheckCircle2 /> : item.type === 'billing' ? <DollarSign /> : <UserMinus />}</span><div><b>{item.title}</b><span>{item.detail}</span></div><small>{item.time}</small></motion.div>)}</div>
        </Card>
        <Card className="surgery-card">
          <div className="card-heading"><div><span>Operating theatres</span><h2>Upcoming surgeries</h2></div><Badge tone="blue">3 today</Badge></div>
          <div className="surgery-list">{surgeryData.map((item) => <div key={item.time}><span className="surgery-time"><Clock3 size={14} />{item.time}</span><i /><span className="surgery-icon"><Scissors /></span><div><b>{item.title}</b><small>{item.doctor} · {item.room}</small></div><Badge tone={item.status === 'Preparing' ? 'warning' : 'success'}>{item.status}</Badge></div>)}</div>
          <button className="card-link" onClick={() => navigate('/app/appointments')}>Open theatre schedule <ArrowRight size={15} /></button>
        </Card>
      </section>
    </div>
  )
}
