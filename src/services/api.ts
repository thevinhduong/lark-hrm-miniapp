import type {
  JobOrder,
  TabFilter,
  SortOption,
  Candidate,
  CandidateStage,
  Comment,
} from '@/types/recruitment'
import { mockJobOrders, mockCandidates, mockComments } from './mockData'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Fetch job orders filtered by tab and sorted
 * In production, this would call the Lark Block SDK request API
 * or a backend endpoint
 */
export async function fetchJobOrders(
  tab: TabFilter,
  sortBy: SortOption = 'newest',
  searchQuery = '',
  department = 'Tất cả phòng ban',
): Promise<JobOrder[]> {
  await delay(300)

  let orders = [...mockJobOrders]

  // Filter by tab/status
  orders = orders.filter(order => order.status === tab)

  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    orders = orders.filter(
      order =>
        order.title.toLowerCase().includes(query) ||
        order.requesterName.toLowerCase().includes(query) ||
        order.department.toLowerCase().includes(query),
    )
  }

  // Filter by department
  if (department !== 'Tất cả phòng ban') {
    orders = orders.filter(order => order.department === department)
  }

  // Sort
  switch (sortBy) {
    case 'oldest':
      orders.sort((a, b) => {
        const [da, ma, ya] = a.requestDate.split('/').map(Number)
        const [db, mb, yb] = b.requestDate.split('/').map(Number)
        return new Date(ya, ma - 1, da).getTime() - new Date(yb, mb - 1, db).getTime()
      })
      break
    case 'department':
      orders.sort((a, b) => a.department.localeCompare(b.department))
      break
    case 'level': {
      const levelOrder: Record<string, number> = { Junior: 0, 'Mid-level': 1, Senior: 2, Lead: 3, Manager: 4, Director: 5 }
      orders.sort((a, b) => levelOrder[a.level] - levelOrder[b.level])
      break
    }
    case 'newest':
    default:
      orders.sort((a, b) => {
        const [db, mb, yb] = b.requestDate.split('/').map(Number)
        const [da, ma, ya] = a.requestDate.split('/').map(Number)
        return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime()
      })
  }

  return orders
}

/**
 * Fetch a single job order by id (with full detail)
 */
export async function fetchJobOrderById(id: string): Promise<JobOrder | null> {
  await delay(250)
  return mockJobOrders.find(order => order.id === id) ?? null
}

/**
 * Fetch all candidates for a job order, optionally filtered by stage
 */
export async function fetchCandidates(
  jobOrderId: string,
  stage?: CandidateStage | 'all',
  searchQuery = '',
): Promise<Candidate[]> {
  await delay(300)

  let candidates = mockCandidates.filter(c => c.jobOrderId === jobOrderId)

  if (stage && stage !== 'all') {
    candidates = candidates.filter(c => c.stage === stage)
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase()
    candidates = candidates.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.currentTitle.toLowerCase().includes(q) ||
        c.currentCompany.toLowerCase().includes(q) ||
        c.skills?.some(s => s.toLowerCase().includes(q)),
    )
  }

  // Sort by appliedDate desc
  candidates.sort((a, b) => {
    const [db, mb, yb] = b.appliedDate.split('/').map(Number)
    const [da, ma, ya] = a.appliedDate.split('/').map(Number)
    return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime()
  })

  return candidates
}

/**
 * Aggregate stage counts for a job order (for the candidate management page header)
 */
export interface CandidateStageSummary extends Record<CandidateStage, number> {
  total: number
}

export function summarizeCandidateStages(
  jobOrderId: string,
): CandidateStageSummary {
  const candidates = mockCandidates.filter(c => c.jobOrderId === jobOrderId)
  const summary: CandidateStageSummary = {
    applied: 0,
    screening: 0,
    interview: 0,
    offer: 0,
    hired: 0,
    rejected: 0,
    total: 0,
  }
  for (const c of candidates) {
    summary[c.stage]++
    summary.total++
  }
  return summary
}

/**
 * Fetch comments for a job order, sorted by timestamp desc.
 * In production, would query the backend; here it's local mock.
 */
export async function fetchComments(jobOrderId: string): Promise<Comment[]> {
  await delay(200)
  return mockComments
    .filter(c => c.jobOrderId === jobOrderId)
    .sort((a, b) => {
      const [db, mb, yb, hb, minb] = (b.timestamp.match(/\d+/g) || []).map(Number)
      const [da, ma, ya, ha, mina] = (a.timestamp.match(/\d+/g) || []).map(Number)
      return new Date(yb, mb - 1, db, hb || 0, minb || 0).getTime() -
             new Date(ya, ma - 1, da, ha || 0, mina || 0).getTime()
    })
}

/**
 * Add a new user comment to a job order. Returns the created comment.
 * In production, would POST to backend; here it's local in-memory.
 */
export async function addComment(
  jobOrderId: string,
  content: string,
  author: { name: string; avatar: string },
): Promise<Comment> {
  await delay(150)
  const now = new Date()
  const dd = String(now.getDate()).padStart(2, '0')
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const yyyy = now.getFullYear()
  const hh = String(now.getHours()).padStart(2, '0')
  const min = String(now.getMinutes()).padStart(2, '0')
  const comment: Comment = {
    id: `cm-${Date.now()}`,
    jobOrderId,
    author: { kind: 'user', name: author.name, avatar: author.avatar },
    content,
    timestamp: `${dd}/${mm}/${yyyy} ${hh}:${min}`,
  }
  mockComments.push(comment)
  return comment
}

/**
 * Lark Block SDK request wrapper
 * In production, use this to call Lark's server API
 */
export async function larkRequest<T = unknown>(config: {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: Record<string, unknown>
}): Promise<T> {
  // In production:
  // return window.lark?.jssdk.request(config) as Promise<T>
  //
  // For development, return mock data
  console.log('[LarkRequest]', config)
  return Promise.resolve({} as T)
}