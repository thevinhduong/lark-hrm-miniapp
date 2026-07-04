// ============================================
// Types for HRM (Hiring Management) Lark Block
// ============================================

export type RecruitmentStatus = 'approved' | 'pending' | 'rejected' | 'cc'

export type JobLevel = 'Junior' | 'Mid-level' | 'Senior' | 'Lead' | 'Manager' | 'Director'

export type WorkType = 'Onsite' | 'Remote' | 'Hybrid'

export interface WorkflowStep {
  id: string
  title: string
  person: string
  personAvatar?: string
  status: 'done' | 'active' | 'pending'
  statusLabel: string
  statusColor: 'success' | 'active' | 'outline'
  relativeTime?: string
  timestamp?: string
}

export interface JobOrder {
  id: string
  title: string
  department: string
  level: JobLevel
  count: number
  status: RecruitmentStatus
  requestCode?: string
  requesterName: string
  requesterAvatar: string
  requestDate: string
  requestTime?: string
  // Detail fields (Stitch layout)
  recruitmentReason?: string
  requiredSkills?: string[]
  workArrangement?: string
  budget?: string
  // Legacy fields (still used by list page)
  description?: string
  requirements?: string[]
  benefits?: string[]
  location?: string
  workType?: WorkType
  salaryMin?: number
  salaryMax?: number
  salaryCurrency?: string
  deadline?: string
  hiringManager?: {
    name: string
    title: string
    avatar: string
  }
  skills?: string[]
  workflow?: WorkflowStep[]
}

export type TabFilter = 'pending' | 'approved' | 'cc' | 'rejected'

export type SortOption = 'newest' | 'oldest' | 'department' | 'level'

export interface FilterState {
  tab: TabFilter
  searchQuery: string
  department: string
  sortBy: SortOption
}

// ============================================
// Candidate Types
// ============================================

export type CandidateStage =
  | 'applied'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'rejected'

export interface Candidate {
  id: string
  jobOrderId: string
  name: string
  avatar: string
  email: string
  phone: string
  currentTitle: string
  currentCompany: string
  yearsOfExperience: number
  stage: CandidateStage
  rating: number // 0-5
  appliedDate: string
  source: string // e.g., "LinkedIn", "Referral", "Lark Form"
  resumeUrl?: string
  notes?: string
  skills?: string[]
}

export type CandidateStageFilter = 'all' | CandidateStage

export interface CandidateStageConfig {
  key: CandidateStage | 'all'
  label: string
  color: 'success' | 'warning' | 'info' | 'secondary' | 'primary' | 'critical'
}

// ============================================
// Comment Types
// ============================================

export interface CommentMention {
  name: string
  userId?: string
}

export interface CommentAuthorUser {
  kind: 'user'
  name: string
  avatar: string
}

export interface CommentAuthorSystem {
  kind: 'system'
  /** System event type: 'auto_cc' = auto-CC'd people, etc. */
  eventType: 'auto_cc' | 'workflow' | 'status_change'
  /** System display name (e.g., "System", "Workflow") */
  name: string
}

export type CommentAuthor = CommentAuthorUser | CommentAuthorSystem

export interface Comment {
  id: string
  jobOrderId: string
  author: CommentAuthor
  /** Body content — can include plain text + @mentions */
  content: string
  /** Named mentions referenced in `content` (rendered as blue links) */
  mentions?: CommentMention[]
  /** List of user names who have read this (system events only) */
  readBy?: string[]
  timestamp: string // "02/07/2026 16:33" format
  relativeTime?: string // "2 ngày trước" optional
}