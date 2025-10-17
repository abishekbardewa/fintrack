import InsightList from './common/InsightList';
import { useExpenseContext } from './context/ExpenseProvider';

const WarningInsights: React.FC = () => {
	const { overallWarnings } = useExpenseContext();

	return <InsightList items={overallWarnings || []} emptyTitle="No Warnings Found" emptySubtitle="All good!" />;
};

export default WarningInsights;
