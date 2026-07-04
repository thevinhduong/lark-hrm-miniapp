import type { JobOrder } from '@/types/recruitment'
import StatusBadge from './StatusBadge'

interface JobOrderCardProps {
  jobOrder: JobOrder
  onClick?: (id: string) => void
}

export default function JobOrderCard({ jobOrder, onClick }: JobOrderCardProps) {
  const handleClick = () => onClick?.(jobOrder.id)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.(jobOrder.id)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="card-polaris p-3 cursor-pointer active:scale-[0.99] transition-transform"
    >
      {/* Header: Title + Status */}
      <div className="flex justify-between items-start mb-2 gap-2">
        <h2 className="text-headline-md font-bold text-on-surface flex-1">
          {jobOrder.title}
        </h2>
        <StatusBadge status={jobOrder.status} />
      </div>

      {/* Metadata: Department, Level, Count */}
      <div className="grid grid-cols-2 gap-y-1 mb-3">
        <div className="flex flex-col">
          <span className="text-label-sm text-on-surface-variant">Phòng ban:</span>
          <span className="text-body-md font-medium text-on-surface">{jobOrder.department}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-label-sm text-on-surface-variant">Cấp bậc:</span>
          <span className="text-body-md font-medium text-on-surface">{jobOrder.level}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-label-sm text-on-surface-variant">Số lượng:</span>
          <span className="text-body-md font-medium text-on-surface">{jobOrder.count}</span>
        </div>
      </div>

      {/* Footer: Requester + Date */}
      <div className="flex items-center justify-between pt-2 border-t border-surface-container-high">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-outline-variant/30 flex-shrink-0 bg-surface-container-high">
            <img
              className="w-full h-full object-cover"
              alt={jobOrder.requesterName}
              src={jobOrder.requesterAvatar}
            />
          </div>
          <span className="text-body-md text-on-surface font-semibold truncate">
            {jobOrder.requesterName}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-label-sm text-outline">{jobOrder.requestDate}</span>
          <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
        </div>
      </div>
    </div>
  )
}