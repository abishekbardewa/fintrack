import InsightList from './common/InsightList';
import { useExpenseContext } from './context/ExpenseProvider';

const MonthlyInsights: React.FC = () => {
	const { monthlyInsights } = useExpenseContext();

	return <InsightList items={monthlyInsights || []} emptyTitle="No expenses logged yet." emptySubtitle="Track spending for better insights." />;
};

export default MonthlyInsights;
