import { useAuth } from '@/lib/auth'
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import DashboardShell from '@/components/DashboardShell';
import FeedbackEmptyState from '@/components/FeedbackEmptyState';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';
import FeedbackTableSkeleton from '@/components/FeedbackTableSkeleton';

export default function AllFeeback() {
	const { user } = useAuth();
	const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher)

	if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <FeedbackTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data?.feedback?.length ? (
        <FeedbackTable feedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
}
