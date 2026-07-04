import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { JobOrder, Candidate, CandidateStage } from '@/types/recruitment'
import { fetchJobOrderById, fetchCandidates, summarizeCandidateStages } from '@/services/api'
import BackAppBar from '@/components/BackAppBar'
import StatusBadge from '@/components/StatusBadge'
import LoadingSpinner from '@/components/LoadingSpinner'
import CandidateStageBadge from '@/components/CandidateStageBadge'

export default function RecruitmentDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [jobOrder, setJobOrder] = useState<JobOrder | null>(null)
  const [recentCandidates, setRecentCandidates] = useState<Candidate[]>([])
  const [stageSummary, setStageSummary] = useState<Record<CandidateStage, number> | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [order, candidates] = await Promise.all([
        fetchJobOrderById(id),
        fetchCandidates(id),
      ])
      setJobOrder(order)
      setRecentCandidates(candidates.slice(0, 3))
      setStageSummary(summarizeCandidateStages(id))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  if (loading) {
    return (
      <div className="bg-surface min-h-screen">
        <BackAppBar title="Chi tiết yêu cầu" onBack={() => navigate('/')} />
        <div className="pt-14">
          <LoadingSpinner />
        </div>
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

  const totalCandidates =
    stageSummary
      ? stageSummary.applied +
        stageSummary.screening +
        stageSummary.interview +
        stageSummary.offer +
        stageSummary.hired +
        stageSummary.rejected
      : recentCandidates.length

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <BackAppBar title="Chi tiết yêu cầu" onBack={() => navigate('/')} />

      <main className="flex-1 pt-14 pb-24 overflow-y-auto px-margin-mobile">
        {/* ===== Hero Block ===== */}
        <section className="card-polaris p-4 mt-4">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h2 className="text-headline-2xl font-bold text-on-surface flex-1 leading-tight">
              {jobOrder.title}
            </h2>
            <StatusBadge status={jobOrder.status} />
          </div>

          {/* Skill tags */}
          {jobOrder.skills && jobOrder.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {jobOrder.skills.map(skill => (
                <span
                  key={skill}
                  className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-label-sm rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Key facts grid */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-3 pt-3 border-t border-surface-container-high">
            <FactItem icon="apartment" label="Phòng ban" value={jobOrder.department} />
            <FactItem icon="trending_up" label="Cấp bậc" value={jobOrder.level} />
            <FactItem
              icon="group"
              label="Số lượng"
              value={`${jobOrder.count} người`}
            />
            <FactItem
              icon="location_on"
              label="Địa điểm"
              value={jobOrder.location ?? '—'}
            />
            <FactItem
              icon="work"
              label="Hình thức"
              value={jobOrder.workType ?? '—'}
            />
            <FactItem
              icon="payments"
              label="Mức lương"
              value={
                jobOrder.salaryMin && jobOrder.salaryMax
                  ? `${jobOrder.salaryMin}–${jobOrder.salaryMax} ${jobOrder.salaryCurrency}`
                  : 'Thỏa thuận'
              }
            />
            <FactItem
              icon="event"
              label="Hạn nộp"
              value={jobOrder.deadline ?? '—'}
            />
            <FactItem
              icon="schedule"
              label="Ngày tạo"
              value={jobOrder.requestDate}
            />
          </div>
        </section>

        {/* ===== Description ===== */}
        {jobOrder.description && (
          <Section title="Mô tả công việc" icon="description">
            <p className="text-body-md text-on-surface leading-relaxed whitespace-pre-line">
              {jobOrder.description}
            </p>
          </Section>
        )}

        {/* ===== Requirements ===== */}
        {jobOrder.requirements && jobOrder.requirements.length > 0 && (
          <Section title="Yêu cầu ứng viên" icon="checklist">
            <ul className="space-y-2">
              {jobOrder.requirements.map((req, i) => (
                <li key={i} className="flex gap-2 text-body-md text-on-surface leading-relaxed">
                  <span className="material-symbols-outlined text-success-icon text-[18px] flex-shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ===== Benefits ===== */}
        {jobOrder.benefits && jobOrder.benefits.length > 0 && (
          <Section title="Quyền lợi" icon="card_giftcard">
            <ul className="space-y-2">
              {jobOrder.benefits.map((benefit, i) => (
                <li key={i} className="flex gap-2 text-body-md text-on-surface leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-[18px] flex-shrink-0 mt-0.5">
                    star
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ===== Hiring Manager ===== */}
        {jobOrder.hiringManager && (
          <Section title="Hiring Manager" icon="supervisor_account">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30 flex-shrink-0 bg-surface-container-high">
                <img
                  src={jobOrder.hiringManager.avatar}
                  alt={jobOrder.hiringManager.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-body-md font-semibold text-on-surface truncate">
                  {jobOrder.hiringManager.name}
                </p>
                <p className="text-label-sm text-on-surface-variant truncate">
                  {jobOrder.hiringManager.title}
                </p>
              </div>
            </div>
          </Section>
        )}

        {/* ===== Requester ===== */}
        <Section title="Người yêu cầu" icon="person">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30 flex-shrink-0 bg-surface-container-high">
              <img
                src={jobOrder.requesterAvatar}
                alt={jobOrder.requesterName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-body-md font-semibold text-on-surface truncate">
                {jobOrder.requesterName}
              </p>
              <p className="text-label-sm text-on-surface-variant">
                Đã tạo yêu cầu ngày {jobOrder.requestDate}
              </p>
            </div>
          </div>
        </Section>

        {/* ===== Candidate Pipeline Snapshot ===== */}
        <section className="card-polaris p-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-surface">groups</span>
              <h3 className="text-headline-md font-bold text-on-surface">
                Quản lý ứng viên
              </h3>
            </div>
            <span className="text-label-sm text-on-surface-variant">
              {totalCandidates} ứng viên
            </span>
          </div>

          {/* Stage summary chips */}
          {stageSummary && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              <StageChip
                label="Ứng tuyển"
                count={stageSummary.applied + stageSummary.screening}
                color="info"
              />
              <StageChip
                label="Phỏng vấn"
                count={stageSummary.interview}
                color="warning"
              />
              <StageChip
                label="Đề xuất"
                count={stageSummary.offer}
                color="tertiary"
              />
              <StageChip
                label="Đã tuyển"
                count={stageSummary.hired}
                color="success"
              />
              <StageChip
                label="Từ chối"
                count={stageSummary.rejected}
                color="critical"
              />
            </div>
          )}

          {/* Recent candidates preview */}
          {recentCandidates.length > 0 && (
            <div className="space-y-2 mb-3">
              <p className="text-label-sm text-on-surface-variant font-medium">
                Ứng viên mới nhất
              </p>
              {recentCandidates.map(c => (
                <div
                  key={c.id}
                  className="flex items-center gap-2 py-1.5 border-b border-surface-container-high last:border-b-0"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30 flex-shrink-0 bg-surface-container-high">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md font-medium text-on-surface truncate">
                      {c.name}
                    </p>
                    <p className="text-label-sm text-on-surface-variant truncate">
                      {c.currentTitle} · {c.currentCompany}
                    </p>
                  </div>
                  <CandidateStageBadge stage={c.stage} />
                </div>
              ))}
            </div>
          )}

          {/* CTA button */}
          <button
            onClick={() => navigate(`/recruitment/${id}/candidates`)}
            className="btn-primary w-full h-11 flex items-center justify-center gap-2 mt-2"
          >
            <span className="material-symbols-outlined text-[20px]">groups</span>
            <span>Xem tất cả ứng viên</span>
          </button>
        </section>
      </main>
    </div>
  )
}

// ============================================
// Sub-components
// ============================================

function Section({
  title,
  icon,
  children,
}: {
  title: string
  icon: string
  children: React.ReactNode
}) {
  return (
    <section className="card-polaris p-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="material-symbols-outlined text-on-surface-variant">{icon}</span>
        <h3 className="text-headline-md font-bold text-on-surface">{title}</h3>
      </div>
      {children}
    </section>
  )
}

function FactItem({
  icon,
  label,
  value,
}: {
  icon: string
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-2 min-w-0">
      <span className="material-symbols-outlined text-outline text-[18px] flex-shrink-0 mt-0.5">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-label-sm text-on-surface-variant">{label}</p>
        <p className="text-body-md font-semibold text-on-surface truncate">{value}</p>
      </div>
    </div>
  )
}

function StageChip({
  label,
  count,
  color,
}: {
  label: string
  count: number
  color: 'info' | 'warning' | 'tertiary' | 'success' | 'critical'
}) {
  const colorMap: Record<typeof color, string> = {
    info: 'bg-info-bg text-info-text',
    warning: 'bg-warning-bg text-warning-text',
    tertiary: 'bg-tertiary-container/20 text-tertiary',
    success: 'bg-success-bg text-success-text',
    critical: 'bg-critical-bg text-critical-text',
  }
  return (
    <div className={`${colorMap[color]} rounded-lg p-2 text-center`}>
      <p className="text-headline-lg font-bold leading-none">{count}</p>
      <p className="text-label-sm mt-0.5 font-medium">{label}</p>
    </div>
  )
}