import { Bar } from 'react-chartjs-2';
import Card from '../common/Card';
import EmptyState from '../common/EmptyState';

const TotalSpentChart: React.FC<{ data: any }> = ({ data }) => (
	<Card padding="lg" className="h-[500px]">
		{data?.labels.length > 0 ? (
			<Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} style={{ height: '100%', width: '100%' }} />
		) : (
			<EmptyState title="No insights available." subtitle="Add your expenses to visualize your spending patterns and trends." />
		)}
	</Card>
);

export default TotalSpentChart;
