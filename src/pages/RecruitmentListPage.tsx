import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { TabFilter, SortOption, JobOrder } from '@/types/recruitment'
import { fetchJobOrders } from '@/services/api'
import TopAppBar from '@/components/TopAppBar'
import SearchFilterSection from '@/components/SearchFilterSection'
import JobOrderCard from '@/components/JobOrderCard'
import BottomNav from '@/components/BottomNav'
import LoadingSpinner from '@/components/LoadingSpinner'
import EmptyState from '@/components/EmptyState'

export default function RecruitmentListPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<TabFilter>('approved')
  const [searchQuery, setSearchQuery] = useState('')
  const [department, setDepartment] = useState('Tất cả phòng ban')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [jobOrders, setJobOrders] = useState<JobOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [bottomNavTab, setBottomNavTab] = useState('Tuyển dụng')

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchJobOrders(tab, sortBy, searchQuery, department)
      setJobOrders(data)
    } finally {
      setLoading(false)
    }
  }, [tab, sortBy, searchQuery, department])

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      {/* Top App Bar */}
      <TopAppBar />

      {/* Main Content */}
      <main className="flex-1 mt-14 mb-20 overflow-y-auto px-margin-mobile">
        {/* Search & Filters */}
        <SearchFilterSection
          tab={tab}
          searchQuery={searchQuery}
          department={department}
          sortBy={sortBy}
          onTabChange={setTab}
          onSearchChange={setSearchQuery}
          onDepartmentChange={setDepartment}
          onSortChange={setSortBy}
        />

        {/* Job Orders List */}
        <section className="mt-space-800 space-y-space-400">
          {loading ? (
            <LoadingSpinner />
          ) : jobOrders.length === 0 ? (
            <EmptyState />
          ) : (
            jobOrders.map(order => (
              <JobOrderCard
                key={order.id}
                jobOrder={order}
                onClick={id => navigate(`/recruitment/${id}`)}
              />
            ))
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={bottomNavTab} onTabChange={setBottomNavTab} />
    </div>
  )
}
