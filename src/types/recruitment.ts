// ============================================
// Types for HRM (Hiring Management) Lark Block
// ============================================

export type RecruitmentStatus = 'approved' | 'pending' | 'rejected' | 'cc'

export type JobLevel = 'Junior' | 'Mid-level' | 'Senior' | 'Lead' | 'Manager' | 'Director'

export interface JobOrder {
  id: string
  title: string
  department: string
  level: JobLevel
  count: number
  status: RecruitmentStatus
  requesterName: string
  requesterAvatar: string
  requestDate: string
  description?: string
}

export type TabFilter = 'pending' | 'approved' | 'cc' | 'rejected'

export type SortOption = 'newest' | 'oldest' | 'department' | 'level'

export interface FilterState {
  tab: TabFilter
  searchQuery: string
  department: string
  sortBy: SortOption
}
