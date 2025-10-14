import { LuLoader2 } from 'react-icons/lu';
import { formatCurrency } from '../utils';
import { useExpenseContext } from './context/ExpenseProvider';
import StatCard from './common/StatCard';
import InfoCard from './common/InfoCard';

const ExpenseHeader: React.FC = () => {
	const { loading, totalAmount, totalAmountToday, topSpentCategory, LowestSpentCategory, mostFrequent, leastFrequent } = useExpenseContext();
	const monthName = new Date().toLocaleString('default', { month: 'long' });

	return (
		<div>
			{loading ? (
				<LuLoader2 className="w-6 h-6 text-primary animate-spin" />
			) : (
				<>
					{/* Main Stats */}
					<div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
						<StatCard label={`Total spent in ${monthName}`} value={formatCurrency(totalAmount)} />
						<StatCard label="Total spent today" value={formatCurrency(totalAmountToday)} />
					</div>

					{/* Info Cards */}
					<ul role="list" className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
						<InfoCard title="Highest spent" items={topSpentCategory} />
						<InfoCard title="Lowest spent" items={LowestSpentCategory} />
						<InfoCard title="Most frequent" items={mostFrequent} />
						<InfoCard title="Least frequent" items={leastFrequent} />
					</ul>
				</>
			)}
		</div>
	);
};

export default ExpenseHeader;
