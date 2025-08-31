// src/app/(dashboard)/layout.tsx
import { getSession } from '@/app/auth/actions'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await getSession()
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-bg">
        {children}
      </main>
    </div>
  )
}
