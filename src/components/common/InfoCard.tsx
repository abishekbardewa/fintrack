import React from 'react';

interface InfoCardProps {
	title: string;
	items: string[];
	emptyMessage?: string;
	className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, items, emptyMessage = 'No data available', className = '' }) => {
	return (
		<li className={`col-span-1 flex rounded-md shadow-sm ${className}`}>
			<div className="flex flex-1 items-start justify-between truncate rounded-md border border-border bg-card">
				<div className="flex-1 truncate px-4 py-2 text-sm">
					<h2 className="mb-1 text-sm font-medium text-muted-foreground">{title}</h2>
					{items && items.length > 0 ? (
						items.map((item, index) => (
							<p className="text-muted-foreground" key={index}>
								{item}
							</p>
						))
					) : (
						<p className="mt-1 text-muted-foreground">{emptyMessage}</p>
					)}
				</div>
			</div>
		</li>
	);
};

export default InfoCard;
