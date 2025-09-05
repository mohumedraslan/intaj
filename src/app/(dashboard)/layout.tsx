// src/app/(dashboard)/layout.tsx
import { getSession } from '@/app/auth/actions'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await getSession()
  if (!user) {
    redirect('/login')
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <DashboardHeader user={user} />
        <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {children}
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}
