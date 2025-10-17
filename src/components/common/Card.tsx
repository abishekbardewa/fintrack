import React from 'react';

interface CardProps {
	children: React.ReactNode;
	className?: string;
	padding?: 'none' | 'sm' | 'md' | 'lg';
	hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', padding = 'md', hover = false }) => {
	const paddingClasses = {
		none: '',
		sm: 'p-4',
		md: 'px-4 py-5 sm:p-6',
		lg: 'p-6 sm:p-8',
	};

	const hoverClass = hover ? 'hover:shadow-md transition-shadow duration-200' : '';

	return (
		<div className={`overflow-hidden rounded-lg bg-card border border-border shadow-sm ${paddingClasses[padding]} ${hoverClass} ${className}`}>
			{children}
		</div>
	);
};

export default Card;
