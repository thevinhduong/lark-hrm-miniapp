import { useEffect, useState, useCallback, useRef, KeyboardEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type {
  JobOrder,
  Candidate,
  CandidateStage,
  WorkflowStep,
  Comment,
  CommentAuthor,
  CommentMention,
} from '@/types/recruitment'
import {
  fetchJobOrderById,
  fetchCandidates,
  summarizeCandidateStages,
  fetchComments,
  addComment,
  type CandidateStageSummary,
} from '@/services/api'
import BackAppBar from '@/components/BackAppBar'
import StatusBadge from '@/components/StatusBadge'
import LoadingSpinner from '@/components/LoadingSpinner'
import BottomNav from '@/components/BottomNav'

// Current user (mock — would come from auth context in production)
const CURRENT_USER = {
  name: 'Bạn (You)',
  avatar: 'https://ui-avatars.com/api/?name=You&background=0055c7&color=fff&bold=true&size=128',
}

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
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [bottomNavTab, setBottomNavTab] = useState('comment')
  const [requestCopied, setRequestCopied] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [order, candidates, list] = await Promise.all([
        fetchJobOrderById(id),
        fetchCandidates(id),
        fetchComments(id),
      ])
      setJobOrder(order)
      setRelatedCandidates(candidates.slice(0, 3))
      setCandidateSummary(summarizeCandidateStages(id))
      setComments(list)
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

  const handleAddComment = async (content: string) => {
    if (!content.trim() || !jobOrder) return
    const newComment = await addComment(id, content.trim(), CURRENT_USER)
    setComments(prev => [newComment, ...prev])
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

          {/* ===== Thông tin yêu cầu ===== */}
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

          {/* ===== Quy trình phê duyệt ===== */}
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

          {/* ===== Ứng viên liên quan ===== */}
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
                      <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-body-md font-bold text-on-surface truncate">
                        {c.name}
                      </p>
                      <p className="text-label-sm text-on-surface-variant truncate">{c.email}</p>
                    </div>
                    <CandidateMiniBadge stage={c.stage} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ===== Comments section ===== */}
          <CommentsSection comments={comments} onAddComment={handleAddComment} />
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
// Comments Section (Lark-style with system activity)
// ============================================

function CommentsSection({
  comments,
  onAddComment,
}: {
  comments: Comment[]
  onAddComment: (content: string) => Promise<void>
}) {
  const [draft, setDraft] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Show all comments (sort: system events first, then newest)
  const sorted = [...comments].sort((a, b) => {
    if (a.author.kind === 'system' && b.author.kind !== 'system') return -1
    if (a.author.kind !== 'system' && b.author.kind === 'system') return 1
    // Both same kind: sort by timestamp desc (newest first)
    const parseTs = (ts: string) => {
      const [d, m, rest] = ts.split('/')
      const [y, hh, min] = rest.split(/\s|:/)
      return new Date(+y, +m - 1, +d, +(hh || 0), +(min || 0)).getTime()
    }
    return parseTs(b.timestamp) - parseTs(a.timestamp)
  })

  const userCommentCount = comments.filter(c => c.author.kind === 'user').length

  const handleSubmit = async () => {
    const text = draft.trim()
    if (!text || submitting) return
    setSubmitting(true)
    try {
      await onAddComment(text)
      setDraft('')
      inputRef.current?.focus()
    } finally {
      setSubmitting(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd/Ctrl+Enter to submit
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <section className="mt-4">
      {/* Section header with vertical accent bar (Lark style) */}
      <div className="flex items-center gap-3 mb-3">
        <span className="block w-1 h-5 bg-on-surface rounded-full" aria-hidden />
        <h3 className="text-headline-2xl font-bold text-on-surface">
          Comments ({userCommentCount})
        </h3>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {sorted.length === 0 ? (
          <div className="card-polaris py-8 px-4 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 mb-4 flex items-center justify-center bg-surface-container rounded-full">
              <span className="material-symbols-outlined text-[32px] text-outline">forum</span>
            </div>
            <p className="text-headline-md font-bold text-on-surface">Chưa có bình luận</p>
            <p className="text-body-md text-on-surface-variant mt-1 mb-6">
              Hãy bắt đầu thảo luận với nhóm tuyển dụng
            </p>
          </div>
        ) : (
          sorted.map(c => <CommentItem key={c.id} comment={c} />)
        )}
      </div>

      {/* Comment input */}
      <div className="mt-4 card-polaris p-3 flex items-end gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-surface-container-high border border-outline-variant/20">
          <img
            src={CURRENT_USER.avatar}
            alt={CURRENT_USER.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <textarea
            ref={inputRef}
            className="w-full bg-transparent border-none outline-none resize-none text-body-md text-on-surface placeholder:text-outline leading-snug"
            placeholder="Bạn có thể @ đề cập thành viên liên quan"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            maxLength={1000}
          />
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => alert('Tính năng đính kèm đang phát triển')}
            className="p-2 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container-low transition-colors"
            aria-label="Đính kèm file"
          >
            <span className="material-symbols-outlined text-[20px]">attach_file</span>
          </button>
          <button
            onClick={() => alert('Tính năng ảnh đang phát triển')}
            className="p-2 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container-low transition-colors"
            aria-label="Gửi ảnh"
          >
            <span className="material-symbols-outlined text-[20px]">image</span>
          </button>
          <button
            onClick={handleSubmit}
            disabled={!draft.trim() || submitting}
            className="p-2 bg-secondary text-on-secondary rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all"
            aria-label="Gửi bình luận"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
      </div>
    </section>
  )
}

function CommentItem({ comment }: { comment: Comment }) {
  if (comment.author.kind === 'system') {
    return <SystemCommentItem comment={comment} />
  }
  return <UserCommentItem comment={comment} />
}

function UserCommentItem({ comment }: { comment: Comment }) {
  const author = comment.author as Extract<CommentAuthor, { kind: 'user' }>
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-outline-variant/20 bg-surface-container-high">
        <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-body-md font-semibold text-on-surface">{author.name}</span>
          <span className="text-label-sm text-outline">{comment.timestamp}</span>
        </div>
        <p className="text-body-md text-on-surface mt-0.5 whitespace-pre-wrap break-words">
          {comment.content}
        </p>
      </div>
    </div>
  )
}

function SystemCommentItem({ comment }: { comment: Comment }) {
  const author = comment.author as Extract<CommentAuthor, { kind: 'system' }>
  const isAutoCC = author.eventType === 'auto_cc'
  return (
    <div className="flex gap-3">
      {/* System avatar — blue with robot icon */}
      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
        <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" }}>
          smart_toy
        </span>
      </div>
      <div className="flex-1 min-w-0">
        {/* Header: System name + "Auto CC'd" sub-label + right timestamp */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-body-md font-semibold text-on-surface">{author.name}</span>
          {isAutoCC && (
            <span className="text-label-sm text-on-surface-variant">Auto CC&apos;d</span>
          )}
        </div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            {/* Content with @mention highlighting */}
            <p className="text-body-md text-on-surface mt-0.5 leading-relaxed break-words">
              {renderContentWithMentions(comment.content, comment.mentions)}
            </p>
            {/* Read indicator */}
            {comment.readBy && comment.readBy.length > 0 && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="material-symbols-outlined text-outline text-[14px]">check_circle</span>
                <span className="text-label-sm text-on-surface-variant">
                  {comment.readBy.join(', ')} đã đọc
                </span>
              </div>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            {comment.relativeTime && (
              <p className="text-label-sm text-outline">{comment.relativeTime}</p>
            )}
            <p className="text-label-sm text-outline">{comment.timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function renderContentWithMentions(content: string, mentions?: CommentMention[]) {
  if (!mentions || mentions.length === 0) {
    return <>{content}</>
  }
  // Find and replace each mention name with a blue link
  const parts: (string | JSX.Element)[] = []
  let remaining = content
  let key = 0
  while (remaining.length > 0) {
    // Find earliest mention
    let earliestIdx = -1
    let earliestMention: CommentMention | null = null
    for (const m of mentions) {
      const idx = remaining.indexOf(m.name)
      if (idx !== -1 && (earliestIdx === -1 || idx < earliestIdx)) {
        earliestIdx = idx
        earliestMention = m
      }
    }
    if (earliestIdx === -1 || !earliestMention) {
      parts.push(remaining)
      break
    }
    if (earliestIdx > 0) {
      parts.push(remaining.slice(0, earliestIdx))
    }
    parts.push(
      <span key={`m-${key++}`} className="text-secondary font-medium cursor-pointer hover:underline">
        {earliestMention.name}
      </span>,
    )
    remaining = remaining.slice(earliestIdx + earliestMention.name.length)
  }
  return <>{parts}</>
}

// ============================================
// Other sub-components (unchanged from v2)
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