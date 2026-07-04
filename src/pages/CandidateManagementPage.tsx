import { useEffect, useState, useCallback, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type {
  Candidate,
  CandidateStage,
  CandidateStageFilter,
  JobOrder,
} from '@/types/recruitment'
import {
  fetchCandidates,
  fetchJobOrderById,
  summarizeCandidateStages,
} from '@/services/api'
import BackAppBar from '@/components/BackAppBar'
import LoadingSpinner from '@/components/LoadingSpinner'
import EmptyState from '@/components/EmptyState'
import CandidateStageBadge from '@/components/CandidateStageBadge'

const STAGE_TABS: { key: CandidateStageFilter; label: string }[] = [
  { key: 'all', label: 'Tất cả' },
  { key: 'applied', label: 'Ứng tuyển' },
  { key: 'screening', label: 'Sàng lọc' },
  { key: 'interview', label: 'Phỏng vấn' },
  { key: 'offer', label: 'Đề xuất' },
  { key: 'hired', label: 'Đã tuyển' },
  { key: 'rejected', label: 'Từ chối' },
]

const SORT_OPTIONS: { value: 'newest' | 'rating' | 'experience'; label: string }[] = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'rating', label: 'Đánh giá cao' },
  { value: 'experience', label: 'Kinh nghiệm' },
]

