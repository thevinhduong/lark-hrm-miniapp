import type { RecruitmentStatus } from '@/types/recruitment'

interface StatusBadgeProps {
  status: RecruitmentStatus
}

const STATUS_CONFIG: Record<RecruitmentStatus, { label: string; className: string }> = {
  approved: {
    label: 'Đã duyệt',
    className: 'bg-success-bg text-success-text',
  },
  pending: {
    label: 'Đang xử lý',
    className: 'bg-warning-bg text-warning-text',
  },
  rejected: {
    label: 'Đã từ chối',
    className: 'bg-critical-bg text-critical-text',
  },
  cc: {
    label: 'CC cho tôi',
    className: 'bg-info-bg text-info-text',
  },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-label-sm font-semibold uppercase ${config.className}`}
    >
      {config.label}
    </span>
  )
}
