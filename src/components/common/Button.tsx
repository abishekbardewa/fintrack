import React from 'react';
import { LuLoader2 } from 'react-icons/lu';

interface ButtonProps {
	size?: 'sm' | 'md' | 'lg' | 'noPadding';
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	buttonType?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	innerClass?: string;
	innerTextClass?: string;
	variant?: 'filled' | 'outline' | 'error' | 'ghost';
	loading?: boolean;
	onClick?: () => void;
	children: React.ReactNode;
	fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	size = 'md',
	startIcon,
	endIcon,
	buttonType = 'button',
	disabled = false,
	innerClass = '',
	innerTextClass = '',
	variant = 'filled',
	loading = false,
	onClick,
	children,
	fullWidth = false,
}) => {
	const getVariantClass = () => {
		switch (variant) {
			case 'filled':
				return 'bg-primary border-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:border-muted disabled:text-muted-foreground focus:ring-ring';
			case 'outline':
				return 'bg-transparent border-border text-foreground hover:border-primary hover:bg-muted hover:text-primary disabled:text-muted-foreground disabled:border-border disabled:hover:bg-transparent focus:ring-ring';
			case 'error':
				return 'bg-destructive border-destructive text-destructive-foreground hover:bg-destructive/90 disabled:bg-muted disabled:border-muted disabled:text-muted-foreground focus:ring-ring';
			case 'ghost':
				return 'bg-transparent border-transparent text-foreground hover:bg-muted disabled:text-muted-foreground disabled:hover:bg-transparent focus:ring-ring';
			default:
				return '';
		}
	};

	const getSizeClass = () => {
		switch (size) {
			case 'sm':
				return 'px-4 py-2 text-sm leading-6';
			case 'md':
				return 'px-6 py-2.5 text-sm leading-6';
			case 'noPadding':
				return 'text-sm leading-6';
			case 'lg':
				return 'px-8 py-2.5 text-base leading-7';
			default:
				return '';
		}
	};

	return (
		<button
			className={`cursor-pointer rounded-full border font-semibold shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 ${getVariantClass()} ${getSizeClass()} ${
				fullWidth ? 'w-full' : ''
			} ${innerClass}`}
			disabled={disabled || loading}
			type={buttonType}
			onClick={onClick}
		>
			<div className={`flex items-center justify-center ${size === 'lg' ? 'h-7' : size === 'md' || size === 'sm' ? 'h-6' : ''}`}>
				{loading ? (
					<LuLoader2 className="w-5 h-5 text-primary-foreground animate-spin" />
				) : (
					<div className={`flex h-6 items-center justify-center gap-2 text-center ${innerTextClass}`}>
						{startIcon && startIcon}
						{children}
						{endIcon && endIcon}
					</div>
				)}
			</div>
		</button>
	);
};

export default Button;
