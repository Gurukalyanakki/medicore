import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export const cx = (...classes) => classes.filter(Boolean).join(' ')

export function Badge({ children, tone = 'neutral', dot = false }) {
  return <span className={`badge badge-${tone}`}>{dot && <i />}{children}</span>
}

export function Button({ children, variant = 'primary', icon: Icon, className = '', ...props }) {
  return <button className={`btn btn-${variant} ${className}`} {...props}>{Icon && <Icon size={16} />}{children}</button>
}

export function Card({ children, className = '', interactive = false, ...props }) {
  return <div className={`card ${interactive ? 'card-interactive' : ''} ${className}`} {...props}>{children}</div>
}

export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <motion.header className="page-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="header-actions">{actions}</div>}
    </motion.header>
  )
}

export function StatCard({ label, value, detail, icon: Icon, tone = 'blue', trend }) {
  return (
    <motion.div className={`stat-card stat-${tone}`} whileHover={{ y: -4 }} transition={{ duration: .2 }}>
      <div className="stat-top"><span className="stat-icon">{Icon && <Icon size={20} />}</span>{trend && <span className={`trend ${trend.startsWith('+') ? 'up' : ''}`}>{trend}</span>}</div>
      <strong>{value}</strong>
      <span className="stat-label">{label}</span>
      {detail && <small>{detail}</small>}
    </motion.div>
  )
}

export function SearchInput({ value, onChange, placeholder = 'Search…', className = '' }) {
  return <label className={`search-input ${className}`}><Search size={17} /><input aria-label={placeholder} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />{value && <button aria-label="Clear search" onClick={() => onChange('')}><X size={14} /></button>}</label>
}

export function Select({ value, onChange, children, label, ...props }) {
  return <label className="select-wrap">{label && <span>{label}</span>}<select value={value} onChange={(event) => onChange(event.target.value)} {...props}>{children}</select></label>
}

export function Field({ label, error, className = '', ...props }) {
  return <label className={`field ${className}`}><span>{label}</span><input {...props} />{error && <small>{error}</small>}</label>
}

export function Modal({ open, onClose, title, subtitle, children, size = 'md' }) {
  useEffect(() => {
    const close = (event) => event.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
        <motion.div className={`modal modal-${size}`} role="dialog" aria-modal="true" aria-label={title} initial={{ opacity: 0, scale: .96, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }}>
          <div className="modal-header"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button className="icon-btn" aria-label="Close modal" onClick={onClose}><X size={19} /></button></div>
          <div className="modal-body">{children}</div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  )
}

export function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', tone = 'danger', onConfirm, onClose }) {
  return <Modal open={open} onClose={onClose} title={title} size="sm"><p className="confirm-copy">{message}</p><div className="modal-actions"><Button variant="ghost" onClick={onClose}>Cancel</Button><Button variant={tone} onClick={() => { onConfirm(); onClose() }}>{confirmLabel}</Button></div></Modal>
}

export function Tabs({ items, value, onChange }) {
  return <div className="tabs" role="tablist">{items.map((item) => <button role="tab" aria-selected={value === item} className={value === item ? 'active' : ''} key={item} onClick={() => onChange(item)}>{item}</button>)}</div>
}

export function EmptyState({ icon: Icon, title, message, action }) {
  return <div className="empty-state">{Icon && <span><Icon size={25} /></span>}<h3>{title}</h3><p>{message}</p>{action}</div>
}

export function Avatar({ name, color, size = 'md' }) {
  const initials = name?.replace(/^Dr\.\s*/, '').split(' ').map((part) => part[0]).join('').slice(0, 2)
  return <span className={`avatar avatar-${size}`} style={color ? { background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 55%, #0f172a))` } : undefined}>{initials}</span>
}

export function Progress({ value, color = '#2563eb', label }) {
  return <div className="progress-wrap">{label && <div><span>{label}</span><b>{value}%</b></div>}<div className="progress"><motion.i initial={{ width: 0 }} animate={{ width: `${Math.min(100, value)}%` }} transition={{ duration: .8 }} style={{ background: color }} /></div></div>
}

export function Segmented({ items, value, onChange }) {
  return <div className="segmented">{items.map((item) => <button key={item} className={item === value ? 'active' : ''} onClick={() => onChange(item)}>{item === value && <Check size={13} />}{item}</button>)}</div>
}

export function KebabMenu({ children }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const close = (event) => !ref.current?.contains(event.target) && setOpen(false)
    window.addEventListener('pointerdown', close)
    return () => window.removeEventListener('pointerdown', close)
  }, [])
  return <div className="kebab" ref={ref}><button className="icon-btn" aria-label="More options" onClick={() => setOpen(!open)}>•••</button>{open && <div className="kebab-popover" onClick={() => setOpen(false)}>{children}</div>}</div>
}

export function Skeleton({ className = '' }) {
  return <span className={`skeleton ${className}`} />
}
