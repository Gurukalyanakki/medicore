import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity, Ambulance, BarChart3, BedDouble, Bell, Building2, CalendarDays,
  ChevronLeft, ClipboardList, Command, CreditCard, FlaskConical, HeartPulse,
  LayoutDashboard, LogOut, Menu, Moon, Package, PanelLeftClose, PanelLeftOpen,
  Search, Settings, Stethoscope, Sun, UserRound, Users, UsersRound, X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Avatar, Badge, Button } from '../components/ui'

const navGroups = [
  { label: 'Overview', items: [
    { to: '/app/dashboard', label: 'Command center', icon: LayoutDashboard },
    { to: '/app/appointments', label: 'Appointments', icon: CalendarDays },
    { to: '/app/emergency', label: 'Emergency', icon: Ambulance, badge: '4' },
  ]},
  { label: 'Care delivery', items: [
    { to: '/app/patients', label: 'Patients', icon: UserRound },
    { to: '/app/doctors', label: 'Doctors', icon: Stethoscope },
    { to: '/app/nurses', label: 'Nurses', icon: HeartPulse },
    { to: '/app/staff', label: 'Staff', icon: UsersRound },
    { to: '/app/admissions', label: 'Admissions', icon: ClipboardList },
  ]},
  { label: 'Operations', items: [
    { to: '/app/wards', label: 'Ward management', icon: Building2 },
    { to: '/app/beds', label: 'Bed occupancy', icon: BedDouble },
    { to: '/app/labs', label: 'Lab reports', icon: FlaskConical },
    { to: '/app/pharmacy', label: 'Pharmacy', icon: Package },
    { to: '/app/billing', label: 'Billing', icon: CreditCard },
  ]},
  { label: 'Intelligence', items: [
    { to: '/app/reports', label: 'Reports', icon: BarChart3 },
    { to: '/app/settings', label: 'Settings', icon: Settings },
  ]},
]

const notifications = [
  { icon: Ambulance, tone: 'danger', title: 'Two critical arrivals', body: 'Trauma teams assigned · Emergency', time: '3m' },
  { icon: BedDouble, tone: 'warning', title: 'ICU availability below 20%', body: '3 beds remain ready', time: '18m' },
  { icon: Package, tone: 'blue', title: 'Inventory threshold reached', body: 'Atorvastatin 20mg · 38 units', time: '1h' },
  { icon: CalendarDays, tone: 'teal', title: 'Surgery begins in 45 min', body: 'OR-3 · Dr. Murali Krishna', time: '2h' },
]

