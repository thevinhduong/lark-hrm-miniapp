interface TopAppBarProps {
  title?: string
}

export default function TopAppBar({ title = 'Tuyển dụng' }: TopAppBarProps) {
  return (
    <header className="bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-margin-mobile h-14 w-full z-50 fixed top-0 left-0">
      <div className="flex items-center gap-space-400">
        <button
          className="hover:bg-surface-container-low transition-colors p-2 rounded-lg active:opacity-80 active:scale-95 transition-all duration-150"
          aria-label="Menu"
        >
          <span className="material-symbols-outlined text-on-surface">menu</span>
        </button>
        <h1 className="text-headline-lg font-bold text-on-surface">{title}</h1>
      </div>
      <div className="flex items-center">
        <button
          className="hover:bg-surface-container-low transition-colors p-2 rounded-lg active:opacity-80 active:scale-95 transition-all duration-150"
          aria-label="More options"
        >
          <span className="material-symbols-outlined text-on-surface">more_horiz</span>
        </button>
      </div>
    </header>
  )
}
