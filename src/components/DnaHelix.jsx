import React from 'react'

export default function DnaHelix({ strandsCount = 16 }) {
  return (
    <div className="dna-container" aria-label="3D Rotating DNA Helix Visualizer">
      {Array.from({ length: strandsCount }).map((_, i) => (
        <div key={i} className="dna-strand" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  )
}