export default function AppShell() {
  const { session, logout, theme, setTheme, toasts, setToasts, patients, doctors, staff, medicines, admissions } = useApp()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => setMobileOpen(false), [location.pathname])
  useEffect(() => {
    const shortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', shortcut)
    return () => window.removeEventListener('keydown', shortcut)
  }, [])

  const filteredNavGroups = useMemo(() => {
    const role = session?.role || 'Administrator'
    if (role === 'Administrator') {
      return navGroups
    }
    if (role === 'Doctor') {
      return [
        { label: 'Overview', items: [
          { to: '/app/dashboard', label: 'Doctor Hub', icon: LayoutDashboard },
          { to: '/app/appointments', label: 'My Consultations', icon: CalendarDays },
        ]},
        { label: 'Care delivery', items: [
          { to: '/app/patients', label: 'Patients', icon: UserRound },
          { to: '/app/admissions', label: 'Admissions', icon: ClipboardList },
        ]},
        { label: 'Operations', items: [
          { to: '/app/beds', label: 'Bed occupancy', icon: BedDouble },
          { to: '/app/labs', label: 'Lab reports', icon: FlaskConical },
          { to: '/app/pharmacy', label: 'Pharmacy', icon: Package },
        ]},
        { label: 'Intelligence', items: [
          { to: '/app/settings', label: 'Settings', icon: Settings },
        ]},
      ]
    }
    if (role === 'Nurse') {
      return [
        { label: 'Overview', items: [
          { to: '/app/dashboard', label: 'Nurse Hub', icon: LayoutDashboard },
          { to: '/app/emergency', label: 'ER Triage', icon: Ambulance, badge: '4' },
        ]},
        { label: 'Care delivery', items: [
          { to: '/app/patients', label: 'Patients', icon: UserRound },
          { to: '/app/admissions', label: 'Admissions', icon: ClipboardList },
        ]},
        { label: 'Operations', items: [
          { to: '/app/wards', label: 'Ward management', icon: Building2 },
          { to: '/app/beds', label: 'Bed occupancy', icon: BedDouble },
          { to: '/app/labs', label: 'Lab reports', icon: FlaskConical },
          { to: '/app/pharmacy', label: 'Pharmacy', icon: Package },
        ]},
        { label: 'Intelligence', items: [
          { to: '/app/settings', label: 'Settings', icon: Settings },
        ]},
      ]
    }
    if (role === 'Receptionist') {
      return [
        { label: 'Overview', items: [
          { to: '/app/dashboard', label: 'Front Office', icon: LayoutDashboard },
          { to: '/app/appointments', label: 'Appointments', icon: CalendarDays },
          { to: '/app/emergency', label: 'Emergency', icon: Ambulance, badge: '4' },
        ]},
        { label: 'Care delivery', items: [
          { to: '/app/patients', label: 'Patients', icon: UserRound },
        ]},
        { label: 'Operations', items: [
          { to: '/app/beds', label: 'Bed occupancy', icon: BedDouble },
          { to: '/app/billing', label: 'Billing & Invoices', icon: CreditCard },
        ]},
        { label: 'Intelligence', items: [
          { to: '/app/settings', label: 'Settings', icon: Settings },
        ]},
      ]
    }
    if (role === 'Patient') {
      return [
        { label: 'My Health Portal', items: [
          { to: '/app/dashboard', label: 'My Dashboard', icon: LayoutDashboard },
          { to: '/app/appointments', label: 'My Visits', icon: CalendarDays },
          { to: '/app/labs', label: 'My Lab Reports', icon: FlaskConical },
          { to: '/app/billing', label: 'My Invoices', icon: CreditCard },
        ]},
        { label: 'Support', items: [
          { to: '/app/settings', label: 'My Settings', icon: Settings },
        ]},
      ]
    }
    return []
  }, [session])

  const results = useMemo(() => {
    if (query.trim().length < 2) return []
    const q = query.toLowerCase()
    const role = session?.role || 'Administrator'
    
    let list = []
    if (role === 'Patient') {
      list = [
        ...patients.filter(p => p.name === session.name).map((item) => ({ type: 'My Profile', label: item.name, meta: `${item.id} · ${item.diagnosis}`, path: '/app/dashboard' })),
        { type: 'Billing', label: 'My Invoices', meta: 'Outstanding & paid receipts', path: '/app/billing' },
        { type: 'Labs', label: 'My Lab Reports', meta: 'Check laboratory results', path: '/app/labs' },
      ]
    } else {
      list = [
        ...patients.map((item) => ({ type: 'Patient', label: item.name, meta: `${item.id} · ${item.diagnosis}`, path: '/app/patients' })),
        ...doctors.map((item) => ({ type: 'Doctor', label: item.name, meta: item.specialty, path: '/app/doctors' })),
        ...staff.map((item) => ({ type: 'Staff', label: item.name, meta: item.role, path: '/app/staff' })),
        ...medicines.map((item) => ({ type: 'Medicine', label: item.name, meta: `${item.stock} in stock`, path: '/app/pharmacy' })),
        ...admissions.filter((item) => item.status === 'Admitted').map((item) => ({ type: 'Admission', label: item.patientName, meta: `${item.ward} · ${item.bedId}`, path: '/app/admissions' })),
      ]
    }
    
    return list.filter((item) => `${item.label} ${item.meta}`.toLowerCase().includes(q)).slice(0, 8)
  }, [query, patients, doctors, staff, medicines, admissions, session])

  const dismissToast = (id) => setToasts((items) => items.filter((item) => item.id !== id))

  return (
    <div className={`app-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <AnimatePresence>{mobileOpen && <motion.div className="mobile-scrim" onClick={() => setMobileOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}</AnimatePresence>
      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <NavLink to="/app/dashboard" className="brand-mark"><span><Activity size={22} /></span><strong>MediCore <i>AI</i></strong></NavLink>
          <button className="icon-btn mobile-close" onClick={() => setMobileOpen(false)}><X size={20} /></button>
        </div>
        <button className="sidebar-search" onClick={() => setSearchOpen(true)}><Search size={17} /><span>Search anything</span><kbd>⌘ K</kbd></button>
        <nav>
          {filteredNavGroups.map((group) => <div className="nav-group" key={group.label}><p>{group.label}</p>{group.items.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'active' : ''}><item.icon size={19} /><span>{item.label}</span>{item.badge && <b>{item.badge}</b>}</NavLink>)}</div>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="system-status"><i /><div><b>All systems operational</b><span>Updated 2 min ago</span></div></div>
          <button className="profile-chip" onClick={() => navigate('/app/settings')}><Avatar name={session?.name} size="sm" /><span><b>{session?.name}</b><small>{session?.role}</small></span><ChevronLeft size={15} /></button>
        </div>
        <button className="collapse-button" aria-label="Collapse sidebar" onClick={() => setCollapsed(!collapsed)}>{collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}</button>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button className="icon-btn menu-button" onClick={() => setMobileOpen(true)}><Menu size={21} /></button>
          <div className="topbar-context"><span>St. Helena Campus</span><b>Clinical Operations</b></div>
          <div className="topbar-actions">
            <button className="quick-button" onClick={() => {
              if (session?.role === 'Patient') navigate('/app/appointments')
              else if (session?.role === 'Doctor') navigate('/app/patients')
              else if (session?.role === 'Nurse') navigate('/app/beds')
              else if (session?.role === 'Receptionist') navigate('/app/appointments')
              else navigate('/app/admissions')
            }}><span>+</span> {session?.role === 'Patient' ? 'My Visits' : session?.role === 'Doctor' ? 'Patients' : session?.role === 'Nurse' ? 'Bed Map' : 'Quick Action'}</button>
            <button className="icon-btn" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
            <div className="popover-wrap">
              <button className="icon-btn notification-button" aria-label="Notifications" onClick={() => setNotificationsOpen(!notificationsOpen)}><Bell size={18} /><i /></button>
              <AnimatePresence>{notificationsOpen && <motion.div className="notification-popover" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                <div className="popover-title"><div><h3>Notifications</h3><span>4 unread updates</span></div><button onClick={() => setNotificationsOpen(false)}><X size={16} /></button></div>
                {notifications.map((item) => <div className="notification-row" key={item.title}><span className={`notification-icon ${item.tone}`}><item.icon size={17} /></span><div><b>{item.title}</b><span>{item.body}</span></div><small>{item.time}</small></div>)}
                <button className="view-all">View notification center</button>
              </motion.div>}</AnimatePresence>
            </div>
            <button className="icon-btn logout-button" aria-label="Sign out" onClick={() => { logout(); navigate('/login') }}><LogOut size={18} /></button>
          </div>
        </header>
        <main className="main-content"><Outlet /></main>
      </div>

      <AnimatePresence>
        {searchOpen && <motion.div className="command-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && setSearchOpen(false)}>
          <motion.div className="command-dialog" initial={{ scale: .97, y: -10 }} animate={{ scale: 1, y: 0 }}>
            <div className="command-input"><Search size={20} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search patients, doctors, staff, medicines…" /><kbd>ESC</kbd></div>
            <div className="command-results">
              {!query && <div className="command-hint"><Command size={24} /><p>Search across your entire hospital</p><span>Try a patient name, bed number, or medication</span></div>}
              {query && results.length === 0 && <div className="command-hint"><Search size={24} /><p>No matching records</p><span>Try a different name or reference number</span></div>}
              {results.map((item) => <button key={`${item.type}-${item.label}`} onClick={() => { navigate(item.path); setSearchOpen(false); setQuery('') }}><span>{item.type}</span><div><b>{item.label}</b><small>{item.meta}</small></div><ChevronLeft size={16} /></button>)}
            </div>
            <div className="command-footer"><span><kbd>↵</kbd> Select</span><span><kbd>ESC</kbd> Close</span></div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>

      <div className="toast-stack">
        <AnimatePresence>
          {toasts.map((item) => <motion.div className={`toast toast-${item.tone}`} key={item.id} initial={{ opacity: 0, x: 40, scale: .96 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 30 }}>
            <span>{item.tone === 'danger' ? '!' : '✓'}</span><p>{item.message}</p>{item.action && <button onClick={() => { item.action(); dismissToast(item.id) }}>Undo</button>}<button className="toast-close" onClick={() => dismissToast(item.id)}><X size={14} /></button>
          </motion.div>)}
        </AnimatePresence>
      </div>
      <button className="floating-help" aria-label="Open hospital assistant" onClick={() => setSearchOpen(true)}><Activity size={21} /><span>Ask MediCore</span></button>
    </div>
  )
}
