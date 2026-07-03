import {
  Activity, BarChart3, Bell, Building2, Check, Download, Moon, RefreshCw,
  Save, Settings as SettingsIcon, ShieldCheck, Sun, UsersRound,
} from 'lucide-react'
import { useState } from 'react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { Badge, Button, Card, PageHeader, Progress, Segmented, Tabs } from '../components/ui'
import { useApp } from '../context/AppContext'
import { revenueData, wardsSeed } from '../data/mockData'

const patientFlow = [
  { month: 'Jan', admissions: 412, discharges: 386 }, { month: 'Feb', admissions: 438, discharges: 421 },
  { month: 'Mar', admissions: 426, discharges: 412 }, { month: 'Apr', admissions: 472, discharges: 451 },
  { month: 'May', admissions: 496, discharges: 478 }, { month: 'Jun', admissions: 518, discharges: 501 },
  { month: 'Jul', admissions: 536, discharges: 524 },
]
const departmentShare = [
  { name: 'General', value: 31, color: '#10b981' }, { name: 'Cardiology', value: 21, color: '#7c3aed' },
  { name: 'Emergency', value: 18, color: '#ef4444' }, { name: 'Pediatrics', value: 16, color: '#14b8a6' },
  { name: 'Other', value: 14, color: '#64748b' },
]

export function ReportsPage() {
  const { beds, toast } = useApp()
  const [period, setPeriod] = useState('Monthly')
  const [category, setCategory] = useState('Overview')
  const wardData = wardsSeed.map((ward) => ({ name: ward.name, occupancy: Math.round((beds.filter((bed) => bed.ward === ward.name && bed.status === 'Occupied').length / ward.total) * 100) }))
  return <div className="page"><PageHeader eyebrow="Hospital intelligence" title="Reports & analytics" description="Turn operational signals into better decisions across the care network." actions={<><Button variant="ghost" icon={Download} onClick={() => toast('Report export prepared')}>Export report</Button><Button icon={RefreshCw}>Refresh data</Button></>} />
    <div className="report-controls"><Tabs items={['Overview', 'Admissions', 'Occupancy', 'Clinical', 'Financial']} value={category} onChange={setCategory} /><Segmented items={['Monthly', 'Yearly']} value={period} onChange={setPeriod} /></div>
    <section className="stat-grid report-stats"><Card className="report-kpi"><span>Patient encounters</span><strong>3,842</strong><Badge tone="success">+12.4%</Badge><small>vs previous {period.toLowerCase().replace('ly', '')}</small></Card><Card className="report-kpi"><span>Average length of stay</span><strong>4.2 days</strong><Badge tone="success">-8.1%</Badge><small>Target: below 4.5 days</small></Card><Card className="report-kpi"><span>Bed utilization</span><strong>78.4%</strong><Badge tone="blue">Optimal</Badge><small>Healthy range: 75–85%</small></Card><Card className="report-kpi"><span>Net revenue</span><strong>$536K</strong><Badge tone="success">+11.8%</Badge><small>Margin improved 2.3%</small></Card></section>
    <div className="reports-grid">
      <Card className="wide-chart"><div className="card-heading"><div><span>Patient operations</span><h2>Admissions vs discharges</h2></div><Badge tone="blue">{period}</Badge></div><div className="chart-area report-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={patientFlow} barGap={4}><CartesianGrid strokeDasharray="4 5" vertical={false} stroke="var(--border)" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)' }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)' }} /><Tooltip contentStyle={{ background: 'var(--surface-solid)', border: '1px solid var(--border)', borderRadius: 12 }} /><Bar dataKey="admissions" fill="#10b981" radius={[5, 5, 0, 0]} /><Bar dataKey="discharges" fill="#14b8a6" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div><div className="chart-legend"><span><i style={{ background: '#10b981' }} /> Admissions</span><span><i style={{ background: '#14b8a6' }} /> Discharges</span></div></Card>
      <Card><div className="card-heading"><div><span>Case mix</span><h2>Department share</h2></div></div><div className="department-pie"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={departmentShare} dataKey="value" innerRadius={58} outerRadius={84} paddingAngle={3} stroke="none">{departmentShare.map((item) => <Cell fill={item.color} key={item.name} />)}</Pie><Tooltip contentStyle={{ background: 'var(--surface-solid)', border: '1px solid var(--border)', borderRadius: 12 }} /></PieChart></ResponsiveContainer><div><strong>3,842</strong><span>encounters</span></div></div><div className="department-legend">{departmentShare.map((item) => <div key={item.name}><i style={{ background: item.color }} /><span>{item.name}</span><b>{item.value}%</b></div>)}</div></Card>
      <Card><div className="card-heading"><div><span>Capacity</span><h2>Ward occupancy</h2></div></div><div className="ward-report-list">{wardData.map((ward) => <div key={ward.name}><Progress value={ward.occupancy || Math.floor(60 + Math.random() * 25)} color={ward.occupancy > 85 ? '#ef4444' : '#10b981'} label={ward.name} /></div>)}</div></Card>
      <Card className="wide-chart"><div className="card-heading"><div><span>Financial trajectory</span><h2>Revenue performance</h2></div><Badge tone="success">+11.8%</Badge></div><div className="chart-area report-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenueData}><defs><linearGradient id="reportRevenue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c3aed" stopOpacity={.4} /><stop offset="95%" stopColor="#7c3aed" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="4 5" vertical={false} stroke="var(--border)" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)' }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)' }} /><Tooltip contentStyle={{ background: 'var(--surface-solid)', border: '1px solid var(--border)', borderRadius: 12 }} /><Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={3} fill="url(#reportRevenue)" /></AreaChart></ResponsiveContainer></div></Card>
    </div>
  </div>
}

