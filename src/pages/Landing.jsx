import { motion } from 'framer-motion'
import {
  Activity, ArrowRight, BedDouble, BrainCircuit, Building2, Check, ChevronDown,
  CirclePlay, Clock3, HeartPulse, Menu, Quote, ShieldCheck, Sparkles, Stethoscope,
  Users, X, Zap,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui'
import DnaHelix from '../components/DnaHelix'

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

const renderSkeleton = (isDepth) => {
  const color = isDepth ? "rgba(0, 210, 255, 0.22)" : "#00d2ff"
  const sternumColor = isDepth ? "rgba(255, 255, 255, 0.2)" : "#fff"
  const opacity = isDepth ? 0.35 : 0.85
  const filter = isDepth ? 'blur(1.2px)' : 'drop-shadow(0 0 4px rgba(0, 210, 255, 0.55))'
  const className = isDepth ? 'hologram-body-depth' : 'hologram-body-main'

  return (
    <g stroke={color} strokeLinecap="round" fill="none" opacity={opacity} className={className} style={{ filter }}>
      {/* Skull */}
      <ellipse cx="100" cy="70" rx="13" ry="16" strokeWidth="1.6" />
      <path d="M93,80 L107,80 M96,73 A1.2,1.2 0 1,1 98.4,73 M101.6,73 A1.2,1.2 0 1,1 104,73" strokeWidth="1.2" />
      
      {/* Spine */}
      <path d="M100,86 L100,240" strokeWidth="2.5" strokeDasharray="3 3.5" stroke={isDepth ? "rgba(0, 229, 255, 0.4)" : "#00e5ff"} />
      
      {/* Ribcage */}
      <path d="M83,98 L100,102 L117,98" strokeWidth="1.5" />
      <path d="M85,110 C90,113 95,113 100,113 C105,113 110,113 115,110" strokeWidth="1.3" />
      <path d="M83,120 C90,123 95,123 100,123 C105,123 110,123 117,120" strokeWidth="1.3" />
      <path d="M81,130 C90,135 95,135 100,135 C105,135 110,135 119,130" strokeWidth="1.3" />
      <path d="M80,141 C89,147 95,147 100,147 C105,147 111,147 120,141" strokeWidth="1.3" />
      <path d="M81,152 C89,158 95,158 100,158 C105,158 111,158 119,152" strokeWidth="1.3" />
      <path d="M83,163 C90,168 95,168 100,168 C105,168 110,168 117,163" strokeWidth="1.3" />
      <path d="M85,174 C90,178 95,178 100,178 C105,178 110,178 115,174" strokeWidth="1.1" />

      {/* Sternum */}
      <line x1="100" y1="102" x2="100" y2="173" strokeWidth="2.2" stroke={sternumColor} />
      
      {/* Pelvis */}
      <path d="M85,218 C85,238 115,238 115,218 L111,209 L89,209 Z" strokeWidth="1.6" />
      <circle cx="92" cy="223" r="3.5" />
      <circle cx="108" cy="223" r="3.5" />
      <line x1="100" y1="209" x2="100" y2="235" strokeWidth="1.8" />
      
      {/* Left Shoulder Joint */}
      <circle cx="82" cy="99" r="2" fill={color} />
      
      {/* Left Arm Group (Raises on hover) */}
      <g className="skeleton-left-arm">
        <path d="M82,99 L66,145 L58,195" strokeWidth="1.8" />
        <circle cx="66" cy="145" r="1.8" fill={color} />
        <path d="M58,195 L55,206" strokeWidth="1.2" />
      </g>

      {/* Right Shoulder Joint */}
      <circle cx="118" cy="99" r="2" fill={color} />

      {/* Right Arm Group (Raises on hover) */}
      <g className="skeleton-right-arm">
        <path d="M118,99 L134,145 L142,195" strokeWidth="1.8" />
        <circle cx="134" cy="145" r="1.8" fill={color} />
        <path d="M142,195 L145,206" strokeWidth="1.2" />
      </g>

      {/* Left Leg */}
      <path d="M91,232 L87,295 L82,360" strokeWidth="2.2" />
      <circle cx="91" cy="232" r="2.5" fill={color} />
      <circle cx="87" cy="295" r="2" fill={color} />
      <path d="M82,360 L74,364" strokeWidth="1.8" />

      {/* Right Leg */}
      <path d="M109,232 L113,295 L118,360" strokeWidth="2.2" />
      <circle cx="109" cy="232" r="2.5" fill={color} />
      <circle cx="113" cy="295" r="2" fill={color} />
      <path d="M118,360 L126,364" strokeWidth="1.8" />
    </g>
  )
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
          <div className="holographic-scanner">
            {/* Hologram topbar HUD */}
            <div className="scanner-header">
              <div><span className="scanner-ping" /><span>SYSTEM SCANNER TIER-V</span></div>
              <div className="scanner-sync">SYNC: 87.4% CONNECTED</div>
            </div>

            <div className="scanner-body">
              {/* Left HUD Panel */}
              <div className="scanner-hud-left">
                <div className="hud-metric">
                  <small>TEMPERATURE</small>
                  <strong>36.8 °C</strong>
                  <span className="hud-badge hud-badge-ok">NORMAL</span>
                </div>
                <div className="hud-metric">
                  <small>CARDIOVASCULAR</small>
                  <strong>72 BPM</strong>
                  <span className="hud-badge hud-badge-warning">STABLE</span>
                </div>
                <div className="hud-metric">
                  <small>OXYGEN SATURATION</small>
                  <strong>98.5% SpO2</strong>
                  <span className="hud-badge hud-badge-ok">OPTIMAL</span>
                </div>
                <div className="hud-metric">
                  <small>SYSTOLIC/DIASTOLIC</small>
                  <strong>120/80 mmHg</strong>
                  <span className="hud-badge hud-badge-ok">IDEAL</span>
                </div>
                <div className="hud-chart-box">
                  <small>LIVE PULSE MONITOR</small>
                  <svg className="hud-ecg-svg" viewBox="0 0 100 35" width="100%" height="40">
                    <path d="M0,17 L25,17 L28,8 L32,26 L36,4 L40,20 L44,17 L70,17 L73,8 L77,26 L81,4 L85,20 L89,17 L100,17" 
                          fill="none" 
                          stroke="#00d2ff" 
                          strokeWidth="1.5" 
                          className="ecg-line" />
                  </svg>
                </div>
              </div>

              {/* Central Human Skeleton visual */}
              <div className="scanner-central-visual">
                {/* Horizontal scanning sweep laser line */}
                <div className="laser-sweep" />
                
                <svg className="hologram-body-svg" viewBox="0 0 200 400" width="100%" height="100%">
                  <defs>
                    <pattern id="hologramGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 210, 255, 0.04)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hologramGrid)" />
                  
                  {/* Outer scale lines */}
                  <g stroke="rgba(0, 210, 255, 0.25)" strokeWidth="0.8">
                    <line x1="8" y1="40" x2="16" y2="40" />
                    <line x1="8" y1="80" x2="12" y2="80" />
                    <line x1="8" y1="120" x2="16" y2="120" />
                    <line x1="8" y1="160" x2="12" y2="160" />
                    <line x1="8" y1="200" x2="16" y2="200" />
                    <line x1="8" y1="240" x2="12" y2="240" />
                    <line x1="8" y1="280" x2="16" y2="280" />
                    <line x1="8" y1="320" x2="12" y2="320" />
                    <line x1="8" y1="360" x2="16" y2="360" />
                    
                    <line x1="192" y1="40" x2="184" y2="40" />
                    <line x1="192" y1="80" x2="188" y2="80" />
                    <line x1="192" y1="120" x2="184" y2="120" />
                    <line x1="192" y1="160" x2="188" y2="160" />
                    <line x1="192" y1="200" x2="184" y2="200" />
                    <line x1="192" y1="240" x2="188" y2="240" />
                    <line x1="192" y1="280" x2="184" y2="280" />
                    <line x1="192" y1="320" x2="188" y2="320" />
                    <line x1="192" y1="360" x2="184" y2="360" />
                  </g>

                  {/* Body outline shape */}
                  <path d="M100,50 C112,50 120,58 120,70 C120,80 114,84 116,92 C125,95 133,101 138,110 C143,120 148,150 148,180 C148,200 143,210 143,220 C143,230 145,240 142,250 C138,260 133,265 130,275 C130,290 136,330 130,370 C128,380 122,385 116,385 C112,385 110,380 110,360 C110,340 108,310 108,285 C108,280 92,280 92,285 C92,310 90,340 90,360 C90,380 88,385 84,385 C78,385 72,380 70,370 C64,330 70,290 70,275 C67,265 62,260 58,250 C55,240 57,230 57,220 C57,210 52,200 52,180 C52,150 57,120 62,110 C67,101 75,95 84,92 C86,84 80,80 80,70 C80,58 88,50 100,50 Z" 
                        fill="rgba(0, 210, 255, 0.015)" 
                        stroke="rgba(0, 210, 255, 0.2)" 
                        strokeWidth="1.2" 
                        strokeDasharray="4 2" />

                  {/* Scanner Base Rings at feet */}
                  <g className="scanner-base-group">
                    <ellipse cx="100" cy="380" rx="42" ry="11" stroke="rgba(0, 229, 255, 0.45)" strokeWidth="1.2" fill="rgba(0, 210, 255, 0.05)" className="scanner-ring-3d" />
                    <ellipse cx="100" cy="380" rx="32" ry="8" stroke="rgba(0, 210, 255, 0.25)" strokeWidth="0.8" strokeDasharray="3 3" />
                  </g>

                  {/* 3D Depth layered skeletons */}
                  {renderSkeleton(true)}
                  {renderSkeleton(false)}
                </svg>
              </div>

              {/* Right HUD Panel */}
              <div className="scanner-hud-right">
                <div className="hud-metric">
                  <small>DNA BLUEPRINT</small>
                  <strong>GENOME-SYNC</strong>
                  <span className="hud-badge hud-badge-info">RUNNING</span>
                </div>
                <div className="hud-dna-track">
                  <DnaHelix strandsCount={12} />
                </div>
                <div className="hud-info-grid">
                  <div><span>LATENCY</span><b>0.12 ms</b></div>
                  <div><span>ACCURACY</span><b>99.98%</b></div>
                  <div><span>GRID MAP</span><b>OK/SYNC</b></div>
                  <div><span>MODE</span><b>HOLOMINDP</b></div>
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
        <div className="workflow-visual"><div className="workflow-rings"><div className="workflow-core" style={{ padding: '8px', gap: '3px' }}><DnaHelix strandsCount={7} /><b>One live<br />care network</b></div>{[{ icon: Users, label: 'Patient flow' }, { icon: Stethoscope, label: 'Clinical teams' }, { icon: BedDouble, label: 'Capacity' }, { icon: Zap, label: 'Intelligence' }].map((item, index) => <motion.div key={item.label} className={`workflow-node node-${index + 1}`} animate={{ y: [0, index % 2 ? 7 : -7, 0] }} transition={{ duration: 3 + index * .2, repeat: Infinity }}><item.icon /><span>{item.label}</span></motion.div>)}</div></div>
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
