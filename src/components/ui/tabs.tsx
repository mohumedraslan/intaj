// src/components/ui/tabs.tsx
'use client'

import { createContext, useContext, useId, useMemo, useState, type ReactNode } from 'react'

type TabsContextValue = {
  value: string
  setValue: (v: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

export function Tabs({ defaultValue, children }: { defaultValue: string; children: ReactNode }) {
  const [value, setValue] = useState(defaultValue)
  const ctx = useMemo(() => ({ value, setValue }), [value])
  return <TabsContext.Provider value={ctx}>{children}</TabsContext.Provider>
}

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className ?? 'mb-4 flex gap-2 border-b'}>{children}</div>
}

export function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useContext(TabsContext)
  if (!ctx) return null
  const isActive = ctx.value === value
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={
        'px-3 py-2 text-sm transition-colors ' +
        (isActive ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground hover:text-foreground')
      }
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children }: { value: string; children: ReactNode }) {
  const id = useId()
  const ctx = useContext(TabsContext)
  if (!ctx) return null
  if (ctx.value !== value) return null
  return (
    <div key={id} className="pt-4">
      {children}
    </div>
  )
}


