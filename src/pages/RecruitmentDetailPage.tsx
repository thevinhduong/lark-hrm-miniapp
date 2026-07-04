import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { JobOrder, Candidate, CandidateStage, WorkflowStep } from '@/types/recruitment'
import {
  fetchJobOrderById,
  fetchCandidates,
  summarizeCandidateStages,
  type CandidateStageSummary,
} from '@/services/api'
import BackAppBar from '@/components/BackAppBar'
import StatusBadge from '@/components/StatusBadge'
import LoadingSpinner from '@/components/LoadingSpinner'
import BottomNav from '@/components/BottomNav'

// 4-tab bottom nav for the detail page (per Stitch design)
const DETAIL_NAV_TABS = [
  { key: 'group', icon: 'group', label: 'Nhóm chat' },
  { key: 'comment', icon: 'comment', label: 'Bình luận' },
  { key: 'share', icon: 'share', label: 'Chia sẻ' },
  { key: 'more', icon: 'more_vert', label: 'Khác' },
]

export default function RecruitmentDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [jobOrder, setJobOrder] = useState<JobOrder | null>(null)
  const [relatedCandidates, setRelatedCandidates] = useState<Candidate[]>([])
  const [candidateSummary, setCandidateSummary] = useState<CandidateStageSummary | null>(
    null,
  )
  const [loading, setLoading] = useState(true)
  const [bottomNavTab, setBottomNavTab] = useState('comment')
  const [requestCopied, setRequestCopied] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [order, candidates] = await Promise.all([
        fetchJobOrderById(id),
        fetchCandidates(id),
      ])
      setJobOrder(order)
      setRelatedCandidates(candidates.slice(0, 3))
      setCandidateSummary(summarizeCandidateStages(id))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  const handleCopyRequestCode = () => {
    if (!jobOrder?.requestCode) return
    navigator.clipboard?.writeText(jobOrder.requestCode)
    setRequestCopied(true)
    setTimeout(() => setRequestCopied(false), 1500)
  }

  const handleViewAllCandidates = () => {
    if (!jobOrder) return
    navigate(`/recruitment/${id}/candidates`)
  }

  if (loading) {
    return (
      <div className="bg-surface min-h-screen">
        <BackAppBar title="Chi tiết yêu cầu" onBack={() => navigate('/')} />
        <div className="pt-14">
          <LoadingSpinner />
        </div>
        <BottomNav
          tabs={DETAIL_NAV_TABS}
          activeTab={bottomNavTab}
          onTabChange={setBottomNavTab}
        />
      </div>
    )
  }

  if (!jobOrder) {
    return (
      <div className="bg-surface min-h-screen">
        <BackAppBar title="Chi tiết yêu cầu" onBack={() => navigate('/')} />
        <div className="pt-20 px-margin-mobile text-center">
          <span className="material-symbols-outlined text-outline text-5xl mb-3 block">
            search_off
          </span>
          <p className="text-body-lg text-on-surface-variant">
            Không tìm thấy yêu cầu tuyển dụng
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <BackAppBar title="Chi tiết yêu cầu" onBack={() => navigate('/')} />

      <main className="flex-1 pt-14 pb-24 overflow-y-auto">
        <div className="max-w-xl mx-auto px-margin-mobile">
          {/* ===== Hero card ===== */}
          <section className="card-polaris p-4 mt-4">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-headline-2xl-mobile font-bold text-secondary leading-tight">
                {jobOrder.title}
              </h2>
              <StatusBadge status={jobOrder.status} />
            </div>

            {/* Fact grid */}
            <div className="grid grid-cols-2 gap-y-3 mb-4">
              <FactItem label="Phòng ban" value={jobOrder.department} />
              <FactItem label="Cấp bậc" value={jobOrder.level} />
              <FactItem label="Số lượng" value={`${jobOrder.count}`} />
              <div>
                <p className="text-label-sm text-on-surface-variant mb-1">Mã yêu cầu:</p>
                <div className="flex items-center gap-1">
                  <p className="text-body-md font-semibold text-on-surface">
                    {jobOrder.requestCode ?? '—'}
                  </p>
                  {jobOrder.requestCode && (
                    <button
                      onClick={handleCopyRequestCode}
                      className="material-symbols-outlined text-[14px] text-outline hover:text-on-surface transition-colors p-0.5"
                      aria-label="Sao chép mã"
                    >
                      {requestCopied ? 'check' : 'content_copy'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Requester + Date footer */}
            <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20 flex-shrink-0 bg-surface-container-high">
                <img
                  src={jobOrder.requesterAvatar}
                  alt={jobOrder.requesterName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-label-sm text-on-surface-variant">Người yêu cầu</p>
                <p className="text-body-md font-bold text-on-surface truncate">
                  {jobOrder.requesterName}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-label-sm text-on-surface-variant">Ngày tạo</p>
                <p className="text-body-md text-on-surface">
                  {jobOrder.requestDate} {jobOrder.requestTime}
                </p>
              </div>
            </div>
          </section>

          {/* ===== Thông tin yêu cầu (4 sub-items) ===== */}
          <section className="card-polaris p-4 mt-4">
            <h3 className="text-headline-md font-bold mb-4 text-on-surface">
              Thông tin yêu cầu
            </h3>
            <div className="space-y-6">
              <InfoRow icon="corporate_fare" label="Lý do tuyển dụng">
                <p className="text-body-md text-on-surface leading-relaxed">
                  {jobOrder.recruitmentReason ?? '—'}
                </p>
              </InfoRow>

              {jobOrder.requiredSkills && jobOrder.requiredSkills.length > 0 && (
                <InfoRow icon="code" label="Kỹ năng yêu cầu">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {jobOrder.requiredSkills.map(skill => (
                      <span
                        key={skill}
                        className="bg-surface-container-high px-2 py-0.5 rounded text-label-sm text-on-surface"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </InfoRow>
              )}

              {jobOrder.workArrangement && (
                <InfoRow icon="work_outline" label="Hình thức làm việc">
                  <p className="text-body-md text-on-surface mt-1">
                    {jobOrder.workArrangement}
                  </p>
                </InfoRow>
              )}

              {jobOrder.budget && (
                <InfoRow icon="payments" label="Ngân sách">
                  <p className="text-body-lg font-bold text-secondary mt-1">
                    {jobOrder.budget}
                  </p>
                </InfoRow>
              )}
            </div>
          </section>

          {/* ===== Quy trình phê duyệt (theo Stitch UI) ===== */}
          {jobOrder.workflow && jobOrder.workflow.length > 0 && (
            <section className="card-polaris p-4 mt-4">
              <h3 className="text-headline-md font-bold mb-6 text-on-surface">
                Quy trình phê duyệt
              </h3>
              <div className="relative">
                {jobOrder.workflow.map((step, idx) => (
                  <WorkflowStepRow
                    key={step.id}
                    step={step}
                    isLast={idx === jobOrder.workflow!.length - 1}
                  />
                ))}
              </div>
            </section>
          )}

          {/* ===== Ứng viên liên quan (simplified) ===== */}
          {relatedCandidates.length > 0 && (
            <section className="card-polaris p-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-headline-md font-bold text-on-surface">
                  Ứng viên liên quan ({candidateSummary?.total ?? relatedCandidates.length})
                </h3>
                <button
                  onClick={handleViewAllCandidates}
                  className="text-secondary text-label-sm font-bold hover:underline"
                >
                  Xem tất cả
                </button>
              </div>
              <div className="divide-y divide-outline-variant/30">
                {relatedCandidates.map(c => (
                  <div key={c.id} className="py-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20 flex-shrink-0 bg-surface-container-high">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-body-md font-bold text-on-surface truncate">
                        {c.name}
                      </p>
                      <p className="text-label-sm text-on-surface-variant truncate">
                        {c.email}
                      </p>
                    </div>
                    <CandidateMiniBadge stage={c.stage} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ===== Comments empty state (theo Stitch) ===== */}
          <section className="card-polaris py-8 px-4 mt-4 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 mb-4 flex items-center justify-center bg-surface-container rounded-full">
              <span className="material-symbols-outlined text-[32px] text-outline">forum</span>
            </div>
            <p className="text-headline-md font-bold text-on-surface">Chưa có bình luận</p>
            <p className="text-body-md text-on-surface-variant mt-1 mb-6">
              Hãy bắt đầu thảo luận với nhóm tuyển dụng
            </p>
            <button
              onClick={() => alert('Tính năng bình luận đang phát triển')}
              className="bg-secondary text-on-secondary px-6 py-2.5 rounded-lg text-body-md font-semibold hover:opacity-90 transition-all active:scale-95 shadow-sm"
            >
              Thêm bình luận
            </button>
          </section>
        </div>
      </main>

      <BottomNav
        tabs={DETAIL_NAV_TABS}
        activeTab={bottomNavTab}
        onTabChange={setBottomNavTab}
      />
    </div>
  )
}

// ============================================
// Sub-components
// ============================================

function FactItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-label-sm text-on-surface-variant mb-1">{label}:</p>
      <p className="text-body-md font-semibold text-on-surface">{value}</p>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4">
      <div className="p-2 bg-surface-container rounded-lg h-fit flex-shrink-0">
        <span className="material-symbols-outlined text-secondary text-[20px]">{icon}</span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-label-sm text-on-surface-variant font-semibold">{label}</p>
        {children}
      </div>
    </div>
  )
}

function WorkflowStepRow({ step, isLast }: { step: WorkflowStep; isLast: boolean }) {
  const colorClass = {
    success: 'bg-[#1e5128] text-white',
    active: 'bg-secondary text-white',
    outline: 'border-2 border-outline-variant bg-surface-container text-outline',
  }[step.statusColor]

  const isSystem = step.person === 'Hệ thống' || !step.personAvatar

  return (
    <div className="flex gap-4 relative workflow-step">
      <div
        className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass} ${
          step.status === 'active' ? 'pulse-active' : ''
        }`}
      >
        {step.status === 'done' ? (
          <span className="material-symbols-outlined text-[16px] font-bold">check</span>
        ) : (
          <span className="font-bold text-[12px]">{parseInt(step.id.replace('w', ''), 10)}</span>
        )}
      </div>
      <div className="flex-1 pb-6 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0 flex-1">
            <p
              className={`text-body-md font-bold ${
                step.status === 'pending' ? 'text-outline' : 'text-on-surface'
              }`}
            >
              {step.title}
            </p>
            {/* Person row with avatar */}
            <div className="flex items-center gap-2 mt-1">
              {isSystem ? (
                <div className="w-5 h-5 rounded-full bg-surface-container-high border border-outline-variant/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[14px] text-outline">settings</span>
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full overflow-hidden border border-outline-variant/20 flex-shrink-0 bg-surface-container-high">
                  <img
                    src={step.personAvatar}
                    alt={step.person}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <p className="text-label-sm text-on-surface-variant truncate">{step.person}</p>
            </div>
            {step.statusLabel && (
              <p
                className={`text-label-sm mt-1.5 font-bold uppercase ${
                  step.statusColor === 'success'
                    ? 'text-[#1e5128]'
                    : step.statusColor === 'active'
                    ? 'text-secondary'
                    : 'text-outline'
                }`}
              >
                {step.statusLabel}
              </p>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            {step.relativeTime && (
              <p className="text-label-sm text-outline">{step.relativeTime}</p>
            )}
            {step.timestamp && (
              <p className="text-label-sm text-outline">{step.timestamp}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const STAGE_LABELS: Record<CandidateStage, { label: string; className: string }> = {
  applied: { label: 'Hồ sơ mới', className: 'bg-surface-container-high text-on-surface-variant' },
  screening: { label: 'Sàng lọc', className: 'bg-info-bg text-info-text' },
  interview: { label: 'Phỏng vấn', className: 'bg-[#e4f0f6] text-[#005c91]' },
  offer: { label: 'Đề xuất', className: 'bg-warning-bg text-warning-text' },
  hired: { label: 'Đã tuyển', className: 'bg-success-bg text-success-text' },
  rejected: { label: 'Từ chối', className: 'bg-critical-bg text-critical-text' },
}

function CandidateMiniBadge({ stage }: { stage: CandidateStage }) {
  const { label, className } = STAGE_LABELS[stage]
  return (
    <span
      className={`px-2 py-0.5 rounded text-label-sm font-bold uppercase ${className}`}
    >
      {label}
    </span>
  )
}