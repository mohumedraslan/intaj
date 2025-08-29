// src/app/(dashboard)/layout.tsx
import { getSession } from '@/app/auth/actions'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

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
    <div className="min-h-screen">
      <DashboardHeader user={user} />
      <main className="mx-auto max-w-6xl p-6">
        {children}
      </main>
    </div>
  )
}
