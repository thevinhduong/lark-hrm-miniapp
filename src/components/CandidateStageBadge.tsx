import type { CandidateStage } from '@/types/recruitment'

interface CandidateStageBadgeProps {
  stage: CandidateStage
  size?: 'sm' | 'md'
}

const STAGE_CONFIG: Record<CandidateStage, { label: string; className: string }> = {
  applied: {
    label: 'Ứng tuyển',
    className: 'bg-info-bg text-info-text',
  },
  screening: {
    label: 'Sàng lọc',
    className: 'bg-secondary-container/15 text-secondary',
  },
  interview: {
    label: 'Phỏng vấn',
    className: 'bg-warning-bg text-warning-text',
  },
  offer: {
    label: 'Đề xuất',
    className: 'bg-tertiary-container/20 text-tertiary',
  },
  hired: {
    label: 'Đã tuyển',
    className: 'bg-success-bg text-success-text',
  },
  rejected: {
    label: 'Từ chối',
    className: 'bg-critical-bg text-critical-text',
  },
}

export default function CandidateStageBadge({ stage, size = 'sm' }: CandidateStageBadgeProps) {
  const config = STAGE_CONFIG[stage]
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-label-sm' : 'px-2.5 py-1 text-body-md'

  return (
    <span
      className={`${sizeClass} rounded-full font-semibold whitespace-nowrap ${config.className}`}
    >
      {config.label}
    </span>
  )
}

export { STAGE_CONFIG }