export function SettingsPage() {
  const { hospital, preferences, saveSettings, theme, setTheme, resetDemo, session } = useApp()
  const [tab, setTab] = useState('Hospital profile')
  const [profile, setProfile] = useState(hospital)
  const [prefs, setPrefs] = useState(preferences)
  const save = () => {
    if (tab === 'Hospital profile') saveSettings('hospital', profile)
    else saveSettings('preferences', prefs)
  }
  return <div className="page"><PageHeader eyebrow="Workspace administration" title="Settings" description="Configure your hospital, roles, notifications, and experience." actions={<Button icon={Save} onClick={save}>Save changes</Button>} />
    <div className="settings-layout"><Card className="settings-nav"><div className="settings-user"><span>{session?.name?.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><div><b>{session?.name}</b><small>{session?.role}</small></div></div>{[['Hospital profile', Building2], ['Departments', Activity], ['Roles & access', ShieldCheck], ['Appearance', Sun], ['Notifications', Bell], ['Preferences', SettingsIcon]].map(([label, Icon]) => <button className={tab === label ? 'active' : ''} key={label} onClick={() => setTab(label)}><Icon />{label}</button>)}</Card>
      <Card className="settings-content">
        {tab === 'Hospital profile' && <section><div className="settings-heading"><span><Building2 /></span><div><h2>Hospital profile</h2><p>Core identity and contact information for this workspace.</p></div></div><div className="hospital-logo"><span><Activity /></span><div><b>MediCore General</b><small>Primary campus logo</small></div><Button variant="ghost">Change logo</Button></div><div className="form-grid"><label className="field field-wide"><span>Hospital name</span><input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} /></label><label className="field"><span>Email</span><input value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} /></label><label className="field"><span>Phone</span><input value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} /></label><label className="field field-wide"><span>Address</span><input value={profile.address} onChange={(event) => setProfile({ ...profile, address: event.target.value })} /></label><label className="field field-wide"><span>Timezone</span><select value={profile.timezone} onChange={(event) => setProfile({ ...profile, timezone: event.target.value })}><option>America/Los_Angeles</option><option>America/New_York</option><option>Europe/London</option><option>Asia/Calcutta</option></select></label></div></section>}
        {tab === 'Appearance' && <section><div className="settings-heading"><span><Sun /></span><div><h2>Appearance</h2><p>Choose how MediCore looks across this browser.</p></div></div><div className="theme-choices"><button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}><div className="theme-preview light-preview"><i /><span /><span /><span /></div><b><Sun /> Light</b>{theme === 'light' && <Check />}</button><button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}><div className="theme-preview dark-preview"><i /><span /><span /><span /></div><b><Moon /> Dark</b>{theme === 'dark' && <Check />}</button></div></section>}
        {(tab === 'Notifications' || tab === 'Preferences') && <section><div className="settings-heading"><span><Bell /></span><div><h2>{tab}</h2><p>Decide what needs your attention and how the workspace behaves.</p></div></div><div className="toggle-list">{[['emailAlerts', 'Email notifications', 'Daily summaries and critical workflow updates'], ['emergencyAlerts', 'Emergency alerts', 'Immediate clinical escalation notifications'], ['inventoryAlerts', 'Inventory alerts', 'Low stock and medicine expiry warnings'], ['compactMode', 'Compact data tables', 'Show more rows on large screens']].map(([key, title, text]) => <div key={key}><span><b>{title}</b><small>{text}</small></span><button className={`toggle ${prefs[key] ? 'on' : ''}`} onClick={() => setPrefs({ ...prefs, [key]: !prefs[key] })}><i /></button></div>)}</div></section>}
        {tab === 'Departments' && <section><div className="settings-heading"><span><Activity /></span><div><h2>Departments</h2><p>Clinical and operational units in this workspace.</p></div></div><div className="department-settings">{wardsSeed.map((ward) => <div key={ward.name}><span style={{ background: ward.color }} /><div><b>{ward.name}</b><small>{ward.floor} · {ward.total} configured beds</small></div><Button variant="ghost">Manage</Button></div>)}</div></section>}
        {tab === 'Roles & access' && <section><div className="settings-heading"><span><ShieldCheck /></span><div><h2>Roles & access</h2><p>Frontend demo role profiles and workspace scope.</p></div></div><div className="role-settings">{['Administrator', 'Doctor', 'Nurse', 'Receptionist', 'Patient'].map((role, index) => <div key={role}><span><UsersRound /></span><div><b>{role}</b><small>{[1, 6, 5, 3, 2847][index]} active profiles</small></div><Badge tone={index === 0 ? 'purple' : 'blue'}>{index === 0 ? 'Full access' : 'Role scoped'}</Badge></div>)}</div></section>}
        {tab !== 'Appearance' && <div className="settings-save"><Button variant="ghost" icon={RefreshCw} onClick={resetDemo}>Restore demo data</Button><Button icon={Save} onClick={save}>Save changes</Button></div>}
      </Card>
    </div>
  </div>
}
