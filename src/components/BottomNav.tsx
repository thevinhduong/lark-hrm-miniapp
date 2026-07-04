interface NavItem {
  icon: string
  iconFill?: boolean
  label: string
  active?: boolean
}

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const NAV_ITEMS: NavItem[] = [
  { icon: 'add_circle', label: 'Yêu cầu' },
  { icon: 'assignment_ind', iconFill: true, label: 'Tuyển dụng' },
  { icon: 'bar_chart', label: 'Báo cáo' },
]

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="bg-surface-container-lowest fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-2 pb-safe border-t border-outline-variant shadow-sm">
      {NAV_ITEMS.map((item) => {
        const isActive = item.label === activeTab
        return (
          <button
            key={item.label}
            onClick={() => onTabChange(item.label)}
            className={`flex flex-col items-center justify-center py-2 px-3 hover:bg-surface-container rounded-lg transition-all active:scale-90 duration-200 ${
              isActive
                ? 'text-secondary font-bold'
                : 'text-on-surface-variant'
            }`}
          >
            <span
              className={`material-symbols-outlined mb-1 ${item.iconFill && isActive ? 'material-symbols-filled' : ''}`}
            >
              {item.icon}
            </span>
            <span className="text-label-sm">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
