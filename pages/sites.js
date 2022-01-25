import useSWR from 'swr'
import fetcher from '@/utils/fetcher'
import { useAuth } from '@/lib/auth'
import SiteTable from '@/components/SiteTable'
import SiteEmptyState from '@/components/SiteEmptyState'
import DashboardShell from '@/components/DashboardShell'
import SiteTableHeader from '@/components/SiteTableHeader'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'

export default function Sites() {
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
      <SiteTableHeader />
      {sites && sites.length ? <SiteTable sites={sites} /> : <SiteEmptyState />}
    </DashboardShell>
  )
}
