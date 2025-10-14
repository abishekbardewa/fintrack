import React from 'react';

interface SectionHeaderProps {
	title: string;
	subtitle?: string;
	action?: React.ReactNode;
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, action, size = 'md', className = '' }) => {
	const sizeClasses = {
		sm: 'text-lg',
		md: 'text-2xl',
		lg: 'text-3xl',
	};

	return (
		<div className={`flex items-center justify-between mb-5 ${className}`}>
			<div className="flex-1">
				<h2 className={`font-semibold leading-6 text-foreground ${sizeClasses[size]}`}>{title}</h2>
				{subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
			</div>
			{action && <div className="ml-4">{action}</div>}
		</div>
	);
};

export default SectionHeader;
