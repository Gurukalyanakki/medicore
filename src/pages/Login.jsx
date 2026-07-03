import { motion } from 'framer-motion'
import { Activity, ArrowLeft, ArrowRight, Check, Eye, EyeOff, Github, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const demoAccounts = [
  { label: 'Admin', email: 'admin@medicore.com', password: 'Admin@123' },
  { label: 'Doctor', email: 'doctor@medicore.com', password: 'Doctor@123' },
  { label: 'Nurse', email: 'nurse@medicore.com', password: 'Nurse@123' },
  { label: 'Reception', email: 'reception@medicore.com', password: 'Reception@123' },
  { label: 'Patient', email: 'patient@medicore.com', password: 'Patient@123' },
]

export default function Login() {
  const { login, session } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@medicore.com')
  const [password, setPassword] = useState('Admin@123')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => { if (session) navigate('/app/dashboard', { replace: true }) }, [session, navigate])

  const submit = (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      const result = login(email, password, remember)
      setLoading(false)
      if (result.ok) navigate('/app/dashboard')
      else setError(result.message)
    }, 650)
  }

  return (
    <div className="login-page">
      <div className="login-backdrop"><div className="login-grid" /><div className="login-orb orb-a" /><div className="login-orb orb-b" /></div>
      <Link className="login-back" to="/"><ArrowLeft size={16} /> Back to home</Link>
      <section className="login-story">
        <Link to="/" className="brand-mark"><span><Activity size={22} /></span><strong>MediCore <i>AI</i></strong></Link>
        <div><span className="hero-pill"><Sparkles size={14} /> Smart Hospital Management Platform</span><h1>Care operations,<br /><em>beautifully connected.</em></h1><p>Step into a real-time command center designed for the people who keep care moving.</p>
          <div className="login-proof"><span><i><Check /></i><b>Live operational visibility<small>Across every team, ward, and patient journey</small></b></span><span><i><ShieldCheck /></i><b>Purpose-built workflows<small>Calm, clear, and responsive at every scale</small></b></span></div>
        </div>
        <blockquote>“The best healthcare technology disappears into the work—and leaves teams feeling more capable.”</blockquote>
      </section>
      <motion.section className="login-panel" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65 }}>
        <div className="login-card">
          <div className="login-heading"><span>Welcome back</span><h2>Sign in to MediCore</h2><p>Choose a demo profile or enter your credentials.</p></div>
          <div className="account-switcher">{demoAccounts.map((account) => <button key={account.email} className={email === account.email ? 'active' : ''} onClick={() => { setEmail(account.email); setPassword(account.password); setError('') }}>{account.label}</button>)}</div>
          <form onSubmit={submit}>
            <label><span>Email address</span><div className={error ? 'input-error' : ''}><Mail size={17} /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></div></label>
            <label><span>Password</span><div className={error ? 'input-error' : ''}><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            {error && <motion.p className="login-error" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>{error}</motion.p>}
            <div className="login-options"><label className="check-row"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span><Check size={12} /></span> Remember me</label><button type="button" onClick={() => setError('Demo accounts do not require password recovery.')}>Forgot password?</button></div>
            <button className="login-submit" disabled={loading}>{loading ? <><i className="spinner" /> Securing workspace…</> : <>Enter workspace <ArrowRight size={17} /></>}</button>
          </form>
          <div className="login-divider"><span>or continue with</span></div>
          <div className="social-buttons"><button onClick={() => setError('Social sign-in is disabled in this frontend demo.')}><svg viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.18v3.73h5.28c-.23 1.2-.91 2.22-1.94 2.9v2.42h3.15c1.84-1.69 2.9-4.19 2.9-7.15 0-.65-.06-1.28-.17-1.9z" /><path fill="#34A853" d="M12.17 21.5c2.63 0 4.84-.87 6.45-2.35l-3.15-2.42c-.87.58-1.99.93-3.3.93-2.54 0-4.7-1.72-5.47-4.03H3.45v2.5a9.75 9.75 0 0 0 8.72 5.37z" /><path fill="#FBBC05" d="M6.7 13.63a5.86 5.86 0 0 1 0-3.75v-2.5H3.45a9.76 9.76 0 0 0 0 8.75l3.25-2.5z" /><path fill="#EA4335" d="M12.17 5.84c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.99 2.92 14.8 2 12.17 2a9.75 9.75 0 0 0-8.72 5.38l3.25 2.5c.77-2.32 2.93-4.04 5.47-4.04z" /></svg> Google</button><button onClick={() => setError('Social sign-in is disabled in this frontend demo.')}><Github size={18} /> GitHub</button></div>
          <p className="login-terms">By continuing, you agree to the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</p>
        </div>
      </motion.section>
    </div>
  )
}
