import { useEffect, useState } from 'react';
import SectionHeader from './common/SectionHeader';
import { useExpenseContext } from './context/ExpenseProvider';
import MonthlyInsights from './MonthlyInsights';
import ImprovementInsights from './ImprovementInsights';
import WarningInsights from './WarningsInsight';
import TabButton from './common/TabButton';
import { SkeletonLoader } from './common';

const Insights: React.FC = () => {
	const { loading } = useExpenseContext();

	const [selectedTab, setSelectedTab] = useState<string>('insights');

	if (loading) {
		return (
			<div>
				<SectionHeader title="Key Insights" />
				<div className="h-[500px] px-5 py-4 pb-2 bg-card border border-border  rounded-[16px]">
					{/* Tab skeleton */}
					<div className="flex mb-4">
						{Array.from({ length: 3 }).map((_, index) => (
							<SkeletonLoader key={index} variant="text" width="80px" height="32px" className="mr-2 rounded-md" />
						))}
					</div>

					{/* Content skeleton */}
					<div className="space-y-3">
						{Array.from({ length: 8 }).map((_, index) => (
							<div key={index} className="flex items-center justify-between">
								<SkeletonLoader variant="text" width="70%" />
								<SkeletonLoader variant="text" width="20%" />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
	return (
		<div>
			<SectionHeader title="Key Insights" />
			<div className="h-[500px] px-5 py-4 pb-2 bg-card border border-border rounded-[16px]">
				<ul className="flex overflow-y-auto md:mb-4">
					<li className="me-2">
						<TabButton
							label="Insights"
							onClick={() => setSelectedTab('insights')}
							color="text-primary"
							borderColor="border-primary"
							isSelected={selectedTab === 'insights'}
						/>
					</li>
					<li className="me-2">
						<TabButton
							label="Improvements"
							onClick={() => setSelectedTab('improvement')}
							color="text-secondary"
							borderColor="border-secondary"
							isSelected={selectedTab === 'improvement'}
						/>
					</li>
					<li className="me-2">
						<TabButton
							label="Warnings"
							onClick={() => setSelectedTab('warnings')}
							color="text-destructive"
							borderColor="border-destructive"
							isSelected={selectedTab === 'warnings'}
						/>
					</li>
				</ul>
				{selectedTab === 'insights' ? <MonthlyInsights /> : selectedTab === 'improvement' ? <ImprovementInsights /> : <WarningInsights />}
			</div>
		</div>
	);
};
export default Insights;
