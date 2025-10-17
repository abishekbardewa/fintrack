import React from 'react';

interface InputFieldProps {
	label: string;
	id: string;
	name: string;
	type: 'text' | 'email' | 'number' | 'password' | 'phone' | 'time' | 'date';
	value: string;
	placeholder?: string;
	required?: boolean;
	error?: string;
	disabled?: boolean;
	readOnly?: boolean;
	className?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	id,
	name,
	type,
	value,
	placeholder = '',
	required = false,
	error,
	disabled = false,
	readOnly = false,
	className = '',
	onChange,
}) => {
	const inputClassNames = `mt-1 focus:ring-primary focus:outline-none focus:border-primary block w-full sm:text-sm
    ${error ? '!border-destructive focus:border-destructive focus:ring-destructive' : 'border-border focus:border-primary focus:ring-primary'}
    ${disabled ? 'bg-muted text-muted-foreground' : ''}
    ${className}`;

	return (
		<div className="mb-4">
			<label htmlFor={id} className="block text-sm font-medium text-foreground">
				{label} {required && <span className="text-destructive">*</span>}
			</label>

			<input
				type={type}
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={type === 'email' && !placeholder ? 'youremail@example.com' : placeholder}
				disabled={disabled}
				readOnly={readOnly}
				className={inputClassNames}
			/>

			{error && <span className="text-destructive text-sm">{error}</span>}
		</div>
	);
};

export default InputField;
