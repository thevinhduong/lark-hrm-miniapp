interface NavItem {
  key?: string
  icon: string
  iconFill?: boolean
  label: string
  active?: boolean
}

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  /** Optional tabs override. If omitted, defaults to 3-tab list-page nav. */
  tabs?: NavItem[]
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { key: 'request', icon: 'add_circle', label: 'Yêu cầu' },
  { key: 'recruit', icon: 'assignment_ind', iconFill: true, label: 'Tuyển dụng' },
  { key: 'report', icon: 'bar_chart', label: 'Báo cáo' },
]

export default function BottomNav({ activeTab, onTabChange, tabs }: BottomNavProps) {
  const items = tabs ?? DEFAULT_NAV_ITEMS

  return (
    <nav className="bg-surface-container-lowest fixed bottom-0 left-0 w-full z-50 flex justify-around items-stretch px-2 pt-1 pb-safe border-t border-outline-variant/30 shadow-lg">
      {items.map((item) => {
        const isActive = item.label === activeTab
        return (
          <button
            key={item.key ?? item.label}
            onClick={() => onTabChange(item.label)}
            className={`flex flex-col items-center justify-center py-2 px-2 hover:bg-surface-container rounded-lg transition-all active:scale-90 duration-200 flex-1 mt-1 ${
              isActive
                ? 'text-secondary font-bold bg-surface-container'
                : 'text-on-surface-variant'
            }`}
          >
            <span
              className={`material-symbols-outlined ${item.iconFill && isActive ? 'material-symbols-filled' : ''}`}
            >
              {item.icon}
            </span>
            <span className="text-label-sm mt-1">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}