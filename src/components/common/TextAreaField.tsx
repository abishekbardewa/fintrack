import React from 'react';

interface TextAreaFieldProps {
	label: string;
	id: string;
	name: string;
	value: string;
	required?: boolean;
	error?: string;
	placeholder?: string;
	maxLength?: number;
	rows: number;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, id, name, value, rows, required, error, placeholder, maxLength, onChange }) => {
	return (
		<div className="mb-4">
			<label htmlFor={id} className="block text-sm font-medium text-foreground">
				{label} {required && <span className="text-destructive">*</span>}
			</label>
			<textarea
				maxLength={maxLength}
				placeholder={placeholder}
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				rows={rows}
				className={`focus:outline-none focus:ring-primary focus:border-primary block w-full sm:text-sm  ${error ? 'border-destructive' : ''}`}
				required={required}
			></textarea>
			{required ? (
				<div className="flex items-center mt-2 justify-between">
					{error && <span className="text-destructive text-sm">{error}</span>}

					<div className="text-sm text-muted-foreground text-right">
						{value?.length ?? 0}/{maxLength ?? '∞'}
					</div>
				</div>
			) : (
				<div className="text-sm text-muted-foreground text-right">
					{value?.length ?? 0}/{maxLength ?? '∞'}
				</div>
			)}
		</div>
	);
};

export default TextAreaField;
