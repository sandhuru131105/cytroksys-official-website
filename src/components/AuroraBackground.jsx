import { memo } from 'react'

/**
 * Premium animated background with floating aurora gradient orbs.
 * Renders as a fixed layer behind all content.
 */
function AuroraBackground() {
  return (
    <div className="aurora-bg pointer-events-none fixed inset-0 z-[-1] overflow-hidden" aria-hidden="true">
      {/* Primary Aurora Orb */}
      <div className="aurora-orb aurora-orb-1" />
      {/* Secondary Aurora Orb */}
      <div className="aurora-orb aurora-orb-2" />
      {/* Tertiary Aurora Orb */}
      <div className="aurora-orb aurora-orb-3" />
      {/* Mesh Gradient Overlay */}
      <div className="aurora-mesh" />
    </div>
  )
}

export default memo(AuroraBackground)
