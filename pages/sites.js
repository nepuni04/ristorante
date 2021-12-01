import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { useAuth } from '@/lib/auth'
import SiteTable from '@/components/SiteTable'
import EmptyState from '@/components/EmptyState'
import DashboardShell from '@/components/DashboardShell'
import SiteTableHeader from '@/components/SiteTableHeader'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'

export default function sites() {
  const { user } = useAuth();
	const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher)
  const sites = data?.sites

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {sites && sites.length ? <SiteTable sites={sites} /> : <EmptyState />}
    </DashboardShell>
  )
}
