import type { JobOrder, TabFilter, SortOption } from '@/types/recruitment'
import { mockJobOrders } from './mockData'

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
