import { motion } from 'framer-motion'
import {
  Activity, ArrowRight, BedDouble, BrainCircuit, Building2, Check, ChevronDown,
  CirclePlay, Clock3, HeartPulse, Menu, Quote, ShieldCheck, Sparkles, Stethoscope,
  Users, X, Zap,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui'

const features = [
  { icon: BrainCircuit, title: 'Predictive operations', text: 'AI-assisted signals surface capacity risks and care bottlenecks before they become critical.', color: 'purple' },
  { icon: HeartPulse, title: 'Connected care delivery', text: 'One real-time workspace for clinical teams, patient journeys, and operational handoffs.', color: 'teal' },
  { icon: BedDouble, title: 'Intelligent capacity', text: 'Live bed, ward, and admissions coordination that keeps every care space visible.', color: 'blue' },
  { icon: ShieldCheck, title: 'Enterprise-ready', text: 'Role-aware workflows, audit-friendly interactions, and a resilient design system.', color: 'amber' },
]

const testimonials = [
  { quote: 'MediCore gives our teams the kind of operational clarity we used to chase across six different systems.', name: 'Dr. Camille Foster', role: 'Chief Medical Officer, Northstar Health', initials: 'CF' },
  { quote: 'The experience feels calm even on our busiest days. That is rare—and incredibly valuable—in hospital software.', name: 'Ana Morales', role: 'VP of Clinical Operations, Arcadia Care', initials: 'AM' },
  { quote: 'We saw the entire patient flow in minutes. No training maze, no spreadsheet archaeology.', name: 'James Okoro', role: 'Digital Health Director, Vertex Medical', initials: 'JO' },
]

const faqs = [
  ['Is MediCore designed for multi-site hospitals?', 'Yes. MediCore’s workspace model supports multiple campuses, departments, and care settings while preserving a unified operational view.'],
  ['Can workflows be customized?', 'Departments, roles, alerts, patient pathways, and operational preferences can all be configured to match local processes.'],
  ['How quickly can teams get started?', 'The interface is designed around familiar hospital workflows, with guided setup and clear progressive disclosure for complex tasks.'],
  ['Does it work on mobile devices?', 'Yes. Every workflow is responsive across desktop, tablet, and mobile form factors.'],
]

function AnimatedNumber({ end, suffix = '' }) {
  const [value, setValue] = useState(0)
  const ref = useRef()
  useEffect(() => {
    const timer = setInterval(() => setValue((current) => {
      if (current >= end) { clearInterval(timer); return end }
      return Math.min(end, current + Math.ceil(end / 40))
    }), 28)
    return () => clearInterval(timer)
  }, [end])
  return <strong ref={ref}>{value.toLocaleString()}{suffix}</strong>
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
  return (
    <div className="landing">
      <div className="landing-glow glow-one" /><div className="landing-glow glow-two" />
      <nav className="landing-nav">
        <Link to="/" className="brand-mark"><span><Activity size={22} /></span><strong>MediCore <i>AI</i></strong></Link>
        <div className={`landing-links ${menuOpen ? 'open' : ''}`}>
          <a href="#platform" onClick={() => setMenuOpen(false)}>Platform</a><a href="#solutions" onClick={() => setMenuOpen(false)}>Solutions</a><a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </div>
        <div className="landing-nav-actions"><Link to="/login">Sign in</Link><Link className="nav-demo" to="/login">Explore the platform <ArrowRight size={15} /></Link></div>
        <button className="landing-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section className="hero">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <span className="hero-pill"><Sparkles size={14} /> Intelligence for every moment of care</span>
          <h1>Run your hospital.<br /><em>Elevate every outcome.</em></h1>
          <p>MediCore unifies clinical operations, patient flow, and hospital intelligence in one beautifully connected platform.</p>
          <div className="hero-actions"><Link className="hero-primary" to="/login">Explore the live platform <ArrowRight size={18} /></Link><a className="hero-secondary" href="#platform"><CirclePlay size={19} /> See how it works</a></div>
          <div className="hero-trust"><span><Check size={14} /> Frontend demo</span><span><Check size={14} /> No setup required</span><span><Check size={14} /> Real workflows</span></div>
        </motion.div>
        <motion.div className="hero-visual" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, delay: .15 }}>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="hero-dashboard">
            <div className="demo-top"><div><i /><i /><i /></div><span>MediCore Operations</span><b>Live</b></div>
            <div className="demo-body">
              <div className="demo-sidebar"><Activity /><span /><span /><span /><span /></div>
              <div className="demo-main">
                <div className="demo-heading"><div><small>GOOD MORNING</small><b>Hospital overview</b></div><span>+ New admission</span></div>
                <div className="demo-stats">
                  <div><Users /><span><small>Total patients</small><b>2,847</b><i>+12.4%</i></span></div>
                  <div><BedDouble /><span><small>Bed occupancy</small><b>78.4%</b><i>Stable</i></span></div>
                  <div><Clock3 /><span><small>Avg. wait time</small><b>14 min</b><i>-3 min</i></span></div>
                </div>
                <div className="demo-grid">
                  <div className="demo-chart"><span><b>Patient flow</b><small>Last 7 days</small></span><svg viewBox="0 0 400 130" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4f8cff" stopOpacity=".35" /><stop offset="1" stopColor="#4f8cff" stopOpacity="0" /></linearGradient></defs><path d="M0 100 C45 85 55 92 95 62 S150 83 190 54 S255 65 300 32 S355 48 400 18 L400 130 L0 130Z" fill="url(#area)" /><path d="M0 100 C45 85 55 92 95 62 S150 83 190 54 S255 65 300 32 S355 48 400 18" fill="none" stroke="#4f8cff" strokeWidth="3" /></svg></div>
                  <div className="demo-wards"><span><b>Ward capacity</b><small>Live</small></span>{[['ICU', 84], ['General', 72], ['Cardiology', 66], ['Pediatrics', 54]].map(([name, value]) => <div key={name}><p><span>{name}</span><b>{value}%</b></p><i><em style={{ width: `${value}%` }} /></i></div>)}</div>
                </div>
              </div>
            </div>
          </div>
          <motion.div className="floating-card floating-pulse" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.2 }}><span><HeartPulse size={20} /></span><div><small>Emergency response</small><b>Team assigned in 42 sec</b></div></motion.div>
          <motion.div className="floating-card floating-ai" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.6 }}><span><BrainCircuit size={20} /></span><div><small>MediCore Insight</small><b>ICU capacity optimized</b></div></motion.div>
        </motion.div>
      </section>

      <section className="partner-strip"><p>Trusted by teams building the future of care</p><div>{['NORTHSTAR', 'VANTAGE HEALTH', 'ARCADIA', 'LUMEN MEDICAL', 'VERTEX'].map((name) => <span key={name}><Building2 size={19} /> {name}</span>)}</div></section>

      <section className="landing-stats"><div><AnimatedNumber end={2400} suffix="+" /><span>Care teams connected</span></div><div><AnimatedNumber end={18} suffix="M" /><span>Patient events coordinated</span></div><div><AnimatedNumber end={32} suffix="%" /><span>Faster patient throughput</span></div><div><AnimatedNumber end={99} suffix=".99%" /><span>Platform availability</span></div></section>

      <section className="feature-section" id="platform">
        <div className="section-heading"><span>The operating system for modern care</span><h2>Clarity across every<br />clinical operation.</h2><p>Replace fragmented tools with one adaptive workspace that helps your people see, decide, and act together.</p></div>
        <div className="feature-grid">{features.map((item, index) => <motion.article key={item.title} whileHover={{ y: -7 }} className={`feature-card feature-${item.color}`}><span className="feature-number">0{index + 1}</span><i><item.icon size={25} /></i><h3>{item.title}</h3><p>{item.text}</p><a href="#solutions">Discover capability <ArrowRight size={15} /></a></motion.article>)}</div>
      </section>

      <section className="workflow-section" id="solutions">
        <div className="workflow-visual"><div className="workflow-rings"><div className="workflow-core"><Activity size={35} /><b>One live<br />care network</b></div>{[{ icon: Users, label: 'Patient flow' }, { icon: Stethoscope, label: 'Clinical teams' }, { icon: BedDouble, label: 'Capacity' }, { icon: Zap, label: 'Intelligence' }].map((item, index) => <motion.div key={item.label} className={`workflow-node node-${index + 1}`} animate={{ y: [0, index % 2 ? 7 : -7, 0] }} transition={{ duration: 3 + index * .2, repeat: Infinity }}><item.icon /><span>{item.label}</span></motion.div>)}</div></div>
        <div className="workflow-copy"><span>Built around the patient journey</span><h2>Every handoff becomes a moment of confidence.</h2><p>From first contact through discharge, MediCore keeps the right context moving with the patient—so teams spend less time coordinating systems and more time delivering care.</p><ul><li><Check /> Real-time operational signals</li><li><Check /> Context-aware team workflows</li><li><Check /> A complete longitudinal patient view</li></ul><Link to="/login">Experience the workflow <ArrowRight /></Link></div>
      </section>

      <section className="testimonials" id="about"><div className="section-heading"><span>Built with healthcare, for healthcare</span><h2>Teams feel the difference.</h2></div><div className="testimonial-grid">{testimonials.map((item) => <article key={item.name}><Quote size={28} /><p>“{item.quote}”</p><div><span>{item.initials}</span><b>{item.name}<small>{item.role}</small></b></div></article>)}</div></section>

      <section className="pricing-section" id="pricing"><div className="section-heading"><span>Simple, transparent partnership</span><h2>Start where you are.<br />Scale without friction.</h2></div><div className="pricing-grid">
        <article><span>Essential</span><h3>For focused care teams</h3><p>Core patient, appointment, and clinical workflow management.</p><strong>Let’s talk</strong><Link to="/login">Request access <ArrowRight /></Link><ul><li><Check /> Patient registry</li><li><Check /> Scheduling and care teams</li><li><Check /> Operational dashboards</li></ul></article>
        <article className="pricing-featured"><em>Most complete</em><span>Enterprise</span><h3>For connected health systems</h3><p>Advanced operations, capacity intelligence, and multi-site coordination.</p><strong>Built for your network</strong><Link to="/login">Explore Enterprise <ArrowRight /></Link><ul><li><Check /> Everything in Essential</li><li><Check /> Advanced capacity management</li><li><Check /> Enterprise analytics</li><li><Check /> Priority success partnership</li></ul></article>
      </div></section>

      <section className="faq-section"><div><span>Common questions</span><h2>Everything you need to know.</h2><p>Have another question? Our team would love to talk.</p><a href="mailto:hello@medicore.health">hello@medicore.health</a></div><div className="faq-list">{faqs.map(([question, answer], index) => <article className={openFaq === index ? 'open' : ''} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><ChevronDown /></button>{openFaq === index && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>{answer}</motion.p>}</article>)}</div></section>

      <section className="landing-cta"><div><Sparkles /><span>Ready when you are</span><h2>Build a calmer, smarter<br />hospital operation.</h2><p>Step into a live MediCore workspace and see what connected care can feel like.</p><Link to="/login">Launch the demo <ArrowRight /></Link></div></section>
      <footer className="landing-footer"><div className="footer-main"><div><Link to="/" className="brand-mark"><span><Activity size={22} /></span><strong>MediCore <i>AI</i></strong></Link><p>Smart hospital management, beautifully connected.</p></div><div><b>Platform</b><a href="#platform">Overview</a><a href="#solutions">Solutions</a><a href="#pricing">Pricing</a></div><div><b>Company</b><a href="#about">About</a><a href="#about">Careers</a><a href="#about">Contact</a></div><div><b>Resources</b><a href="#about">Help center</a><a href="#about">Security</a><a href="#about">System status</a></div></div><div className="footer-bottom"><span>© 2026 MediCore AI. Portfolio demonstration.</span><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div></div></footer>
    </div>
  )
}
