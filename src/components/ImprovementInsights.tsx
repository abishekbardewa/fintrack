import InsightList from './common/InsightList';
import { useExpenseContext } from './context/ExpenseProvider';

const ImprovementInsights: React.FC = () => {
	const { overallImprovement } = useExpenseContext();

	return <InsightList items={overallImprovement || []} emptyTitle="No Areas for Improvement" emptySubtitle="You're on track!" />;
};

export default ImprovementInsights;
