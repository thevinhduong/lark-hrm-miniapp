import type { JobOrder } from '@/types/recruitment'
import StatusBadge from './StatusBadge'

interface JobOrderCardProps {
  jobOrder: JobOrder
}

export default function JobOrderCard({ jobOrder }: JobOrderCardProps) {
  return (
    <div className="card-polaris p-3">
      {/* Header: Title + Status */}
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-headline-md font-bold text-on-surface">
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
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-outline-variant/30">
            <img
              className="w-full h-full object-cover"
              alt={jobOrder.requesterName}
              src={jobOrder.requesterAvatar}
            />
          </div>
          <span className="text-body-md text-on-surface font-semibold">
            {jobOrder.requesterName}
          </span>
        </div>
        <span className="text-label-sm text-outline">{jobOrder.requestDate}</span>
      </div>
    </div>
  )
}
