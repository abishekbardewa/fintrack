import React from 'react';
import EmptyState from './EmptyState';

interface InsightListProps {
	items: string[];
	emptyTitle?: string;
	emptySubtitle?: string;
	className?: string;
}

const InsightList: React.FC<InsightListProps> = ({
	items,
	emptyTitle = 'No insights available',
	emptySubtitle = 'Add data to see insights',
	className = '',
}) => {
	if (!items || items.length === 0) {
		return <EmptyState title={emptyTitle} subtitle={emptySubtitle} />;
	}

	return (
		<ul role="list" className={`h-[400px] overflow-y-auto scrollbar-hidden ${className}`}>
			{items.map((item, idx) => (
				<li key={`${item}-${idx}`} className="flex justify-between gap-x-6 pb-3">
					<div className="flex min-w-0 gap-x-4">
						<div className="min-w-0 flex-auto">
							<p className="mt-1 text-sm text-muted-foreground">{item}</p>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};

export default InsightList;
