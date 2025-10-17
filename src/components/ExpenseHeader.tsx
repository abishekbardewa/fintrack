import React, { memo } from 'react';
import { formatCurrency } from '../utils';
import { useExpenseContext } from './context/ExpenseProvider';
import StatCard from './common/StatCard';
import InfoCard from './common/InfoCard';
import { SkeletonLoader } from './common';

const ExpenseHeader: React.FC = () => {
	const { loading, totalAmount, totalAmountToday, topSpentCategory, LowestSpentCategory, mostFrequent, leastFrequent } = useExpenseContext();
	const monthName = new Date().toLocaleString('default', { month: 'long' });

	return (
		<div>
			{loading ? (
				<>
					{/* Main Stats Skeleton */}
					<div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
						<div className="bg-card p-6 rounded-lg border border-border">
							<SkeletonLoader variant="text" className="mb-2" width="60%" />
							<SkeletonLoader variant="text" className="text-2xl font-semibold" width="40%" />
						</div>
						<div className="bg-card p-6 rounded-lg border border-border">
							<SkeletonLoader variant="text" className="mb-2" width="50%" />
							<SkeletonLoader variant="text" className="text-2xl font-semibold" width="35%" />
						</div>
					</div>

					{/* Info Cards Skeleton */}
					<div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
						{Array.from({ length: 4 }).map((_, index) => (
							<div key={index} className="bg-card p-4 rounded-lg border border-border">
								<SkeletonLoader variant="text" className="mb-3" width="70%" />
								<div className="space-y-2">
									<SkeletonLoader variant="text" width="90%" />
									<SkeletonLoader variant="text" width="80%" />
									<SkeletonLoader variant="text" width="85%" />
								</div>
							</div>
						))}
					</div>
				</>
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

export default memo(ExpenseHeader);
