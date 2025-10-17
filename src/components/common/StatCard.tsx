import React, { memo } from 'react';
import Card from './Card';

interface StatCardProps {
	label: string;
	value: string | number;
	icon?: React.ReactNode;
	trend?: {
		value: string;
		isPositive?: boolean;
	};
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, size = 'md', className = '' }) => {
	const sizeClasses = {
		sm: 'text-xl',
		md: 'text-2xl sm:text-3xl',
		lg: 'text-3xl sm:text-4xl',
	};

	return (
		<Card padding="md" className={className}>
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<dt className="truncate text-sm font-medium text-muted-foreground">{label}</dt>
					<dd className={`mt-1 font-semibold tracking-tight text-foreground ${sizeClasses[size]}`}>{value}</dd>
					{trend && <div className={`mt-2 text-sm ${trend.isPositive ? 'text-chart-2' : 'text-destructive'}`}>{trend.value}</div>}
				</div>
				{icon && <div className="text-muted-foreground">{icon}</div>}
			</div>
		</Card>
	);
};

export default memo(StatCard);
