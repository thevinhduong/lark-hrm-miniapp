interface BackAppBarProps {
  title: string
  onBack: () => void
  rightAction?: {
    icon: string
    onClick: () => void
    label: string
  }
}

export default function BackAppBar({ title, onBack, rightAction }: BackAppBarProps) {
  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-margin-mobile h-14 w-full z-50 fixed top-0 left-0">
      <div className="flex items-center gap-space-200 min-w-0 flex-1">
        <button
          onClick={onBack}
          className="hover:bg-surface-container-low transition-colors p-2 -ml-2 rounded-lg active:opacity-80 active:scale-95 transition-all duration-150 flex-shrink-0"
          aria-label="Quay lại"
        >
          <span className="material-symbols-outlined text-on-surface">arrow_back</span>
        </button>
        <h1 className="text-headline-lg font-bold text-on-surface truncate">{title}</h1>
      </div>
      {rightAction && (
        <div className="flex items-center flex-shrink-0">
          <button
            onClick={rightAction.onClick}
            className="hover:bg-surface-container-low transition-colors p-2 rounded-lg active:opacity-80 active:scale-95 transition-all duration-150"
            aria-label={rightAction.label}
          >
            <span className="material-symbols-outlined text-on-surface">{rightAction.icon}</span>
          </button>
        </div>
      )}
    </header>
  )
}