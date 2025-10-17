import React from 'react';

interface SegmentedControlOption {
	value: string;
	label: string;
}

interface SegmentedControlProps {
	options: SegmentedControlOption[];
	selectedValue: string;
	onChange: (value: string) => void;
	name: string;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, selectedValue, onChange, name }) => {
	return (
		<div className="inline-flex rounded-lg bg-muted p-1">
			{options.map((option) => (
				<button
					key={option.value}
					type="button"
					className={`
						relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out
						${selectedValue === option.value ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}
					`}
					onClick={() => onChange(option.value)}
					aria-pressed={selectedValue === option.value}
					role="tab"
					aria-selected={selectedValue === option.value}
					aria-controls={`${name}-panel-${option.value}`}
					id={`${name}-tab-${option.value}`}
				>
					{option.label}
				</button>
			))}
		</div>
	);
};

export default SegmentedControl;
