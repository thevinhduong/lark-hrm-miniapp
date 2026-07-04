import { useState, useRef, useEffect } from 'react'
import type { TabFilter, SortOption } from '@/types/recruitment'
import { departments } from '@/services/mockData'

interface SearchFilterSectionProps {
  tab: TabFilter
  searchQuery: string
  department: string
  sortBy: SortOption
  onTabChange: (tab: TabFilter) => void
  onSearchChange: (query: string) => void
  onDepartmentChange: (dept: string) => void
  onSortChange: (sort: SortOption) => void
}

const TABS: { key: TabFilter; label: string }[] = [
  { key: 'pending', label: 'Đang xử lý' },
  { key: 'approved', label: 'Đã duyệt' },
  { key: 'cc', label: 'CC cho tôi (3)' },
  { key: 'rejected', label: 'Đã từ chối' },
]

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'oldest', label: 'Cũ nhất' },
  { value: 'department', label: 'Phòng ban' },
  { value: 'level', label: 'Cấp bậc' },
]

export default function SearchFilterSection({
  tab,
  searchQuery,
  department,
  sortBy,
  onTabChange,
  onSearchChange,
  onDepartmentChange,
  onSortChange,
}: SearchFilterSectionProps) {
  const [deptOpen, setDeptOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const deptRef = useRef<HTMLDivElement>(null)
  const sortRef = useRef<HTMLDivElement>(null)

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (deptRef.current && !deptRef.current.contains(event.target as Node)) {
        setDeptOpen(false)
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const sortLabel = SORT_OPTIONS.find(s => s.value === sortBy)?.label ?? 'Mới nhất'

  return (
    <section className="mt-4 space-y-space-400">
      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-outline text-[20px]">search</span>
        </div>
        <input
          type="text"
          className="w-full h-10 pl-10 pr-10 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:border-secondary transition-all text-body-md placeholder:text-outline"
          placeholder="Tìm kiếm theo vị trí, người yêu cầu..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <span className="material-symbols-outlined text-outline cursor-pointer text-[20px]">tune</span>
        </div>
      </div>

      {/* Horizontal Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={`px-4 py-2 rounded-lg text-body-md transition-all flex-shrink-0 ${
              tab === key
                ? 'bg-secondary text-on-secondary font-semibold shadow-sm'
                : 'text-on-surface-variant font-medium hover:bg-surface-container-high'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Dropdown Filters */}
      <div className="flex gap-space-200">
        {/* Department Dropdown */}
        <div className="flex-1 relative" ref={deptRef}>
          <button
            onClick={() => { setDeptOpen(!deptOpen); setSortOpen(false) }}
            className="w-full flex items-center justify-between px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md hover:bg-surface-container-low transition-colors"
          >
            <span className="truncate">{department}</span>
            <span className="material-symbols-outlined text-outline text-[18px] ml-1">expand_more</span>
          </button>
          {deptOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-polaris-lg z-30 max-h-48 overflow-y-auto">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => { onDepartmentChange(dept); setDeptOpen(false) }}
                  className={`w-full text-left px-3 py-2 text-body-md hover:bg-surface-container-high transition-colors ${
                    dept === department ? 'text-secondary font-semibold' : 'text-on-surface'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex-1 relative" ref={sortRef}>
          <button
            onClick={() => { setSortOpen(!sortOpen); setDeptOpen(false) }}
            className="w-full flex items-center justify-between px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-md hover:bg-surface-container-low transition-colors"
          >
            <span>{sortLabel}</span>
            <span className="material-symbols-outlined text-outline text-[18px] ml-1">expand_more</span>
          </button>
          {sortOpen && (
            <div className="absolute top-full right-0 left-0 mt-1 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-polaris-lg z-30">
              {SORT_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => { onSortChange(value); setSortOpen(false) }}
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
      </div>
    </section>
  )
}