export default function CandidateManagementPage() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [jobOrder, setJobOrder] = useState<JobOrder | null>(null)
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [stageSummary, setStageSummary] = useState<Record<CandidateStage, number> | null>(null)
  const [stageFilter, setStageFilter] = useState<CandidateStageFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'experience'>('newest')
  const [sortOpen, setSortOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const sortRef = useRef<HTMLDivElement>(null)

  // Close sort dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [order, list, summary] = await Promise.all([
        fetchJobOrderById(id),
        fetchCandidates(id, stageFilter, searchQuery),
        Promise.resolve(summarizeCandidateStages(id)),
      ])
      setJobOrder(order)
      setCandidates(list)
      setStageSummary(summary)
    } finally {
      setLoading(false)
    }
  }, [id, stageFilter, searchQuery])

  useEffect(() => {
    load()
  }, [load])

  // Apply sort client-side
  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'experience') return b.yearsOfExperience - a.yearsOfExperience
    // newest (default)
    const [db, mb, yb] = b.appliedDate.split('/').map(Number)
    const [da, ma, ya] = a.appliedDate.split('/').map(Number)
    return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime()
  })

  const totalAll = stageSummary
    ? Object.values(stageSummary).reduce((a, b) => a + b, 0)
    : 0

  const sortLabel = SORT_OPTIONS.find(s => s.value === sortBy)?.label ?? 'Mới nhất'

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <BackAppBar
        title={jobOrder ? `Ứng viên · ${jobOrder.title}` : 'Quản lý ứng viên'}
        onBack={() => navigate(`/recruitment/${id}`)}
        rightAction={{
          icon: 'person_add',
          label: 'Thêm ứng viên',
          onClick: () => {
            // Hook for future "add candidate" flow
            alert('Tính năng thêm ứng viên sẽ được phát triển')
          },
        }}
      />

      <main className="flex-1 pt-14 pb-8 overflow-y-auto">
        {/* ===== Stats summary ===== */}
        {stageSummary && (
          <section className="px-margin-mobile mt-4">
            <div className="grid grid-cols-4 gap-2">
              <SummaryStat label="Tổng" count={totalAll} accent="primary" />
              <SummaryStat label="Phỏng vấn" count={stageSummary.interview} accent="warning" />
              <SummaryStat label="Đề xuất" count={stageSummary.offer} accent="tertiary" />
              <SummaryStat label="Đã tuyển" count={stageSummary.hired} accent="success" />
            </div>
          </section>
        )}

        {/* ===== Search ===== */}
        <section className="px-margin-mobile mt-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline text-[20px]">search</span>
            </div>
            <input
              type="text"
              className="input-polaris w-full h-10 pl-10 pr-3"
              placeholder="Tìm theo tên, vị trí, công ty, kỹ năng..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* ===== Stage filter tabs ===== */}
        <section className="px-margin-mobile mt-3">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {STAGE_TABS.map(({ key, label }) => {
              const count =
                key === 'all'
                  ? totalAll
                  : stageSummary?.[key as CandidateStage] ?? 0
              const isActive = stageFilter === key
              return (
                <button
                  key={key}
                  onClick={() => setStageFilter(key)}
                  className={`px-3 py-1.5 rounded-full text-body-md transition-all flex-shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-secondary text-on-secondary font-semibold shadow-sm'
                      : 'bg-surface-container text-on-surface-variant font-medium hover:bg-surface-container-high'
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`text-label-sm font-semibold ${
                      isActive ? 'text-on-secondary/80' : 'text-outline'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* ===== Sort dropdown ===== */}
        <section className="px-margin-mobile mt-3 flex items-center justify-between">
          <p className="text-label-md text-on-surface-variant">
            {sortedCandidates.length} ứng viên
          </p>
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-1 text-body-md text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">sort</span>
              <span>{sortLabel}</span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-polaris-lg z-30 min-w-[160px]">
                {SORT_OPTIONS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => {
                      setSortBy(value)
                      setSortOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-body-md hover:bg-surface-container-high transition-colors ${
                      value === sortBy ? 'text-secondary font-semibold' : 'text-on-surface'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ===== Candidate list ===== */}
        <section className="px-margin-mobile mt-2 space-y-3">
          {loading ? (
            <LoadingSpinner />
          ) : sortedCandidates.length === 0 ? (
            <EmptyState />
          ) : (
            sortedCandidates.map(c => <CandidateCard key={c.id} candidate={c} />)
          )}
        </section>
      </main>
    </div>
  )
}

// ============================================
// Sub-components
// ============================================

function SummaryStat({
  label,
  count,
  accent,
}: {
  label: string
  count: number
  accent: 'primary' | 'warning' | 'tertiary' | 'success'
}) {
  const accentMap: Record<typeof accent, string> = {
    primary: 'text-on-surface',
    warning: 'text-warning-text',
    tertiary: 'text-tertiary',
    success: 'text-success-text',
  }
  return (
    <div className="card-polaris p-2 text-center">
      <p className={`text-headline-lg font-bold leading-none ${accentMap[accent]}`}>{count}</p>
      <p className="text-label-sm text-on-surface-variant mt-1">{label}</p>
    </div>
  )
}

function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <div className="card-polaris p-3 active:scale-[0.99] transition-transform cursor-pointer">
      {/* Top row: avatar + name + stage */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30 flex-shrink-0 bg-surface-container-high">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-body-lg font-semibold text-on-surface truncate">
                {candidate.name}
              </p>
              <p className="text-label-sm text-on-surface-variant truncate">
                {candidate.currentTitle}
              </p>
              <p className="text-label-sm text-on-surface-variant truncate">
                {candidate.currentCompany}
              </p>
            </div>
            <CandidateStageBadge stage={candidate.stage} />
          </div>
        </div>
      </div>

      {/* Skills */}
      {candidate.skills && candidate.skills.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {candidate.skills.slice(0, 4).map(skill => (
            <span
              key={skill}
              className="px-1.5 py-0.5 bg-surface-container text-on-surface-variant text-label-sm rounded"
            >
              {skill}
            </span>
          ))}
          {candidate.skills.length > 4 && (
            <span className="px-1.5 py-0.5 text-label-sm text-outline">
              +{candidate.skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Bottom row: meta */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-surface-container-high">
        <div className="flex items-center gap-3 text-label-sm text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">work_history</span>
            {candidate.yearsOfExperience} năm KN
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">event</span>
            {candidate.appliedDate}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">source</span>
            {candidate.source}
          </span>
        </div>
        {candidate.rating > 0 && <RatingStars rating={candidate.rating} />}
      </div>
    </div>
  )
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => {
        const filled = i <= Math.floor(rating)
        const half = !filled && i - 0.5 <= rating
        return (
          <span
            key={i}
            className={`material-symbols-outlined text-[16px] ${
              filled || half ? 'text-warning-icon material-symbols-filled' : 'text-outline'
            }`}
            style={{ fontVariationSettings: `'FILL' ${filled || half ? 1 : 0}` }}
          >
            star
          </span>
        )
      })}
      <span className="text-label-sm text-on-surface-variant ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}