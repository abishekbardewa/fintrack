import React from 'react';
import Card from './Card';
import SectionHeader from './SectionHeader';
import EmptyState from './EmptyState';

interface ChartContainerProps {
	title?: string;
	subtitle?: string;
	action?: React.ReactNode;
	children: React.ReactNode;
	height?: string;
	isEmpty?: boolean;
	emptyTitle?: string;
	emptySubtitle?: string;
	loading?: boolean;
	className?: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
	title,
	subtitle,
	action,
	children,
	height = 'h-[500px]',
	isEmpty = false,
	emptyTitle = 'No data available',
	emptySubtitle = 'Add data to visualize',
	loading = false,
	className = '',
}) => {
	return (
		<div className={className}>
			{title && <SectionHeader title={title} subtitle={subtitle} action={action} />}
			<Card padding="lg" className={height}>
				{loading ? (
					<div className="flex items-center justify-center h-full">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
					</div>
				) : isEmpty ? (
					<EmptyState title={emptyTitle} subtitle={emptySubtitle} />
				) : (
					<div className="h-full w-full">{children}</div>
				)}
			</Card>
		</div>
	);
};

export default ChartContainer;
