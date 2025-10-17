import React from 'react';

interface SkeletonLoaderProps {
	className?: string;
	variant?: 'text' | 'rectangular' | 'circular' | 'card';
	width?: string | number;
	height?: string | number;
	lines?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = '', variant = 'rectangular', width, height, lines = 1 }) => {
	const baseClasses = 'animate-pulse bg-muted rounded';

	const getVariantClasses = () => {
		switch (variant) {
			case 'text':
				return 'h-4';
			case 'circular':
				return 'rounded-full';
			case 'card':
				return 'h-32';
			case 'rectangular':
			default:
				return 'h-4';
		}
	};

	const getStyle = () => {
		const style: React.CSSProperties = {};
		if (width) style.width = typeof width === 'number' ? `${width}px` : width;
		if (height) style.height = typeof height === 'number' ? `${height}px` : height;
		return style;
	};

	if (variant === 'text' && lines > 1) {
		return (
			<div className={className}>
				{Array.from({ length: lines }).map((_, index) => (
					<div key={index} className={`${baseClasses} ${getVariantClasses()} ${index < lines - 1 ? 'mb-2' : ''}`} style={getStyle()} />
				))}
			</div>
		);
	}

	return <div className={`${baseClasses} ${getVariantClasses()} ${className}`} style={getStyle()} />;
};

export default SkeletonLoader;
